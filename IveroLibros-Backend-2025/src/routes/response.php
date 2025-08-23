<?php
require_once __DIR__ . '/../controllers/ResponseController.php';

$respuestaController = new RespuestaController($db);

switch ($method) {
    case "GET":
        // Se espera: /respuestas/{discusion_id}
        if (!isset($uri[1])) {
            http_response_code(400);
            echo json_encode(["error" => "Falta ID de discusión"]);
            exit;
        }
        $respuestaController->index($uri[1]);
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        $respuestaController->store($data);
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
}
