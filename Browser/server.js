// =====================================================================
//  Magno Tours · Servidor local (Express + MySQL de XAMPP)
//  Sirve la interfaz (browser.html) y una API pequeña en /api que lee y
//  guarda los datos en la base magno_tours. Electron lo arranca solo
//  (main.js); también funciona con "npm run preview" en el navegador.
// =====================================================================
const express = require("express");
const mysql = require("mysql2/promise");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const Anthropic = require("@anthropic-ai/sdk");

// Datos de conexión. En XAMPP el usuario es root y no tiene contraseña.
const db = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3307, // XAMPP en este equipo usa 3307 (el 3306 lo ocupa MySQL80)
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "magno_tours",
  dateStrings: true, // las fechas llegan como "AAAA-MM-DD"
  connectionLimit: 5,
});

// Roles: cada uno puede lo del anterior y algo más.
const NIVEL = { Empleado: 1, Gerente: 2, Administrador: 3 };
const sesiones = new Map(); // token -> usuario que inició sesión

const clave = (prefijo, id) => `${prefijo}-${String(id).padStart(3, "0")}`;
const numero = (claveTexto) => Number(String(claveTexto || "").split("-")[1]) || null;
const vacio = (valor) => (valor === undefined || valor === "" ? null : valor);

const app = express();
app.use(express.json());
app.use(express.static(__dirname));
app.get("/", (_req, res) => res.sendFile(path.join(__dirname, "browser.html")));

// ---------- Inicio de sesión ----------
app.post("/api/login", async (req, res) => {
  const { usuario = "", contrasena = "" } = req.body;
  const [filas] = await db.query(
    `SELECT u.id_usuario, u.usuario, u.nombre, r.nombre AS rol FROM usuario u JOIN rol r ON r.id_rol = u.id_rol
     WHERE u.usuario = ? AND u.contrasena = SHA2(CONCAT(u.sal, ?), 256) AND u.activo = TRUE`, [usuario.trim(), contrasena]);
  if (!filas.length) return res.status(401).json({ error: "Usuario o contraseña incorrectos." });
  const token = crypto.randomUUID();
  sesiones.set(token, filas[0]);
  res.json({ token, usuario: filas[0] });
});

// Revisa que haya sesión y que el rol alcance para la acción.
function requiere(rolMinimo = "Empleado") {
  return (req, res, next) => {
    const usuario = sesiones.get(req.get("x-token"));
    if (!usuario) return res.status(401).json({ error: "Tu sesión terminó. Vuelve a entrar." });
    if (NIVEL[usuario.rol] < NIVEL[rolMinimo]) return res.status(403).json({ error: `Esta acción es solo para ${rolMinimo.toLowerCase()} o superior.` });
    req.usuario = usuario;
    next();
  };
}

app.post("/api/logout", (req, res) => { sesiones.delete(req.get("x-token")); res.json({ ok: true }); });

