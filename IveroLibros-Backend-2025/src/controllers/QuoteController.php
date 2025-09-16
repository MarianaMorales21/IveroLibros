<?php
require_once __DIR__ . '/../models/quote.php';

class QuoteController {
    private $quoteModel;

    public function __construct($db) {
        $this->quoteModel = new QuoteModel($db);
    }


    public function getQuote() {
        $quote = $this->quoteModel->getQuote();
        if ($quote) {
            http_response_code(200);
            echo json_encode($quote);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Cita no encontrada"]);
        }
    }


    public function updateQuote() {

        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['frase']) || !isset($data['autor'])) {
            http_response_code(400); 
            echo json_encode(["error" => "Faltan datos de la cita"]);
            return;
        }

        $result = $this->quoteModel->updateQuote($data['frase'], $data['autor']);
        
        if ($result) {
            http_response_code(200);
            echo json_encode(["success" => "Cita actualizada correctamente."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar la cita."]);
        }
    }
}
?>