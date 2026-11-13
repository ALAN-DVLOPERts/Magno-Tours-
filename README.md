# Magno-Tours-

Proyecto Colavorativo de Agencia de Viajes "Magno Tours" de Actopan, HGO.

Descripción
Magno Tours es una agencia de viajes de Actopan, Hidalgo, que ofrece paquetes turísticos, excursiones, vuelos, hospedaje, cruceros y transporte terrestre. Hoy los datos de sus clientes y de lo que piden quedan repartidos en notas, mensajes y archivos sueltos, así que cuesta encontrarlos y es fácil que se cuele un error de captura.

Estamos desarrollando una aplicación de escritorio en la que el personal de ventas puede registrar a sus clientes y sus pasaportes, capturar las solicitudes de viaje de cada uno y darles seguimiento por estado. Antes de guardar, el sistema revisa los datos y explica qué campo está mal y por qué, y no deja registrar un viaje internacional si el pasaporte vence antes de la salida.

Objetivo general
Desarrollar una aplicación de escritorio sencilla para que el personal de ventas de Magno Tours registre clientes, pasaportes y solicitudes de viaje, les dé seguimiento por estado y evite errores de captura gracias a validaciones claras.

Equipo y roles Scrum
Integrante Rol en Scrum Responsabilidad principal
Alan Alvarado Salinas Product Owner Prioriza el backlog e integra las capas del sistema
Yareli Gaspar Moctezuma Scrum Master Organiza los sprints y coordina las pruebas
Gerardo de Jesús Cansino Herrero Equipo de desarrollo Enlace con Magno Tours y pantallas de clientes
Armando Vicuña Useches Equipo de desarrollo Pantallas de solicitudes
José Vigueras Calva Equipo de desarrollo Lógica de validaciones
Gabriela del Pilar Santander Barrón Equipo de desarrollo Lógica de estados e historial de solicitudes
Kevin Rubén Guerrero Morales Equipo de desarrollo Base de datos y consultas
Tecnologías
Electron para la aplicación de escritorio.
HTML, CSS y JavaScript para la interfaz y la lógica.
Node.js y npm para ejecutar el proyecto y manejar dependencias.
MySQL con XAMPP y phpMyAdmin para la base de datos.
Git y GitHub para el control de versiones.
Agente de IA en AWS para el chat de asistencia (trabajo a futuro).

---

# Magno Tours · Aplicación de escritorio

Aplicación de escritorio, hecha con Electron, para que el personal de **Magno Tours** registre a sus clientes y las solicitudes de viaje de cada uno. Magno Tours es una agencia de viajes ubicada en Calle Efrén Rebolledo No. 2, Plaza Yamile, Col. Centro, Actopan, Hidalgo.

Los datos se guardan en una base de datos **MySQL** que corre en **XAMPP** y se administra con **phpMyAdmin**. Cada persona entra con su usuario y contraseña, y lo que puede hacer depende de su rol.

Proyecto de la materia Tópicos Avanzados de Programación (Instituto Tecnológico de Pachuca). El documento del proyecto es `documentacion/Magno_Tours_Fase2_v9_28oct.docx` (con su PDF) y es el único que se actualiza.

---

## 1. Requisitos