// ---------- Lectura de todo lo que muestra la app ----------
app.get("/api/datos", requiere(), async (req, res) => {
  const [clientes] = await db.query(`SELECT c.id_cliente, c.nombre_completo, c.fecha_nacimiento, x.nombre AS sexo, c.telefono,
      p.numero, p.fecha_expedicion, p.fecha_expiracion
    FROM cliente c JOIN sexo x ON x.id_sexo = c.id_sexo LEFT JOIN pasaporte p ON p.id_cliente = c.id_cliente ORDER BY c.id_cliente`);
  const [solicitudes] = await db.query(`SELECT s.*, sv.nombre AS servicio, pa.nombre AS pais, t.nombre AS tipo, e.nombre AS estado,
      v.pagado, f.id_factura
    FROM solicitud_viaje s JOIN v_saldo v ON v.id_solicitud = s.id_solicitud LEFT JOIN factura f ON f.id_solicitud = s.id_solicitud JOIN servicio sv ON sv.id_servicio = s.id_servicio JOIN pais pa ON pa.id_pais = s.id_pais
    JOIN tipo_viaje t ON t.id_tipo_viaje = s.id_tipo_viaje JOIN estado_solicitud e ON e.id_estado = s.id_estado
    ORDER BY s.id_solicitud DESC`);
  const [promociones] = await db.query(`SELECT p.id_promocion, p.titulo, p.detalle, sv.nombre AS servicio, p.lugar, p.activa
    FROM promocion p JOIN servicio sv ON sv.id_servicio = p.id_servicio ORDER BY p.id_promocion DESC`);
  const [servicios] = await db.query("SELECT nombre FROM servicio ORDER BY id_servicio");
  const [paises] = await db.query("SELECT nombre FROM pais ORDER BY id_pais");
  const [formas] = await db.query("SELECT nombre FROM forma_pago ORDER BY id_forma_pago");
  res.json({
    usuario: req.usuario,
    services: servicios.map((s) => s.nombre),
    countries: paises.map((p) => p.nombre),
    paymentMethods: formas.map((f) => f.nombre),
    clients: clientes.map((c) => ({
      id: clave("CLI", c.id_cliente), name: c.nombre_completo, birth: c.fecha_nacimiento, sex: c.sexo, phone: c.telefono,
      passport: c.numero ? { number: c.numero, issue: c.fecha_expedicion, expiry: c.fecha_expiracion } : null,
    })),
    requests: solicitudes.map((s) => ({
      id: clave("SOL", s.id_solicitud), clientId: clave("CLI", s.id_cliente), service: s.servicio, destination: s.pais,
      place: s.lugar || "", departure: s.fecha_salida, returnDate: s.fecha_regreso || "", tripType: s.tipo,
      travelers: s.num_viajeros, status: s.estado,
      price: s.precio_total === null ? null : Number(s.precio_total), paid: Number(s.pagado),
      invoice: s.id_factura ? clave("FAC", s.id_factura) : null,
    })),
    promotions: promociones.map((p) => ({ id: p.id_promocion, title: p.titulo, detail: p.detalle, service: p.servicio, place: p.lugar || "", active: !!p.activa })),
  });
});

// Guarda (o reemplaza) el pasaporte de un cliente dentro de una transacción.
async function guardarPasaporte(con, idCliente, pasaporte) {
  if (!pasaporte) return con.query("DELETE FROM pasaporte WHERE id_cliente = ?", [idCliente]);
  await con.query("DELETE FROM pasaporte WHERE id_cliente = ?", [idCliente]);
  await con.query("INSERT INTO pasaporte (numero, id_cliente, fecha_expedicion, fecha_expiracion) VALUES (?, ?, ?, ?)",
    [pasaporte.number, idCliente, pasaporte.issue, pasaporte.expiry]);
}

// Ejecuta varias consultas como una sola operación: si una falla, no se guarda nada.
async function enTransaccion(trabajo) {
  const con = await db.getConnection();
  try {
    await con.beginTransaction();
    const resultado = await trabajo(con);
    await con.commit();
    return resultado;
  } catch (error) {
    await con.rollback();
    throw error;
  } finally {
    con.release();
  }
}

// ---------- Clientes ----------
app.post("/api/clientes", requiere(), async (req, res) => {
  const c = req.body;
  const id = await enTransaccion(async (con) => {
    let idCliente = numero(c.id);
    const datos = [c.name, c.birth, c.sex, c.phone];
    if (idCliente) {
      await con.query("UPDATE cliente SET nombre_completo = ?, fecha_nacimiento = ?, id_sexo = (SELECT id_sexo FROM sexo WHERE nombre = ?), telefono = ? WHERE id_cliente = ?", [...datos, idCliente]);
    } else {
      const [r] = await con.query("INSERT INTO cliente (nombre_completo, fecha_nacimiento, id_sexo, telefono) VALUES (?, ?, (SELECT id_sexo FROM sexo WHERE nombre = ?), ?)", datos);
      idCliente = r.insertId;
    }
    await guardarPasaporte(con, idCliente, c.passport);
    return idCliente;
  });
  res.json({ id: clave("CLI", id) });
});

