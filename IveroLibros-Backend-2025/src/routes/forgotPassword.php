<?php


require_once __DIR__ . "/../controllers/ForgotPasswordController.php";

$passwordController = new PasswordController($db);


$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
$uri = explode('/', trim($requestUri, '/'));
$uri = array_values(array_filter($uri));


switch ($uri[0]) {
    case "forgot-password":
        if ($method === "POST") {
            $data = json_decode(file_get_contents("php://input"), true);
            $passwordController->forgotPassword($data);
        } else {
            http_response_code(405);
            echo json_encode(["error" => "Método no permitido. Solo se acepta POST."]);
        }
        break;

    case "reset-password":
        if ($method === "POST") {
            $data = json_decode(file_get_contents("php://input"), true);
            $passwordController->resetPassword($data);
        } else {
            http_response_code(405);
            echo json_encode(["error" => "Método no permitido. Solo se acepta POST."]);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(["error" => "Ruta no encontrada"]);
        break;
}
