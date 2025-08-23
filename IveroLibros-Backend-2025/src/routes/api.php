<?php
require_once __DIR__ . "/../config/db.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER["REQUEST_METHOD"];
$uri = explode("/", trim($_SERVER["REQUEST_URI"], "/"));

// Rutas delegadas a archivos separados
if ($uri[0] === "users") {
    require_once __DIR__ . "/users.php";
    exit;
}

if ($uri[0] === "discusiones") {
    require_once __DIR__ . "/discussion.php";
    exit;
}

if ($uri[0] === "respuestas") {
    require_once __DIR__ . "/response.php";
    exit;
}

if ($uri[0] === "libros") {
    require_once __DIR__ . "/book.php";
    exit;
}

if ($uri[0] === "genero") {
    require_once __DIR__ . "/genero.php";
    exit;
}

// Ruta no encontrada
http_response_code(404);
echo json_encode(["error" => "Ruta no encontrada"]);