// ---------- Solicitudes ----------
app.post("/api/solicitudes", requiere(), async (req, res) => {
  const s = req.body;
  const id = await enTransaccion(async (con) => {
    const idCliente = numero(s.clientId);
    if (s.passport) await guardarPasaporte(con, idCliente, s.passport); // pasaporte capturado en la solicitud
    let idSolicitud = numero(s.id);
    const datos = [idCliente, s.service, s.destination, vacio(s.place), s.departure, vacio(s.returnDate), s.tripType, s.travelers, vacio(s.price)];
    const campos = `id_cliente = ?, id_servicio = (SELECT id_servicio FROM servicio WHERE nombre = ?), id_pais = (SELECT id_pais FROM pais WHERE nombre = ?),
      lugar = ?, fecha_salida = ?, fecha_regreso = ?, id_tipo_viaje = (SELECT id_tipo_viaje FROM tipo_viaje WHERE nombre = ?), num_viajeros = ?, precio_total = ?`;
    if (idSolicitud) await con.query(`UPDATE solicitud_viaje SET ${campos} WHERE id_solicitud = ?`, [...datos, idSolicitud]);
    else idSolicitud = (await con.query(`INSERT INTO solicitud_viaje SET ${campos}`, datos))[0].insertId;
    return idSolicitud;
  });
  res.json({ id: clave("SOL", id) });
});

// Cambio de estado con historial (procedimiento cambiar_estado). Confirmar y cancelar es del gerente.
app.post("/api/solicitudes/:id/estado", requiere(), async (req, res) => {
  const { estado } = req.body;
  if ((estado === "Confirmada" || estado === "Cancelada") && NIVEL[req.usuario.rol] < NIVEL.Gerente) {
    return res.status(403).json({ error: "Solo un gerente o administrador puede confirmar o cancelar." });
  }
  await db.query("CALL cambiar_estado(?, (SELECT id_estado FROM estado_solicitud WHERE nombre = ?))", [numero(req.params.id), estado]);
  res.json({ ok: true });
});

// ---------- Pagos y facturas ----------
app.get("/api/solicitudes/:id/pagos", requiere(), async (req, res) => {
  const [filas] = await db.query(`SELECT pg.monto, pg.fecha_hora, f.nombre AS forma, u.nombre AS usuario
    FROM pago pg JOIN forma_pago f ON f.id_forma_pago = pg.id_forma_pago JOIN usuario u ON u.id_usuario = pg.id_usuario
    WHERE pg.id_solicitud = ? ORDER BY pg.fecha_hora`, [numero(req.params.id)]);
  res.json(filas.map((p) => ({ amount: Number(p.monto), date: p.fecha_hora, method: p.forma, user: p.usuario })));
});

app.post("/api/pagos", requiere(), async (req, res) => {
  const { requestId, method, amount } = req.body;
  await db.query("INSERT INTO pago (id_solicitud, id_forma_pago, monto, id_usuario) VALUES (?, (SELECT id_forma_pago FROM forma_pago WHERE nombre = ?), ?, ?)",
    [numero(requestId), method, amount, req.usuario.id_usuario]);
  res.json({ ok: true });
});

// Registra la factura (una por solicitud) y regresa la dirección del PDF que arma factura.php en XAMPP.
const PHP_URL = process.env.PHP_URL || "http://localhost/magno_tours";
app.post("/api/solicitudes/:id/factura", requiere(), async (req, res) => {
  const id = numero(req.params.id);
  const [[saldo]] = await db.query("SELECT precio_total, saldo FROM v_saldo WHERE id_solicitud = ?", [id]);
  if (!saldo || saldo.precio_total === null || Number(saldo.saldo) > 0) {
    return res.status(400).json({ error: "La factura se emite cuando la solicitud está pagada por completo." });
  }
  await db.query("INSERT IGNORE INTO factura (id_solicitud, id_usuario) VALUES (?, ?)", [id, req.usuario.id_usuario]);
  res.json({ url: `${PHP_URL}/factura.php?solicitud=${id}` });
});

// ---------- Promociones (gerente y administrador) ----------
app.post("/api/promociones", requiere("Gerente"), async (req, res) => {
  const p = req.body;
  await db.query("INSERT INTO promocion (titulo, detalle, id_servicio, lugar) VALUES (?, ?, (SELECT id_servicio FROM servicio WHERE nombre = ?), ?)",
    [p.title, p.detail, p.service, vacio(p.place)]);
  res.json({ ok: true });
});

app.post("/api/promociones/:id", requiere("Gerente"), async (req, res) => {
  const p = req.body;
  await db.query("UPDATE promocion SET titulo = ?, detalle = ?, id_servicio = (SELECT id_servicio FROM servicio WHERE nombre = ?), lugar = ? WHERE id_promocion = ?",
    [p.title, p.detail, p.service, vacio(p.place), req.params.id]);
  res.json({ ok: true });
});

