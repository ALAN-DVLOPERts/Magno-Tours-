<?php
// =====================================================================
//  Magno Tours · Factura en PDF
//  Va en C:\xampp\htdocs\magno_tours\factura.php junto con la carpeta fpdf
//  (descargada de www.fpdf.org). La aplicación la abre así:
//  http://localhost/magno_tours/factura.php?solicitud=9
// =====================================================================
// FPDF puede estar en la carpeta fpdf o suelto junto a este archivo.
require file_exists(__DIR__ . '/fpdf/fpdf.php') ? __DIR__ . '/fpdf/fpdf.php' : __DIR__ . '/fpdf.php';

// Misma base de datos que usa la aplicación (usuario root sin contraseña de XAMPP, puerto 3307).
$db = new mysqli('127.0.0.1', 'root', '', 'magno_tours', 3307); // puerto de MySQL en XAMPP
$db->set_charset('utf8mb4');

$id = (int) ($_GET['solicitud'] ?? 0);

// Datos de la factura, la solicitud y el cliente (consulta preparada: el id no se pega al texto SQL).
$consulta = $db->prepare(
  "SELECT f.id_factura, f.fecha_emision, u.nombre AS emitio, d.*
   FROM factura f
   JOIN usuario u ON u.id_usuario = f.id_usuario
   JOIN v_solicitud_detalle d ON d.id_solicitud = f.id_solicitud
   WHERE f.id_solicitud = ?");
$consulta->bind_param('i', $id);
$consulta->execute();
$factura = $consulta->get_result()->fetch_assoc();
if (!$factura) {
  http_response_code(404);
  exit('Esta solicitud todavía no tiene factura. Emítela desde la aplicación.');
}

$consulta = $db->prepare(
  "SELECT p.fecha_hora, fp.nombre AS forma, p.monto
   FROM pago p JOIN forma_pago fp ON fp.id_forma_pago = p.id_forma_pago
   WHERE p.id_solicitud = ? ORDER BY p.fecha_hora");
$consulta->bind_param('i', $id);
$consulta->execute();
$pagos = $consulta->get_result()->fetch_all(MYSQLI_ASSOC);

$consulta = $db->prepare("SELECT precio_total FROM solicitud_viaje WHERE id_solicitud = ?");
$consulta->bind_param('i', $id);
$consulta->execute();
$precio = (float) $consulta->get_result()->fetch_assoc()['precio_total'];

// FPDF escribe en el formato de Windows, por eso se convierten los acentos.
function t($texto) { return iconv('UTF-8', 'windows-1252//TRANSLIT', (string) $texto); }
function pesos($cantidad) { return '$' . number_format($cantidad, 2) . ' MXN'; }
function fecha($valor) { return $valor ? date('d/m/Y', strtotime($valor)) : 'No aplica'; }

$folio = 'FAC-' . str_pad($factura['id_factura'], 3, '0', STR_PAD_LEFT);
$azul = [10, 49, 97];
$azulOscuro = [7, 35, 74]; // mismo azul del menú de la app, fondo del logo
$rojo = [179, 25, 66];

$pdf = new FPDF('P', 'mm', 'Letter');
$pdf->SetTitle(t("Factura $folio · Magno Tours"));
$pdf->AddPage();

// Encabezado: franja azul con el logo de la app y una línea roja debajo
$pdf->SetFillColor(...$azulOscuro);
$pdf->Rect(0, 0, 216, 32, 'F');
if (file_exists(__DIR__ . '/logo.jpg')) $pdf->Image(__DIR__ . '/logo.jpg', 12, 7, 48); // logo.jpg va junto a este archivo
$pdf->SetFillColor(...$rojo);
$pdf->Rect(0, 32, 216, 3, 'F');
$pdf->SetTextColor(255, 255, 255);
$pdf->SetXY(110, 8);
$pdf->SetFont('Helvetica', 'B', 18);
$pdf->Cell(91, 8, 'FACTURA', 0, 2, 'R');
$pdf->SetFont('Helvetica', '', 9);
$pdf->Cell(91, 5, t("Folio $folio · " . date('d/m/Y H:i', strtotime($factura['fecha_emision']))), 0, 2, 'R');
$pdf->Cell(91, 5, t('Calle Efrén Rebolledo No. 2, Plaza Yamile'), 0, 2, 'R');
$pdf->Cell(91, 5, t('Col. Centro, Actopan, Hidalgo'), 0, 1, 'R');

// Bloques de datos
function titulo($pdf, $texto) {
  global $azul;
  $pdf->Ln(6);
  $pdf->SetTextColor(...$azul);
  $pdf->SetFont('Helvetica', 'B', 11);
  $pdf->Cell(0, 7, t($texto), 'B', 1);
  $pdf->SetTextColor(40, 40, 40);
  $pdf->SetFont('Helvetica', '', 10);
  $pdf->Ln(1);
}
function renglon($pdf, $etiqueta, $valor) {
  $pdf->SetFont('Helvetica', 'B', 10);
  $pdf->Cell(45, 6, t($etiqueta));
  $pdf->SetFont('Helvetica', '', 10);
  $pdf->Cell(0, 6, t($valor), 0, 1);
}

$pdf->SetY(42);
titulo($pdf, 'Cliente');
renglon($pdf, 'Nombre', $factura['nombre_completo']);
renglon($pdf, 'Clave', $factura['cliente']);
renglon($pdf, 'Teléfono', $factura['telefono']);

titulo($pdf, 'Viaje');
renglon($pdf, 'Solicitud', $factura['folio']);
renglon($pdf, 'Servicio', $factura['servicio']);
renglon($pdf, 'Destino', trim(($factura['lugar'] ? $factura['lugar'] . ', ' : '') . $factura['pais']) . ' (' . $factura['ambito'] . ')');
renglon($pdf, 'Salida / regreso', fecha($factura['fecha_salida']) . ' / ' . fecha($factura['fecha_regreso']));
renglon($pdf, 'Tipo y viajeros', $factura['tipo_viaje'] . ' · ' . $factura['num_viajeros'] . ' viajero(s)');

// Tabla de pagos
titulo($pdf, 'Pagos recibidos');
$pdf->SetFillColor(...$azul);
$pdf->SetTextColor(255, 255, 255);
$pdf->SetFont('Helvetica', 'B', 10);
$pdf->Cell(50, 7, 'Fecha', 0, 0, 'L', true);
$pdf->Cell(80, 7, 'Forma de pago', 0, 0, 'L', true);
$pdf->Cell(56, 7, 'Monto', 0, 1, 'R', true);
$pdf->SetTextColor(40, 40, 40);
$pdf->SetFont('Helvetica', '', 10);
foreach ($pagos as $i => $pago) {
  $pdf->SetFillColor(...($i % 2 ? [255, 255, 255] : [240, 243, 248]));
  $pdf->Cell(50, 7, date('d/m/Y H:i', strtotime($pago['fecha_hora'])), 0, 0, 'L', true);
  $pdf->Cell(80, 7, t($pago['forma']), 0, 0, 'L', true);
  $pdf->Cell(56, 7, pesos($pago['monto']), 0, 1, 'R', true);
}

// Total
$pdf->Ln(3);
$pdf->SetFont('Helvetica', 'B', 12);
$pdf->SetTextColor(...$rojo);
$pdf->Cell(130, 9, 'TOTAL PAGADO', 0, 0, 'R');
$pdf->Cell(56, 9, pesos($precio), 0, 1, 'R');

// Pie
$pdf->SetY(-30);
$pdf->SetTextColor(120, 120, 120);
$pdf->SetFont('Helvetica', '', 8);
$pdf->Cell(0, 5, t('Emitió: ' . $factura['emitio'] . '. Gracias por viajar con Magno Tours.'), 0, 1, 'C');
$pdf->Cell(0, 5, t('Comprobante interno de la agencia; no sustituye a una factura fiscal (CFDI) del SAT.'), 0, 1, 'C');

$pdf->Output('I', "Factura_$folio.pdf");
