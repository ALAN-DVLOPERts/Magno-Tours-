// =====================================================================
//  Magno Tours · Exportar a SQL los datos guardados en el prototipo
//  1. Abre la aplicación (npm start) y presiona Ctrl + Shift + I.
//  2. En la pestaña "Console" pega todo este archivo y presiona Enter.
//  3. El script queda copiado: pégalo en phpMyAdmin > SQL (con la base
//     magno_tours ya creada con magno_tours.sql) y dale Continuar.
// =====================================================================
(() => {
  const raw = localStorage.getItem("magno-tours-prototype-v2");
  if (!raw) return console.warn("No hay datos guardados en este equipo todavía.");
  const { clients = [], requests = [] } = JSON.parse(raw);
  const q = (value) => (value === null || value === undefined || value === "" ? "NULL" : `'${String(value).replace(/\\/g, "\\\\").replace(/'/g, "''")}'`);
  const num = (id) => Number(String(id).split("-")[1]);
  const fecha = (iso) => q(iso ? iso.slice(0, 19).replace("T", " ") : null);
  const sql = [
    "-- Datos exportados del prototipo Magno Tours el " + new Date().toLocaleString("es-MX"),
    "USE magno_tours;",
    "SET FOREIGN_KEY_CHECKS = 0;",
    "DELETE FROM historial_estado; DELETE FROM solicitud_viaje; DELETE FROM pasaporte; DELETE FROM cliente;",
    "SET FOREIGN_KEY_CHECKS = 1;",
    "START TRANSACTION;",
  ];
  clients.forEach((c) => {
    sql.push(`INSERT INTO cliente (id_cliente, nombre_completo, fecha_nacimiento, id_sexo, telefono) VALUES (${num(c.id)}, ${q(c.name)}, ${q(c.birth)}, (SELECT id_sexo FROM sexo WHERE nombre = ${q(c.sex)}), ${q(c.phone)});`);
  });
  clients.filter((c) => c.passport).forEach((c) => {
    sql.push(`INSERT INTO pasaporte (numero, id_cliente, fecha_expedicion, fecha_expiracion) VALUES (${q(c.passport.number)}, ${num(c.id)}, ${q(c.passport.issue)}, ${q(c.passport.expiry)});`);
  });
  [...requests].sort((a, b) => num(a.id) - num(b.id)).forEach((r) => {
    const redondo = r.tripType === "Redondo";
    sql.push(`INSERT INTO solicitud_viaje (id_solicitud, id_cliente, id_servicio, id_pais, lugar, fecha_salida, fecha_regreso, id_tipo_viaje, num_viajeros, observaciones, id_estado) VALUES (${num(r.id)}, ${num(r.clientId)}, (SELECT id_servicio FROM servicio WHERE nombre = ${q(r.service)}), (SELECT id_pais FROM pais WHERE nombre = ${q(r.destination)}), ${q(r.place)}, ${q(r.departure)}, ${redondo ? q(r.returnDate) : "NULL"}, ${redondo ? 2 : 1}, ${Number(r.travelers)}, ${q(r.notes)}, (SELECT id_estado FROM estado_solicitud WHERE nombre = ${q(r.status)}));`);
    (r.history || []).forEach((h) => {
      sql.push(`INSERT INTO historial_estado (id_solicitud, id_estado_anterior, id_estado_nuevo, fecha_hora) VALUES (${num(r.id)}, (SELECT id_estado FROM estado_solicitud WHERE nombre = ${q(h.from)}), (SELECT id_estado FROM estado_solicitud WHERE nombre = ${q(h.to)}), ${fecha(h.at)});`);
    });
  });
  sql.push("COMMIT;");
  const text = sql.join("\n");
  if (typeof copy === "function") copy(text);
  console.log(text);
  console.log(`Listo: ${clients.length} clientes y ${requests.length} solicitudes. El script ya está copiado; pégalo en phpMyAdmin > SQL.`);
})();
