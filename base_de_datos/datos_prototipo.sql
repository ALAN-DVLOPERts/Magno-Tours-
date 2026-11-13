-- =====================================================================
--  Magno Tours · Datos que trae el prototipo (6 clientes y 8 solicitudes)
--  Ejecutar después de magno_tours.sql. En phpMyAdmin: seleccionar la base
--  magno_tours > Importar > este archivo. Las fechas de los viajes se
--  calculan a partir de hoy, igual que en el prototipo.
-- =====================================================================
SET NAMES utf8mb4;
USE magno_tours;
START TRANSACTION;

INSERT INTO cliente (id_cliente, nombre_completo, fecha_nacimiento, id_sexo, telefono) VALUES
  (1, 'Fernanda Ruiz', '1993-04-18', (SELECT id_sexo FROM sexo WHERE nombre = 'Mujer'), '7721458091'),
  (2, 'Carlos Méndez', '1987-09-02', (SELECT id_sexo FROM sexo WHERE nombre = 'Hombre'), '7726382140'),
  (3, 'Mariana Torres', '1998-01-27', (SELECT id_sexo FROM sexo WHERE nombre = 'Mujer'), '7725027738'),
  (4, 'Diego Salazar', '1990-11-13', (SELECT id_sexo FROM sexo WHERE nombre = 'Hombre'), '7723108842'),
  (5, 'Lucía Hernández', '1985-07-30', (SELECT id_sexo FROM sexo WHERE nombre = 'Mujer'), '7727601935'),
  (6, 'Santiago Ortega', '2001-02-10', (SELECT id_sexo FROM sexo WHERE nombre = 'Hombre'), '7728826417');

INSERT INTO pasaporte (numero, id_cliente, fecha_expedicion, fecha_expiracion) VALUES
  ('G34672091', 1, '2022-03-12', '2032-03-11'),
  ('G91824470', 3, '2024-06-08', '2034-06-07'),
  ('G55290118', 4, '2021-08-19', '2031-08-18');

INSERT INTO solicitud_viaje (id_solicitud, id_cliente, id_servicio, id_pais, lugar, fecha_salida, fecha_regreso, id_tipo_viaje, num_viajeros, id_estado) VALUES
  (1, 1, (SELECT id_servicio FROM servicio WHERE nombre = 'Hospedaje'), (SELECT id_pais FROM pais WHERE nombre = 'México'), 'Huasca de Ocampo, Hidalgo', DATE_ADD(CURDATE(), INTERVAL 64 DAY), DATE_ADD(CURDATE(), INTERVAL 66 DAY), 2, 4, (SELECT id_estado FROM estado_solicitud WHERE nombre = 'Pendiente')),
  (2, 3, (SELECT id_servicio FROM servicio WHERE nombre = 'Viaje corporativo'), (SELECT id_pais FROM pais WHERE nombre = 'México'), 'Monterrey, Nuevo León', DATE_ADD(CURDATE(), INTERVAL 51 DAY), DATE_ADD(CURDATE(), INTERVAL 54 DAY), 2, 6, (SELECT id_estado FROM estado_solicitud WHERE nombre = 'En proceso')),
  (3, 6, (SELECT id_servicio FROM servicio WHERE nombre = 'Transporte terrestre'), (SELECT id_pais FROM pais WHERE nombre = 'México'), 'Aeropuerto AIFA', DATE_ADD(CURDATE(), INTERVAL 4 DAY), NULL, 1, 2, (SELECT id_estado FROM estado_solicitud WHERE nombre = 'Cancelada')),
  (4, 5, (SELECT id_servicio FROM servicio WHERE nombre = 'Excursión de playa'), (SELECT id_pais FROM pais WHERE nombre = 'México'), 'Ixtapa Zihuatanejo, Guerrero', DATE_ADD(CURDATE(), INTERVAL 13 DAY), DATE_ADD(CURDATE(), INTERVAL 16 DAY), 2, 3, (SELECT id_estado FROM estado_solicitud WHERE nombre = 'Pendiente')),
  (5, 4, (SELECT id_servicio FROM servicio WHERE nombre = 'Crucero'), (SELECT id_pais FROM pais WHERE nombre = 'Estados Unidos'), 'Miami · Caribe', DATE_ADD(CURDATE(), INTERVAL 37 DAY), DATE_ADD(CURDATE(), INTERVAL 44 DAY), 2, 1, (SELECT id_estado FROM estado_solicitud WHERE nombre = 'Pendiente')),
  (6, 3, (SELECT id_servicio FROM servicio WHERE nombre = 'Vuelo'), (SELECT id_pais FROM pais WHERE nombre = 'España'), 'Madrid', DATE_ADD(CURDATE(), INTERVAL 23 DAY), DATE_ADD(CURDATE(), INTERVAL 33 DAY), 2, 2, (SELECT id_estado FROM estado_solicitud WHERE nombre = 'Confirmada')),
  (7, 2, (SELECT id_servicio FROM servicio WHERE nombre = 'Excursión de playa'), (SELECT id_pais FROM pais WHERE nombre = 'México'), 'Mazatlán, Sinaloa', DATE_ADD(CURDATE(), INTERVAL 6 DAY), DATE_ADD(CURDATE(), INTERVAL 10 DAY), 2, 2, (SELECT id_estado FROM estado_solicitud WHERE nombre = 'En proceso')),
  (8, 1, (SELECT id_servicio FROM servicio WHERE nombre = 'Paquete turístico'), (SELECT id_pais FROM pais WHERE nombre = 'Canadá'), 'Toronto', DATE_ADD(CURDATE(), INTERVAL 9 DAY), DATE_ADD(CURDATE(), INTERVAL 17 DAY), 2, 2, (SELECT id_estado FROM estado_solicitud WHERE nombre = 'Pendiente'));

COMMIT;