app.post("/api/promociones/:id/eliminar", requiere("Gerente"), async (req, res) => {
  await db.query("DELETE FROM promocion WHERE id_promocion = ?", [req.params.id]);
  res.json({ ok: true });
});

app.post("/api/promociones/:id/activa", requiere("Gerente"), async (req, res) => {
  await db.query("UPDATE promocion SET activa = NOT activa WHERE id_promocion = ?", [req.params.id]);
  res.json({ ok: true });
});

// ---------- Usuarios (solo administrador) ----------
app.get("/api/usuarios", requiere("Administrador"), async (_req, res) => {
  const [filas] = await db.query("SELECT u.id_usuario AS id, u.usuario, u.nombre, r.nombre AS rol, u.activo FROM usuario u JOIN rol r ON r.id_rol = u.id_rol ORDER BY u.id_usuario");
  res.json(filas.map((u) => ({ ...u, activo: !!u.activo })));
});

app.post("/api/usuarios", requiere("Administrador"), async (req, res) => {
  const { usuario, nombre, rol, contrasena } = req.body;
  const sal = crypto.randomBytes(8).toString("hex");
  await db.query("INSERT INTO usuario (usuario, nombre, id_rol, sal, contrasena) VALUES (?, ?, (SELECT id_rol FROM rol WHERE nombre = ?), ?, SHA2(CONCAT(?, ?), 256))",
    [usuario.trim(), nombre.trim(), rol, sal, sal, contrasena]);
  res.json({ ok: true });
});

app.post("/api/usuarios/:id", requiere("Administrador"), async (req, res) => {
  const { usuario, nombre, rol, contrasena } = req.body;
  const id = Number(req.params.id);
  if (id === req.usuario.id_usuario && rol !== "Administrador") return res.status(400).json({ error: "No puedes quitarte el rol de administrador." });
  await db.query("UPDATE usuario SET usuario = ?, nombre = ?, id_rol = (SELECT id_rol FROM rol WHERE nombre = ?) WHERE id_usuario = ?", [usuario.trim(), nombre.trim(), rol, id]);
  if (contrasena) {
    const sal = crypto.randomBytes(8).toString("hex");
    await db.query("UPDATE usuario SET sal = ?, contrasena = SHA2(CONCAT(?, ?), 256) WHERE id_usuario = ?", [sal, sal, contrasena, id]);
  }
  for (const [token, sesion] of sesiones) if (sesion.id_usuario === id && id !== req.usuario.id_usuario) sesiones.delete(token); // vuelve a entrar con sus datos nuevos
  res.json({ ok: true });
});

app.post("/api/usuarios/:id/eliminar", requiere("Administrador"), async (req, res) => {
  const id = Number(req.params.id);
  if (id === req.usuario.id_usuario) return res.status(400).json({ error: "No puedes eliminar tu propio usuario." });
  const [[uso]] = await db.query("SELECT (SELECT COUNT(*) FROM pago WHERE id_usuario = ?) + (SELECT COUNT(*) FROM factura WHERE id_usuario = ?) AS total", [id, id]);
  if (uso.total > 0) return res.status(400).json({ error: "Este usuario ya registró pagos o facturas; desactívalo en lugar de eliminarlo." });
  await db.query("DELETE FROM usuario WHERE id_usuario = ?", [id]);
  for (const [token, sesion] of sesiones) if (sesion.id_usuario === id) sesiones.delete(token);
  res.json({ ok: true });
});

app.post("/api/usuarios/:id/activo", requiere("Administrador"), async (req, res) => {
  if (Number(req.params.id) === req.usuario.id_usuario) return res.status(400).json({ error: "No puedes desactivar tu propio usuario." });
  await db.query("UPDATE usuario SET activo = NOT activo WHERE id_usuario = ?", [req.params.id]);
  for (const [token, sesion] of sesiones) if (sesion.id_usuario === Number(req.params.id)) sesiones.delete(token);
  res.json({ ok: true });
});

