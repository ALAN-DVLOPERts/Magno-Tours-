SET NAMES utf8mb4;

-- #####################################################################
-- 1. DDL · Lenguaje de definición de datos
-- #####################################################################
DROP DATABASE IF EXISTS magno_tours;
CREATE DATABASE magno_tours CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE magno_tours;
-- ---------------------------------------------------------------------
-- Catálogos: cada valor fijo se guarda una sola vez y las demás tablas
-- lo referencian por su id (evita repetir texto y errores de captura).
-- ---------------------------------------------------------------------
CREATE TABLE sexo (
  id_sexo     TINYINT UNSIGNED PRIMARY KEY,
  nombre      VARCHAR(20) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE pais (
  id_pais     SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(40) NOT NULL UNIQUE,
  es_nacional BOOLEAN NOT NULL DEFAULT FALSE       -- RN-09: solo México es nacional
) ENGINE=InnoDB;

CREATE TABLE servicio (
  id_servicio TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(40) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE tipo_viaje (
  id_tipo_viaje TINYINT UNSIGNED PRIMARY KEY,       -- 1 = Sencillo, 2 = Redondo
  nombre        VARCHAR(10) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE estado_solicitud (
  id_estado   TINYINT UNSIGNED PRIMARY KEY,
  nombre      VARCHAR(15) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Cliente (R1). El identificador visible CLI-### no se guarda: se arma
-- con el consecutivo (CONCAT en las vistas), así nunca se repite (RN-12).
-- ---------------------------------------------------------------------
CREATE TABLE cliente (
  id_cliente       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre_completo  VARCHAR(80) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  id_sexo          TINYINT UNSIGNED NOT NULL,
  telefono         CHAR(10) NOT NULL,
  fecha_registro   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY ix_cliente_nombre (nombre_completo),          -- búsqueda por nombre (RN-14)
  KEY ix_cliente_telefono (telefono),               -- búsqueda por teléfono y aviso de duplicado (RN-15)
  CONSTRAINT fk_cliente_sexo FOREIGN KEY (id_sexo) REFERENCES sexo (id_sexo),
  CONSTRAINT ck_cliente_telefono CHECK (telefono REGEXP '^[0-9]{10}$'),                     -- RN-02
  CONSTRAINT ck_cliente_nombre   CHECK (nombre_completo REGEXP '^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$') -- RN-01
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Pasaporte (R2). id_cliente es UNIQUE: un cliente tiene a lo sumo un
-- pasaporte (RN-05). Al capturar uno nuevo se actualiza esta fila.
-- ---------------------------------------------------------------------
CREATE TABLE pasaporte (
  numero           VARCHAR(12) PRIMARY KEY,
  id_cliente       INT UNSIGNED NOT NULL UNIQUE,
  fecha_expedicion DATE NOT NULL,
  fecha_expiracion DATE NOT NULL,
  CONSTRAINT fk_pasaporte_cliente FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT ck_pasaporte_numero CHECK (numero REGEXP '^[A-Za-z0-9]{6,12}$'),      -- RN-23
  CONSTRAINT ck_pasaporte_fechas CHECK (fecha_expedicion < fecha_expiracion)       -- RN-04
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Solicitud de viaje (R3). El folio SOL-### se arma igual que la clave
-- del cliente. El ámbito NO se guarda: depende del país
-- (pais.es_nacional), y guardarlo sería una dependencia transitiva.
-- ---------------------------------------------------------------------
CREATE TABLE solicitud_viaje (
  id_solicitud   INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_cliente     INT UNSIGNED NOT NULL,
  id_servicio    TINYINT UNSIGNED NOT NULL,
  id_pais        SMALLINT UNSIGNED NOT NULL,
  lugar          VARCHAR(60) NULL,                 -- ciudad o lugar, opcional
  fecha_salida   DATE NOT NULL,
  fecha_regreso  DATE NULL,                        -- nulo en viaje sencillo (RN-07)
  id_tipo_viaje  TINYINT UNSIGNED NOT NULL,
  num_viajeros   SMALLINT UNSIGNED NOT NULL,
  observaciones  VARCHAR(200) NULL,                -- RN-18
  precio_total   DECIMAL(10,2) NULL,               -- precio acordado del viaje, en pesos; nulo mientras no se cotiza
  id_estado      TINYINT UNSIGNED NOT NULL DEFAULT 1,   -- inicia en Pendiente (RN-11)
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY ix_solicitud_estado (id_estado),             -- listado de pendientes (R9)
  KEY ix_solicitud_duplicado (id_cliente, id_pais, fecha_salida),   -- aviso de duplicado (RN-21)
  CONSTRAINT fk_solicitud_cliente  FOREIGN KEY (id_cliente)    REFERENCES cliente (id_cliente),
  CONSTRAINT fk_solicitud_servicio FOREIGN KEY (id_servicio)   REFERENCES servicio (id_servicio),
  CONSTRAINT fk_solicitud_pais     FOREIGN KEY (id_pais)       REFERENCES pais (id_pais),
  CONSTRAINT fk_solicitud_tipo     FOREIGN KEY (id_tipo_viaje) REFERENCES tipo_viaje (id_tipo_viaje),
  CONSTRAINT fk_solicitud_estado   FOREIGN KEY (id_estado)     REFERENCES estado_solicitud (id_estado),
  CONSTRAINT ck_solicitud_viajeros CHECK (num_viajeros >= 1),                       -- RN-08
  CONSTRAINT ck_solicitud_precio   CHECK (precio_total IS NULL OR precio_total > 0),
  CONSTRAINT ck_solicitud_regreso  CHECK (                                          -- RN-07
    (id_tipo_viaje = 1 AND fecha_regreso IS NULL) OR
    (id_tipo_viaje = 2 AND fecha_regreso IS NOT NULL AND fecha_regreso >= fecha_salida))
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Historial de estados (R15). Un registro por cada cambio (RN-19).
-- ---------------------------------------------------------------------
CREATE TABLE historial_estado (
  id_historial        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_solicitud        INT UNSIGNED NOT NULL,
  id_estado_anterior  TINYINT UNSIGNED NOT NULL,
  id_estado_nuevo     TINYINT UNSIGNED NOT NULL,
  fecha_hora          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY ix_historial_solicitud (id_solicitud, fecha_hora),
  CONSTRAINT fk_historial_solicitud FOREIGN KEY (id_solicitud)       REFERENCES solicitud_viaje (id_solicitud) ON DELETE CASCADE,
  CONSTRAINT fk_historial_anterior  FOREIGN KEY (id_estado_anterior) REFERENCES estado_solicitud (id_estado),
  CONSTRAINT fk_historial_nuevo     FOREIGN KEY (id_estado_nuevo)    REFERENCES estado_solicitud (id_estado),
  CONSTRAINT ck_historial_distinto  CHECK (id_estado_anterior <> id_estado_nuevo)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Usuarios y roles. Cada persona que usa la aplicación entra con su
-- usuario y contraseña. La contraseña no se guarda tal cual: se guarda
-- su huella SHA-256 mezclada con una "sal" (texto al azar por usuario).
--   Empleado:      registra y edita clientes y solicitudes.
--   Gerente:       además confirma o cancela solicitudes y maneja promociones.
--   Administrador: además da de alta y desactiva usuarios.
-- ---------------------------------------------------------------------
CREATE TABLE rol (
  id_rol      TINYINT UNSIGNED PRIMARY KEY,
  nombre      VARCHAR(15) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE usuario (
  id_usuario  SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario     VARCHAR(30) NOT NULL UNIQUE,
  nombre      VARCHAR(80) NOT NULL,
  id_rol      TINYINT UNSIGNED NOT NULL,
  sal         CHAR(16) NOT NULL,
  contrasena  CHAR(64) NOT NULL,                    -- SHA2(CONCAT(sal, contraseña), 256)
  activo      BOOLEAN NOT NULL DEFAULT TRUE,
  CONSTRAINT fk_usuario_rol FOREIGN KEY (id_rol) REFERENCES rol (id_rol)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Promociones que se muestran en el carrusel de Inicio.
-- ---------------------------------------------------------------------
CREATE TABLE promocion (
  id_promocion   SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo         VARCHAR(60) NOT NULL,
  detalle        VARCHAR(160) NOT NULL,
  id_servicio    TINYINT UNSIGNED NOT NULL,
  lugar          VARCHAR(60) NULL,
  activa         BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_promocion_servicio FOREIGN KEY (id_servicio) REFERENCES servicio (id_servicio)
) ENGINE=InnoDB;


-- ---------------------------------------------------------------------
-- Pagos y facturas. Una solicitud puede pagarse en varias partes
-- (anticipo y liquidación), cada una con su forma de pago. Lo pagado y
-- el saldo no se guardan: se calculan sumando los pagos (v_saldo).
-- La factura se emite una sola vez por solicitud, cuando ya no hay saldo.
-- ---------------------------------------------------------------------
CREATE TABLE forma_pago (
  id_forma_pago TINYINT UNSIGNED PRIMARY KEY,
  nombre        VARCHAR(25) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE pago (
  id_pago       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_solicitud  INT UNSIGNED NOT NULL,
  id_forma_pago TINYINT UNSIGNED NOT NULL,
  monto         DECIMAL(10,2) NOT NULL,
  fecha_hora    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_usuario    SMALLINT UNSIGNED NOT NULL,         -- quién registró el pago
  KEY ix_pago_solicitud (id_solicitud),
  CONSTRAINT fk_pago_solicitud FOREIGN KEY (id_solicitud)  REFERENCES solicitud_viaje (id_solicitud),
  CONSTRAINT fk_pago_forma     FOREIGN KEY (id_forma_pago) REFERENCES forma_pago (id_forma_pago),
  CONSTRAINT fk_pago_usuario   FOREIGN KEY (id_usuario)    REFERENCES usuario (id_usuario),
  CONSTRAINT ck_pago_monto     CHECK (monto > 0)
) ENGINE=InnoDB;

CREATE TABLE factura (
  id_factura    INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,      -- folio visible FAC-###
  id_solicitud  INT UNSIGNED NOT NULL UNIQUE,                 -- una factura por solicitud
  fecha_emision DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_usuario    SMALLINT UNSIGNED NOT NULL,                   -- quién la emitió
  CONSTRAINT fk_factura_solicitud FOREIGN KEY (id_solicitud) REFERENCES solicitud_viaje (id_solicitud),
  CONSTRAINT fk_factura_usuario   FOREIGN KEY (id_usuario)   REFERENCES usuario (id_usuario)
) ENGINE=InnoDB;


-- ---------------------------------------------------------------------
-- Vista de consulta: junta lo que muestra el detalle de una solicitud
-- y calcula lo que no se guarda (ámbito, edad y noches).
-- ---------------------------------------------------------------------
CREATE VIEW v_cliente AS
SELECT c.id_cliente, CONCAT('CLI-', LPAD(c.id_cliente, 3, '0')) AS clave,
       c.nombre_completo, c.fecha_nacimiento,
       TIMESTAMPDIFF(YEAR, c.fecha_nacimiento, CURDATE()) AS edad,
       x.nombre AS sexo, c.telefono,
       IF(p.numero IS NULL, 'Sin pasaporte', 'Pasaporte registrado') AS pasaporte
FROM cliente c
JOIN sexo x           ON x.id_sexo = c.id_sexo
LEFT JOIN pasaporte p ON p.id_cliente = c.id_cliente;

CREATE VIEW v_solicitud_detalle AS
SELECT CONCAT('SOL-', LPAD(s.id_solicitud, 3, '0')) AS folio, s.id_solicitud,
       CONCAT('CLI-', LPAD(c.id_cliente, 3, '0')) AS cliente, c.nombre_completo, c.telefono,
       TIMESTAMPDIFF(YEAR, c.fecha_nacimiento, CURDATE()) AS edad,                 -- RN-24
       sv.nombre AS servicio, p.nombre AS pais, s.lugar,
       IF(p.es_nacional, 'Nacional', 'Internacional') AS ambito,                     -- RN-09
       s.fecha_salida, s.fecha_regreso, t.nombre AS tipo_viaje,
       IF(s.id_tipo_viaje = 2, DATEDIFF(s.fecha_regreso, s.fecha_salida), NULL) AS noches,  -- RN-25
       s.num_viajeros, COALESCE(s.observaciones, 'Sin observaciones') AS observaciones,
       e.nombre AS estado, ps.numero AS pasaporte, ps.fecha_expiracion
FROM solicitud_viaje s
JOIN cliente c           ON c.id_cliente = s.id_cliente
JOIN servicio sv         ON sv.id_servicio = s.id_servicio
JOIN pais p              ON p.id_pais = s.id_pais
JOIN tipo_viaje t        ON t.id_tipo_viaje = s.id_tipo_viaje
JOIN estado_solicitud e  ON e.id_estado = s.id_estado
LEFT JOIN pasaporte ps   ON ps.id_cliente = c.id_cliente;

-- Lo pagado y el saldo de cada solicitud, calculados a partir de sus pagos.
CREATE VIEW v_saldo AS
SELECT s.id_solicitud, s.precio_total,
       COALESCE(SUM(pg.monto), 0) AS pagado,
       s.precio_total - COALESCE(SUM(pg.monto), 0) AS saldo
FROM solicitud_viaje s
LEFT JOIN pago pg ON pg.id_solicitud = s.id_solicitud
GROUP BY s.id_solicitud, s.precio_total;

-- ---------------------------------------------------------------------
-- Cambio de estado: guarda el estado y su historial en una sola
-- operación; si algo falla no se guarda nada (RN-20, RNF-05).
-- ---------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE cambiar_estado(IN p_id_solicitud INT UNSIGNED, IN p_id_estado TINYINT UNSIGNED)
BEGIN
  DECLARE v_anterior TINYINT UNSIGNED;
  DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK; RESIGNAL; END;
  START TRANSACTION;
  SELECT id_estado INTO v_anterior FROM solicitud_viaje WHERE id_solicitud = p_id_solicitud FOR UPDATE;
  IF v_anterior IS NULL THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La solicitud no existe.';
  END IF;
  IF v_anterior <> p_id_estado THEN
    UPDATE solicitud_viaje SET id_estado = p_id_estado WHERE id_solicitud = p_id_solicitud;
    INSERT INTO historial_estado (id_solicitud, id_estado_anterior, id_estado_nuevo)
    VALUES (p_id_solicitud, v_anterior, p_id_estado);
  END IF;
  COMMIT;
END$$

-- Un viaje internacional exige un pasaporte vigente a la fecha de salida (RN-10).
-- Se revisa al registrar y al modificar la solicitud.
CREATE TRIGGER tr_solicitud_pasaporte_ins BEFORE INSERT ON solicitud_viaje
FOR EACH ROW
BEGIN
  IF (SELECT es_nacional FROM pais WHERE id_pais = NEW.id_pais) = FALSE
     AND NOT EXISTS (SELECT 1 FROM pasaporte WHERE id_cliente = NEW.id_cliente AND fecha_expiracion >= NEW.fecha_salida) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El viaje es internacional y el cliente no tiene un pasaporte vigente a la fecha de salida.';
  END IF;
END$$

CREATE TRIGGER tr_solicitud_pasaporte_upd BEFORE UPDATE ON solicitud_viaje
FOR EACH ROW
BEGIN
  IF NEW.id_pais <> OLD.id_pais OR NEW.fecha_salida <> OLD.fecha_salida THEN
    IF (SELECT es_nacional FROM pais WHERE id_pais = NEW.id_pais) = FALSE
       AND NOT EXISTS (SELECT 1 FROM pasaporte WHERE id_cliente = NEW.id_cliente AND fecha_expiracion >= NEW.fecha_salida) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El viaje es internacional y el cliente no tiene un pasaporte vigente a la fecha de salida.';
    END IF;
  END IF;
END$$

-- Un pago solo se acepta si la solicitud ya tiene precio, no está cancelada
-- y el pago no hace que lo pagado supere el precio.
CREATE TRIGGER tr_pago_valido BEFORE INSERT ON pago
FOR EACH ROW
BEGIN
  DECLARE v_precio DECIMAL(10,2);
  DECLARE v_estado TINYINT UNSIGNED;
  SELECT precio_total, id_estado INTO v_precio, v_estado FROM solicitud_viaje WHERE id_solicitud = NEW.id_solicitud;
  IF v_precio IS NULL THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Primero registra el precio de la solicitud.';
  END IF;
  IF v_estado = 4 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se pueden registrar pagos en una solicitud cancelada.';
  END IF;
  IF (SELECT COALESCE(SUM(monto), 0) FROM pago WHERE id_solicitud = NEW.id_solicitud) + NEW.monto > v_precio THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El pago supera el saldo pendiente.';
  END IF;
END$$

-- El precio no puede bajar de lo que ya se pagó.
CREATE TRIGGER tr_solicitud_precio_upd BEFORE UPDATE ON solicitud_viaje
FOR EACH ROW
BEGIN
  IF NOT (NEW.precio_total <=> OLD.precio_total)
     AND (SELECT COALESCE(SUM(monto), 0) FROM pago WHERE id_solicitud = NEW.id_solicitud) > COALESCE(NEW.precio_total, 0) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El precio no puede ser menor a lo que ya se pagó.';
  END IF;
END$$
DELIMITER ;

-- #####################################################################
-- 2. DML · Lenguaje de manipulación de datos
-- #####################################################################
-- ---------------------------------------------------------------------
-- Datos de los catálogos (los mismos que usa el prototipo)
-- ---------------------------------------------------------------------
INSERT INTO sexo VALUES (1, 'Mujer'), (2, 'Hombre'), (3, 'No especificado');
INSERT INTO tipo_viaje VALUES (1, 'Sencillo'), (2, 'Redondo');
INSERT INTO estado_solicitud VALUES (1, 'Pendiente'), (2, 'En proceso'), (3, 'Confirmada'), (4, 'Cancelada');
INSERT INTO pais (nombre, es_nacional) VALUES
  ('México', TRUE), ('Canadá', FALSE), ('Estados Unidos', FALSE), ('España', FALSE), ('Francia', FALSE),
  ('Italia', FALSE), ('Japón', FALSE), ('Argentina', FALSE), ('Colombia', FALSE), ('Brasil', FALSE), ('Otro', FALSE);
INSERT INTO servicio (nombre) VALUES
  ('Paquete turístico'), ('Excursión de playa'), ('Vuelo'), ('Transporte terrestre'),
  ('Hospedaje'), ('Crucero'), ('Viaje corporativo'), ('Servicios complementarios');

INSERT INTO forma_pago VALUES (1, 'Efectivo'), (2, 'Tarjeta de débito'), (3, 'Tarjeta de crédito'), (4, 'Transferencia');

-- Roles, usuarios iniciales y promociones
INSERT INTO rol VALUES (1, 'Empleado'), (2, 'Gerente'), (3, 'Administrador');
-- Usuarios iniciales. Cambien estas contraseñas desde la sección Usuarios.
INSERT INTO usuario (usuario, nombre, id_rol, sal, contrasena) VALUES
  ('admin',    'Administrador',  3, 'a1b2c3d4e5f60718', SHA2(CONCAT('a1b2c3d4e5f60718', 'admin123'), 256)),
  ('gerente',  'Gerente',        2, 'b2c3d4e5f6071829', SHA2(CONCAT('b2c3d4e5f6071829', 'gerente123'), 256)),
  ('empleado', 'Empleado',       1, 'c3d4e5f60718293a', SHA2(CONCAT('c3d4e5f60718293a', 'empleado123'), 256));
INSERT INTO promocion (titulo, detalle, id_servicio, lugar) VALUES
  ('Mazatlán en autobús 2x1', 'Salida grupal desde Actopan a playas de Sinaloa.', 2, 'Mazatlán, Sinaloa'),
  ('Ixtapa Zihuatanejo 3x2', 'Paga dos lugares y viajan tres.', 2, 'Ixtapa Zihuatanejo, Guerrero');

-- Consultas de ejemplo (quita los dos guiones para probarlas en la pestaña SQL):
-- SELECT * FROM v_solicitud_detalle WHERE estado = 'Pendiente' ORDER BY fecha_salida;   -- consultar
-- SELECT * FROM v_saldo WHERE saldo > 0;                                                 -- quién debe
-- UPDATE promocion SET activa = FALSE WHERE id_promocion = 1;                            -- modificar
-- DELETE FROM promocion WHERE id_promocion = 2;                                          -- borrar

-- #####################################################################
-- 3. DCL · Lenguaje de control de datos
-- Usuario de MySQL solo para la aplicación: puede leer y escribir datos y
-- usar el procedimiento, pero no puede crear, cambiar ni borrar tablas.
-- (La app usa root por defecto; para usar este usuario, antes de npm start:
--  $env:DB_USER="magno_app"; $env:DB_PASSWORD="MagnoTours2026")
-- #####################################################################
DROP USER IF EXISTS 'magno_app'@'localhost';
CREATE USER 'magno_app'@'localhost' IDENTIFIED BY 'MagnoTours2026';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON magno_tours.* TO 'magno_app'@'localhost';
-- Si algún día se quiere quitar un permiso se usa REVOKE, por ejemplo:
-- REVOKE DELETE ON magno_tours.* FROM 'magno_app'@'localhost';
FLUSH PRIVILEGES;

-- #####################################################################
-- 4. TCL · Lenguaje de control de transacciones
-- El procedimiento cambiar_estado (arriba) ya usa START TRANSACTION,
-- COMMIT y ROLLBACK. La aplicación hace lo mismo al guardar un cliente con
-- su pasaporte o una solicitud. Ejemplo para la pestaña SQL:
--   START TRANSACTION;
--   UPDATE solicitud_viaje SET precio_total = 15000 WHERE id_solicitud = 1;
--   INSERT INTO pago (id_solicitud, id_forma_pago, monto, id_usuario) VALUES (1, 1, 5000, 1);
--   COMMIT;      -- o ROLLBACK; para deshacer los dos cambios juntos
-- #####################################################################
