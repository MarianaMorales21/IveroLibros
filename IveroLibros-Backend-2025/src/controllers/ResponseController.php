<?php
require_once __DIR__ . '/../models/response.php';

class RespuestaController {
    private $respuesta;

    public function __construct($db) {
        $this->respuesta = new Respuesta($db);
    }

    // Obtener todas las respuestas de una discusión
    public function index($discusion_id) {
        $respuestas = $this->respuesta->getAllByDiscussion($discusion_id);
        echo json_encode($respuestas);
    }

    // Crear nueva respuesta
    public function store($data) {
        if (!isset($data['discusion_id'], $data['usuario_id'], $data['respuesta'])) {
            http_response_code(400);
            echo json_encode(["error" => "Datos incompletos"]);
            return;
        }

        $id = $this->respuesta->create($data);
        http_response_code(201);
        echo json_encode(["message" => "Respuesta creada", "id" => $id]);
    }
}