// ---------- Asistente virtual (API de Claude) ----------
// La clave NO va en el código: se lee de la variable ANTHROPIC_API_KEY o del
// archivo clave-ia.txt en la carpeta Electron-app (ese archivo no se comparte).
function leerClave() {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY.trim();
  try { return fs.readFileSync(path.join(__dirname, "..", "clave-ia.txt"), "utf8").trim(); } catch (_) { return ""; }
}

const hoy = () => new Date().toLocaleDateString("en-CA"); // AAAA-MM-DD de este equipo

// Herramientas que el asistente puede usar: buscar clientes y registrar solicitudes.
async function herramientasAsistente() {
  const [servicios] = await db.query("SELECT nombre FROM servicio ORDER BY id_servicio");
  const [paises] = await db.query("SELECT nombre FROM pais ORDER BY id_pais");
  const [sexos] = await db.query("SELECT nombre FROM sexo ORDER BY id_sexo");
  return [
    {
      name: "crear_cliente",
      description: "Registra un cliente nuevo. Úsala solo después de que el usuario confirme el resumen. Regresa su clave CLI-###.",
      input_schema: {
        type: "object",
        properties: {
          nombre: { type: "string", description: "Nombre completo, solo letras y espacios" },
          fecha_nacimiento: { type: "string", description: "AAAA-MM-DD" },
          sexo: { type: "string", enum: sexos.map((x) => x.nombre) },
          telefono: { type: "string", description: "Exactamente 10 dígitos" },
          pasaporte_numero: { type: "string", description: "Opcional: 6 a 12 letras o números" },
          pasaporte_expedicion: { type: "string", description: "Opcional: AAAA-MM-DD" },
          pasaporte_expiracion: { type: "string", description: "Opcional: AAAA-MM-DD" },
        },
        required: ["nombre", "fecha_nacimiento", "sexo", "telefono"],
      },
    },
    {
      name: "buscar_clientes",
      description: "Busca clientes registrados por parte del nombre o del teléfono. Regresa hasta 5 coincidencias con su clave CLI-###.",
      input_schema: { type: "object", properties: { texto: { type: "string", description: "Nombre o teléfono a buscar" } }, required: ["texto"] },
    },
    {
      name: "crear_solicitud",
      description: "Registra una solicitud de viaje nueva en estado Pendiente. Úsala solo después de que el usuario confirme el resumen.",
      input_schema: {
        type: "object",
        properties: {
          cliente: { type: "string", description: "Clave del cliente, por ejemplo CLI-004" },
          servicio: { type: "string", enum: servicios.map((x) => x.nombre) },
          pais: { type: "string", enum: paises.map((x) => x.nombre) },
          lugar: { type: "string", description: "Ciudad o lugar (opcional, máximo 60 caracteres)" },
          fecha_salida: { type: "string", description: "AAAA-MM-DD" },
          tipo: { type: "string", enum: ["Sencillo", "Redondo"] },
          fecha_regreso: { type: "string", description: "AAAA-MM-DD, solo si es Redondo" },
          viajeros: { type: "integer", minimum: 1 },
          precio: { type: "number", description: "Precio total en pesos (opcional)" },
        },
        required: ["cliente", "servicio", "pais", "fecha_salida", "tipo", "viajeros"],
      },
    },
  ];
}

