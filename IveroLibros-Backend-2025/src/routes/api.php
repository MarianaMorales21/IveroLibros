<?php
require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/../controllers/AuthController.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER["REQUEST_METHOD"];
$uri = explode("/", trim($_SERVER["REQUEST_URI"], "/"));


// Nuevas rutas para el login
if ($uri[0] === "login" && $method === "POST") {
    $authController = new AuthController($db);
    $data = json_decode(file_get_contents("php://input"), true);
    $authController->login($data);
    exit;
}

// Nuevas rutas para el logout
// Sección de logout
if ($uri[0] === "logout" && $method === "POST") {
    // La fecha de expiración en el pasado elimina la cookie
    setcookie("auth_token", "", time() - 3600, "/");
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Sesión cerrada."]);
    exit;
}
// Rutas delegadas a archivos separados
if ($uri[0] === "usuarios") {
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
    require_once __DIR__ . "/gender.php";
    exit;
}

// Ruta no encontrada
http_response_code(404);
echo json_encode(["error" => "Ruta no encontrada"]);
