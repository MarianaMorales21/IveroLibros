<?php
require_once __DIR__ . "/../controllers/DiscussionController.php";

$discussionController = new DiscussionController($db);

switch ($method) {
    case "GET":
        if (isset($uri[1])) {
            $discussionController->show($uri[1]);
        } else {
            $discussionController->index();
        }
        break;
    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        $discussionController->store($data);
        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
}