// Ejecuta una herramienta y regresa el texto que lee el asistente.
async function usarHerramienta(nombre, datos) {
  if (nombre === "buscar_clientes") {
    const texto = String(datos.texto || "").trim();
    const [filas] = await db.query(`SELECT c.id_cliente, c.nombre_completo, RIGHT(c.telefono, 4) AS tel, p.fecha_expiracion
      FROM cliente c LEFT JOIN pasaporte p ON p.id_cliente = c.id_cliente
      WHERE c.nombre_completo LIKE ? OR c.telefono LIKE ? ORDER BY c.id_cliente LIMIT 5`, [`%${texto}%`, `%${texto}%`]);
    if (!filas.length) return { texto: "No hay clientes con ese nombre o teléfono." };
    return { texto: filas.map((c) => `${clave("CLI", c.id_cliente)} · ${c.nombre_completo} · teléfono termina en ${c.tel} · ${c.fecha_expiracion ? "pasaporte vigente hasta " + c.fecha_expiracion : "sin pasaporte"}`).join("\n") };
  }
  if (nombre === "crear_cliente") {
    const d = datos;
    const errores = [];
    const fecha = /^\d{4}-\d{2}-\d{2}$/;
    const nom = String(d.nombre || "").trim().replace(/\s+/g, " ");
    if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/.test(nom)) errores.push("el nombre solo admite letras y espacios");
    if (!fecha.test(d.fecha_nacimiento || "")) errores.push("la fecha de nacimiento debe ser AAAA-MM-DD");
    else if (d.fecha_nacimiento > hoy()) errores.push("la fecha de nacimiento no puede ser posterior a hoy");
    if (!/^\d{10}$/.test(String(d.telefono || ""))) errores.push("el teléfono debe tener exactamente 10 dígitos");
    const conPasaporte = d.pasaporte_numero || d.pasaporte_expedicion || d.pasaporte_expiracion;
    if (conPasaporte) {
      if (!/^[A-Za-z0-9]{6,12}$/.test(d.pasaporte_numero || "")) errores.push("el pasaporte debe tener de 6 a 12 letras o números");
      if (!fecha.test(d.pasaporte_expedicion || "") || !fecha.test(d.pasaporte_expiracion || "")) errores.push("faltan las fechas de expedición y expiración del pasaporte (AAAA-MM-DD)");
      else if (d.pasaporte_expedicion >= d.pasaporte_expiracion) errores.push("la expedición del pasaporte debe ser antes de su expiración");
    }
    if (errores.length) return { texto: "No se guardó: " + errores.join("; ") + ".", error: true };
    try {
      const id = await enTransaccion(async (con) => {
        const [r] = await con.query("INSERT INTO cliente (nombre_completo, fecha_nacimiento, id_sexo, telefono) VALUES (?, ?, (SELECT id_sexo FROM sexo WHERE nombre = ?), ?)",
          [nom, d.fecha_nacimiento, d.sexo, d.telefono]);
        if (conPasaporte) await guardarPasaporte(con, r.insertId, { number: d.pasaporte_numero.toUpperCase(), issue: d.pasaporte_expedicion, expiry: d.pasaporte_expiracion });
        return r.insertId;
      });
      const claveCliente = clave("CLI", id);
      return { texto: `Cliente ${claveCliente} (${nom}) registrado.`, cliente: claveCliente };
    } catch (error) {
      let motivo = error.sqlMessage || "no se pudo guardar";
      if (error.code === "ER_DUP_ENTRY") motivo = "ese número de pasaporte ya está registrado";
      return { texto: "No se guardó: " + motivo, error: true };
    }
  }
  if (nombre === "crear_solicitud") {
    const d = datos;
    const errores = [];
    const fecha = /^\d{4}-\d{2}-\d{2}$/;
    if (!numero(d.cliente)) errores.push("falta la clave del cliente");
    if (!fecha.test(d.fecha_salida || "")) errores.push("la fecha de salida debe ser AAAA-MM-DD");
    else if (d.fecha_salida < hoy()) errores.push("la salida no puede ser anterior a hoy");
    if (d.tipo === "Redondo" && !fecha.test(d.fecha_regreso || "")) errores.push("el viaje redondo necesita fecha de regreso");
    else if (d.tipo === "Redondo" && d.fecha_regreso < d.fecha_salida) errores.push("el regreso no puede ser antes de la salida");
    if (!Number.isInteger(d.viajeros) || d.viajeros < 1) errores.push("los viajeros deben ser un entero mayor o igual a 1");
    if (d.lugar && d.lugar.length > 60) errores.push("el lugar admite máximo 60 caracteres");
    if (d.precio !== undefined && d.precio !== null && !(d.precio > 0)) errores.push("el precio debe ser mayor a 0");
    if (errores.length) return { texto: "No se guardó: " + errores.join("; ") + ".", error: true };
    try {
      const [r] = await db.query(`INSERT INTO solicitud_viaje SET id_cliente = ?, id_servicio = (SELECT id_servicio FROM servicio WHERE nombre = ?),
        id_pais = (SELECT id_pais FROM pais WHERE nombre = ?), lugar = ?, fecha_salida = ?, fecha_regreso = ?,
        id_tipo_viaje = (SELECT id_tipo_viaje FROM tipo_viaje WHERE nombre = ?), num_viajeros = ?, precio_total = ?`,
        [numero(d.cliente), d.servicio, d.pais, vacio(d.lugar), d.fecha_salida, d.tipo === "Redondo" ? d.fecha_regreso : null, d.tipo, d.viajeros, d.precio || null]);
      const folio = clave("SOL", r.insertId);
      return { texto: `Solicitud ${folio} registrada en estado Pendiente.`, folio };
    } catch (error) {
      let motivo = error.sqlMessage || "no se pudo guardar";
      if (error.code === "ER_NO_REFERENCED_ROW_2") motivo = "ese cliente no existe";
      return { texto: "No se guardó: " + motivo, error: true };
    }
  }
  return { texto: "Herramienta desconocida.", error: true };
}

