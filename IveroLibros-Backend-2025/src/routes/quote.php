<?php

require_once __DIR__ . '/../controllers/QuoteController.php';

$quoteController = new QuoteController($db);


if (isset($uri[0]) && $uri[0] === "frase") {
    switch ($method) {
        case "GET":
            $quoteController->getQuote();
            break;

        case "POST":

            if (isset($uri[1]) && $uri[1] === "update") {
                $quoteController->updateQuote();
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Ruta de actualización no encontrada."]);
            }
            break;

        case "OPTIONS":
            http_response_code(204);
            break;

        default:
            http_response_code(405);
            echo json_encode(["error" => "Método no permitido."]);
    }
} else {
    http_response_code(404);
    echo json_encode(["error" => "Ruta no encontrada."]);
}
