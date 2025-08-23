<?php
require_once __DIR__ . "/../controllers/UserController.php";

$userController = new UserController($db);

switch ($method) {
    case "GET":
        if (isset($uri[1])) {
            $userController->show($uri[1]);
        } else {
            $userController->index();
        }
        break;
    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        $userController->store($data);
        break;
    case "PUT":
        if (!isset($uri[1])) {
            http_response_code(400);
            echo json_encode(["error" => "Falta ID"]);
            exit;
        }
        $data = json_decode(file_get_contents("php://input"), true);
        $userController->update($uri[1], $data);
        break;
    case "DELETE":
        if (!isset($uri[1])) {
            http_response_code(400);
            echo json_encode(["error" => "Falta ID"]);
            exit;
        }
        $userController->destroy($uri[1]);
        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
}
