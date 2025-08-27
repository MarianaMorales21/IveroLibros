<?php
require_once __DIR__ . '/../controllers/BooksController.php';

$libroController = new LibroController($db);

switch ($method) {
    case "GET":
        if (isset($uri[1])) {
            $libroController->show($uri[1]);
        } else {
            $libroController->index();
        }
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        $libroController->store($data);
        break;

    case "PUT":
        if (isset($uri[1])) {
            $data = json_decode(file_get_contents("php://input"), true);
            $libroController->update($uri[1], $data);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "ID del libro no especificado para la actualización"]);
        }
        break;

    case "DELETE":
        if (isset($uri[1])) {
            $libroController->destroy($uri[1]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "ID del libro no especificado para la eliminación"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}