// "Entrenamiento" del asistente: instrucciones fijas + información de la agencia tomada de la base.
async function instruccionesAsistente() {
  const [servicios] = await db.query("SELECT nombre FROM servicio ORDER BY id_servicio");
  const [promos] = await db.query(`SELECT p.titulo, p.detalle, s.nombre AS servicio, p.lugar FROM promocion p
    JOIN servicio s ON s.id_servicio = p.id_servicio WHERE p.activa = TRUE`);
  const [formas] = await db.query("SELECT nombre FROM forma_pago ORDER BY id_forma_pago");
  return `Eres el asistente virtual de Magno Tours, agencia de viajes en Calle Efrén Rebolledo No. 2, Plaza Yamile, Col. Centro, Actopan, Hidalgo.
Ayudas al personal de la agencia a resolver dudas de destinos, promociones, requisitos de viaje y uso del sistema.
Responde siempre en español, con frases cortas y claras (máximo 6 renglones), sin tecnicismos. No uses tablas ni encabezados; solo listas cortas y **negritas** si hace falta.

Servicios de la agencia: ${servicios.map((s) => s.nombre).join(", ")}.
Promociones activas: ${promos.length ? promos.map((p) => `${p.titulo} (${p.servicio}${p.lugar ? ", " + p.lugar : ""}): ${p.detalle}`).join(" | ") : "ninguna por ahora"}.
Formas de pago: ${formas.map((f) => f.nombre).join(", ")}.

Reglas de la agencia que debes respetar:
- Si el país de destino es México el viaje es nacional; cualquier otro país es internacional y exige pasaporte vigente a la fecha de salida.
- Viaje redondo lleva fecha de regreso; viaje sencillo no.
- Una solicitud empieza en Pendiente; solo el gerente o el administrador confirman o cancelan.
- Se puede pagar en partes; la factura se imprime cuando el saldo llega a cero.

No inventes precios, horarios, disponibilidad ni requisitos de visa: si no está aquí, di que hay que confirmarlo con la agencia o con la fuente oficial.
No muestres teléfonos ni números de pasaporte de clientes ya registrados; solo repite los que el usuario te acaba de dar, para confirmarlos.

Registrar clientes: pide nombre completo, fecha de nacimiento, sexo (Hombre, Mujer o No especificado) y teléfono de 10 dígitos; el pasaporte es opcional (número, fecha de expedición y de expiración).
Antes de crear_cliente usa buscar_clientes para revisar que no exista ya; si hay uno con el mismo nombre y teléfono, avisa y pregunta si de todos modos lo registras.

Registrar solicitudes: si te piden registrar una solicitud de viaje, usa buscar_clientes para encontrar al cliente (por nombre o teléfono).
Si hay varios parecidos, pregunta cuál es. Si no existe, ofrece registrarlo primero.
Pide lo que falte: servicio, país, ciudad o lugar (opcional), fecha de salida, tipo de viaje (Sencillo o Redondo), fecha de regreso si es redondo, número de viajeros y precio (opcional).
Antes de usar crear_cliente o crear_solicitud muestra un resumen corto y pide que confirmen con un "sí". Nunca guardes sin esa confirmación.
Si una herramienta regresa un error, explícalo con palabras sencillas. Hoy es ${hoy()}.`;
}

