<?php
require_once __DIR__ . '/../controllers/GenderController.php';

$generoController = new GeneroController($db);

switch ($method) {
    case "GET":
        if (isset($uri[1])) {

            $generoController->show($uri[1]);
        } else {

            $generoController->index();
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
}
