<?php
require_once __DIR__ . '/../controllers/ResponseController.php';

$respuestaController = new RespuestaController($db);

switch ($method) {
    case "GET":
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

    case "DELETE":

        if (isset($uri[1]) && $uri[1] === 'all' && isset($uri[2])) {

            $discussionId = $uri[2];
            $respuestaController->deleteAllByDiscussion($discussionId);
        } elseif (isset($uri[1])) {

            $responseId = $uri[1];
            $respuestaController->delete($responseId);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "ID de la respuesta o acción de eliminación no especificada."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
}