app.post("/api/chat", requiere(), async (req, res) => {
  const clave = leerClave();
  if (!clave) return res.status(400).json({ error: "Falta la clave de la API. Guárdala en el archivo clave-ia.txt (ver README)." });
  // Últimos 10 mensajes de la conversación, solo texto
  const mensajes = (req.body.mensajes || []).slice(-10)
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
  if (!mensajes.length || mensajes[mensajes.length - 1].role !== "user") return res.status(400).json({ error: "Escribe una pregunta." });
  try {
    const cliente = new Anthropic({ apiKey: clave });
    const system = await instruccionesAsistente();
    const tools = await herramientasAsistente();
    let respuesta;
    let solicitud = null;
    let clienteNuevo = null;
    // El asistente puede pedir herramientas varias veces (buscar y luego crear); máximo 5 vueltas.
    for (let vuelta = 0; vuelta < 5; vuelta++) {
      respuesta = await cliente.beta.messages.create({
        model: "claude-opus-5-5",
        max_tokens: 1024,
        output_config: { effort: "low" }, // respuestas rápidas y económicas para un chat
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        system,
        tools,
        messages: mensajes,
      });
      if (respuesta.stop_reason !== "tool_use") break;
      mensajes.push({ role: "assistant", content: respuesta.content });
      const resultados = [];
      for (const bloque of respuesta.content.filter((b) => b.type === "tool_use")) {
        const resultado = await usarHerramienta(bloque.name, bloque.input || {});
        if (resultado.folio) solicitud = resultado.folio;
        if (resultado.cliente) clienteNuevo = resultado.cliente;
        resultados.push({ type: "tool_result", tool_use_id: bloque.id, content: resultado.texto, is_error: !!resultado.error });
      }
      mensajes.push({ role: "user", content: resultados });
    }
    if (respuesta.stop_reason === "refusal") return res.json({ texto: "No puedo ayudar con eso. Intenta preguntarlo de otra forma.", solicitud, cliente: clienteNuevo });
    const texto = respuesta.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
    res.json({ texto: texto || (solicitud ? `Listo, registré la solicitud ${solicitud}.` : clienteNuevo ? `Listo, registré al cliente ${clienteNuevo}.` : "No tengo una respuesta para eso."), solicitud, cliente: clienteNuevo });
  } catch (error) {
    console.error("Chat:", error.status, error.message);
    let mensaje = "El asistente no está disponible en este momento.";
    if (error instanceof Anthropic.AuthenticationError) mensaje = "La clave de la API no es válida. Revisa el archivo clave-ia.txt.";
    else if (error instanceof Anthropic.PermissionDeniedError) mensaje = "La clave no tiene permiso o la cuenta no tiene crédito.";
    else if (error instanceof Anthropic.RateLimitError) mensaje = "Demasiadas preguntas seguidas. Espera un momento.";
    else if (error instanceof Anthropic.APIConnectionError) mensaje = "No hay internet para contactar al asistente.";
    else if (error instanceof Anthropic.BadRequestError && /credit/i.test(error.message)) mensaje = "La cuenta de la API no tiene crédito.";
    res.status(502).json({ error: mensaje });
  }
});

// Errores: los mensajes de la base (triggers, datos repetidos) se muestran tal cual al usuario.
app.use((error, _req, res, _next) => {
  console.error(error.message);
  let mensaje = "No se pudo completar la operación.";
  if (error.code === "ECONNREFUSED") mensaje = "No hay conexión con MySQL. Enciende MySQL en el panel de XAMPP.";
  else if (error.code === "ER_BAD_DB_ERROR") mensaje = "No existe la base magno_tours. Impórtala en phpMyAdmin.";
  else if (error.code === "ER_DUP_ENTRY") mensaje = "Ese dato ya está registrado (pasaporte o usuario repetido).";
  else if (error.sqlState === "45000" || error.code === "ER_CHECK_CONSTRAINT_VIOLATED") mensaje = error.sqlMessage || mensaje;
  res.status(500).json({ error: mensaje });
});

function iniciar(puerto = Number(process.env.PORT) || 4173) {
  return new Promise((resolve) => {
    app.listen(puerto, "127.0.0.1", () => resolve(puerto));
  });
}

module.exports = { iniciar, usarHerramienta }; // usarHerramienta se exporta para probarla sin la API

// "npm run preview": se abre en el navegador.
if (require.main === module) {
  iniciar().then((puerto) => console.log(`Magno Tours disponible en http://127.0.0.1:${puerto}`));
}