- [Node.js](https://nodejs.org/) versión 18 o más reciente (incluye `npm`).
- [XAMPP](https://www.apachefriends.org/) con **Apache** y **MySQL** (phpMyAdmin viene incluido).

## 2. Preparar la base de datos en phpMyAdmin (solo la primera vez)

1. Abre el **panel de XAMPP** y presiona **Start** en **Apache** y en **MySQL**.
2. En el navegador entra a `http://localhost/phpmyadmin`.
3. Arriba, abre la pestaña **Importar**.
4. En **Seleccionar archivo** elige `base_de_datos/magno_tours.sql` y presiona **Importar** (o **Continuar**) al final de la página.
   Esto crea la base `magno_tours` con sus tablas, los catálogos, los tres usuarios iniciales y dos promociones.
5. (Opcional) Si quieren clientes y solicitudes de prueba: selecciona la base **magno_tours** en la lista de la izquierda, vuelve a **Importar** y elige `base_de_datos/datos_prototipo.sql`.

6. **Facturas en PDF (PHP).** La aplicación no se mueve a `htdocs`; solo la factura:
   1. Crea la carpeta `C:\xampp\htdocs\magno_tours`.
   2. Copia ahí los archivos `php/factura.php` y `php/logo.jpg` de este proyecto (el logo sale en el encabezado de la factura).
   3. Descarga FPDF desde [www.fpdf.org](http://www.fpdf.org) (sección *Descargas*), descomprímelo y renombra la carpeta a `fpdf`, de modo que quede `C:\xampp\htdocs\magno_tours\fpdf\fpdf.php`.
   4. Para probar, con Apache encendido abre `http://localhost/magno_tours/factura.php?solicitud=1`. Si dice que la solicitud todavía no tiene factura, PHP ya funciona.

Importar `magno_tours.sql` otra vez **borra todo** y deja la base como nueva.

Usuarios iniciales (cámbienlos o creen los suyos desde la sección **Usuarios**):

| Usuario | Contraseña | Rol |
|---|---|---|
| `admin` | `admin123` | Administrador |
| `gerente` | `gerente123` | Gerente |
| `empleado` | `empleado123` | Empleado |

## 3. Instalar y abrir la aplicación

Desde la carpeta del proyecto (`Electron-app`), con MySQL encendido en XAMPP:

```powershell
npm install
npm start
```

`npm install` solo se hace una vez (o cuando cambie `package.json`); descarga Electron, Express y `mysql2`.

| Comando | Qué hace |
|---|---|
| `npm start` | Abre la aplicación de escritorio. |
| `npm run preview` | Abre la misma aplicación en el navegador, en `http://127.0.0.1:4173`. |
| `npm test` | Revisa que los archivos JavaScript no tengan errores de escritura. |

Si al entrar aparece "No hay conexión con MySQL", falta encender MySQL en XAMPP. Si dice "No existe la base magno_tours", falta el paso 2.

La conexión usa el usuario `root` sin contraseña, que es como viene XAMPP, en el **puerto 3307** (en este equipo el 3306 lo ocupa MySQL80). Si su MySQL de XAMPP usa otro puerto, antes de `npm start` escriban `$env:DB_PORT="3306"` en PowerShell, y cambien el número también en `factura.php`. Si su MySQL tiene contraseña, antes de `npm start` escriban en la terminal `set DB_PASSWORD=su_contraseña` (en PowerShell: `$env:DB_PASSWORD="su_contraseña"`).

## 4. Roles

| Rol | Qué puede hacer |
|---|---|
| **Empleado** | Atiende a los clientes: registra, consulta y edita clientes y solicitudes; registra precio y pagos; imprime facturas; pasa una solicitud a *Pendiente* o *En proceso*; usa el asistente virtual, que también puede registrar solicitudes. |
| **Gerente** | Todo lo del empleado, además **confirma o cancela** solicitudes y maneja las **promociones**: crearlas, editarlas, activarlas o desactivarlas y eliminarlas. |
| **Administrador** | Todo lo del gerente, además maneja a los **usuarios** (empleados, gerentes y administradores): crearlos, editar su nombre, usuario, rol o contraseña, activarlos o desactivarlos y eliminarlos. No puede eliminarse a sí mismo ni quitarse su rol. Un usuario que ya registró pagos o facturas no se elimina, se desactiva, para no perder quién hizo cada cobro. |

Las secciones que un rol no puede usar no aparecen en su menú, y el servidor también revisa el rol antes de guardar.

## 5. Qué puede hacer la aplicación

- **Inicio:** indicadores, solicitudes recientes, próximas salidas, **carrusel de promociones activas** (cambia solo cada 5 segundos o con las flechas; cada promoción tiene un botón para crear la solicitud) y el catálogo de servicios.
- **Clientes:** registrar, buscar por nombre o teléfono, consultar y editar. El pasaporte es opcional.
- **Solicitudes:** registrar y editar viajes con servicio, país, ciudad o lugar (opcional), fechas, tipo de viaje y número de viajeros. Se filtran por estado y el estado se cambia desde el detalle; cada cambio queda en el historial.
- **Precio, pagos y factura:** en *Editar solicitud* se captura el precio total. En el detalle de la solicitud se registran pagos (efectivo, tarjeta de débito, tarjeta de crédito o transferencia); se puede pagar en partes. Se ve lo pagado y el saldo. Cuando el saldo llega a cero aparece **Imprimir factura (PDF)**, que abre la factura en el navegador para imprimirla o guardarla. No hay carrito: cada venta es una sola solicitud.
- **Búsqueda:** busca a la vez en clientes y solicitudes.
- **Promociones** (gerente y administrador) y **Usuarios** (administrador).
- **Clasificación automática:** si el país es México el viaje es *Nacional*; cualquier otro país es *Internacional* y exige un pasaporte vigente a la fecha de salida.
- **Validaciones:** cada error dice qué campo está mal y por qué. La base de datos repite las reglas importantes, así que un dato incorrecto no se guarda aunque llegue por otro camino.
- **Asistente virtual:** chat con IA que responde dudas de destinos, promociones y uso del sistema, y **registra clientes y solicitudes** cuando se lo piden (ver sección 10).
- **Menú lateral ajustable:** el botón de tres rayas lo contrae a solo íconos o lo expande. También se arrastra su borde derecho para hacerlo más ancho o más angosto (de 180 a 360 px). Doble clic en el borde lo regresa a su tamaño normal. El ancho y si está contraído se recuerdan en cada equipo.
- **Animaciones:** pantalla de carga, carga breve al cambiar de sección y elementos que aparecen en cascada en todas las secciones (se desactivan si el sistema pide reducir el movimiento).
- **Colores:** azul, rojo y blanco, como el logotipo de Magno Tours.

## 6. Cómo viajan los datos

```
Ventana (browser.html + browser.js)  →  servidor local (server.js)  →  MySQL de XAMPP (magno_tours)
```

1. `browser.js` dibuja las pantallas y valida los formularios.
2. Cuando hay que leer o guardar, `browser.js` le pide el dato a `server.js` (por ejemplo, `POST /api/clientes`).
3. `server.js` revisa que haya sesión y que el rol alcance, y hace la consulta en MySQL.
4. Después de guardar, `browser.js` vuelve a leer todo (`/api/datos`) y redibuja la pantalla.

Así la contraseña de MySQL y las consultas nunca están en la ventana; solo en `server.js`.

La factura es aparte: `server.js` registra la factura en la tabla `factura` y la ventana abre `http://localhost/magno_tours/factura.php?solicitud=N`. Ese archivo PHP, que corre en el Apache de XAMPP, lee la base y arma el PDF con FPDF.

## 7. Estructura de archivos

```
Electron-app/
├── package.json          Nombre del proyecto, dependencias y comandos
├── README.md             Este archivo
├── php/
│   └── factura.php       Arma la factura en PDF; se copia a C:\xampp\htdocs\magno_tours
├── base_de_datos/
│   ├── magno_tours.sql   Crea la base: tablas, reglas, vistas, procedimiento, usuarios y promociones
│   └── datos_prototipo.sql  Clientes y solicitudes de prueba (opcional)
└── Browser/
    ├── main.js           Abre la ventana de Electron y arranca server.js
    ├── server.js         Servidor local: conexión a MySQL, inicio de sesión, roles y rutas /api
    ├── browser.html      Estructura de todas las pantallas (entrada, menú, secciones, ventanas, chat)
    ├── browser.css       Estilos, colores y animaciones
    └── browser.js        Pantallas, validaciones y eventos
```

## 8. Cómo está organizado el código

**`server.js`**

| Parte | Qué contiene |
|---|---|
| Conexión | `db`: datos para conectarse a MySQL (localhost, root, sin contraseña, base magno_tours). |
| Sesión y roles | `POST /api/login` revisa usuario y contraseña; `requiere(rol)` deja pasar solo si el rol alcanza. |
| Lectura | `GET /api/datos` regresa clientes, solicitudes, promociones, servicios y países. |
| Pagos y factura | `/api/solicitudes/:id/pagos` (lista), `/api/pagos` (registrar) y `/api/solicitudes/:id/factura` (emitir, solo sin saldo). |
| Guardado | `/api/clientes`, `/api/solicitudes`, `/api/solicitudes/:id/estado`, `/api/promociones`, `/api/usuarios`. Lo que toca varias tablas se guarda con `enTransaccion`: o se guarda todo o nada. |
| Errores | Traduce los errores de MySQL a mensajes claros para el usuario. |

**`browser.js`**

| Parte | Qué contiene |
|---|---|
| Datos | `state` (lo que llegó de la base), `session` (quién entró), `api` (habla con el servidor), `loadData` y `saveAndReload`. |
| Entrada y roles | `login`, `setLoggedOut`, `can(rol)` y `renderProfile` (oculta lo que el rol no puede usar). |
| Pantallas | `renderDashboard`, `renderCarousel`, `renderClients`, `renderRequests`, `renderSearch`, `renderPromotions`, `renderUsers`. `renderAll` las actualiza todas. |
| Formularios | `openClientForm`, `openRequestForm`, `openPromotionForm`, `openUserForm`. |
| Validaciones | `validateClient`, `validatePassport`, `validateRequest`. |
| Detalle | `openRequestDetail` y `openClientDetail` abren el panel lateral; `paymentSection` y `loadPayments` muestran precio, pagos y el botón de factura. |
| Eventos | Un solo `document.addEventListener("click", ...)` al final atiende todos los botones. |

## 9. Base de datos

La base `magno_tours` está normalizada hasta la tercera forma normal: cada dato se guarda una sola vez y en la tabla que le corresponde.

| Tabla | Qué guarda |
|---|---|
| `cliente`, `pasaporte` | Datos del cliente y su pasaporte (máximo uno por cliente). |
| `solicitud_viaje`, `historial_estado` | Cada viaje solicitado y cada cambio de estado con su fecha y hora. |
| `pago`, `forma_pago`, `factura` | Cada pago con su forma de pago y quién lo registró; una factura por solicitud. |
| `promocion` | Promociones; solo las activas salen en el carrusel. |
| `usuario`, `rol` | Personas que usan la app y su rol. La contraseña se guarda cifrada (SHA-256 con una "sal" distinta por usuario). |
| `sexo`, `pais`, `servicio`, `tipo_viaje`, `estado_solicitud` | Catálogos: listas fijas de opciones. |

Datos que se pueden calcular no se guardan: el folio `SOL-###`, la clave `CLI-###`, la edad, el ámbito (nacional o internacional) las noches, lo pagado y el saldo salen de las vistas `v_cliente`, `v_solicitud_detalle` y `v_saldo`. La base no acepta un pago si la solicitud no tiene precio, está cancelada o el pago supera el saldo. El cambio de estado se hace con el procedimiento `cambiar_estado`, que también escribe el historial.

## 10. Asistente virtual (chat con IA)

El botón de chat (abajo a la derecha) conversa con la API de Claude. El asistente conoce los datos de la agencia, sus servicios, las formas de pago y las **promociones activas de la base**, y respeta las reglas de la agencia; si no sabe algo (precios, horarios, visas) dice que hay que confirmarlo. Esas instrucciones están en `instruccionesAsistente()` dentro de `server.js`: para "entrenarlo" mejor, se agregan ahí más datos o reglas.

**Registrar clientes y solicitudes desde el chat.** El asistente tiene tres herramientas (`herramientasAsistente()` en `server.js`):

- `buscar_clientes`: busca al cliente por nombre o teléfono.
- `crear_cliente`: registra un cliente nuevo (nombre, fecha de nacimiento, sexo, teléfono de 10 dígitos y, si se da, el pasaporte) con las mismas reglas que el formulario. Antes revisa que no exista ya.
- `crear_solicitud`: guarda la solicitud en estado *Pendiente* con las mismas reglas que el formulario (fechas, viajeros, pasaporte vigente si es internacional).

Por ejemplo: *"Registra un viaje a Cancún para Fernanda Ruiz, salida 10 de diciembre, redondo, regreso el 15, 2 personas"*. El asistente pide lo que falte, muestra un resumen y **solo guarda cuando le contestan "sí"**. Al guardar, la lista de solicitudes se actualiza sola. Si el cliente no existe, el asistente ofrece registrarlo ahí mismo.

**Poner la clave (una sola vez):**

1. Crea una clave en [console.anthropic.com](https://console.anthropic.com) > *API Keys* > *Create Key* (empieza con `sk-ant-api03-`). La cuenta necesita crédito.
2. En la carpeta `Electron-app` crea un archivo de texto llamado `clave-ia.txt` y pega dentro solo la clave.
3. Cierra y vuelve a abrir la app con `npm start`.

`clave-ia.txt` está en `.gitignore`, así que no se sube a GitHub. Nunca pongan la clave en `browser.js` ni la compartan por chat. Cada pregunta cuesta una fracción de centavo de dólar.
