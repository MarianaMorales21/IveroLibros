<?php
require_once __DIR__ . '/../models/response.php';

class RespuestaController
{
    private $respuesta;

    public function __construct($db)
    {
        $this->respuesta = new Respuesta($db);
    }


    public function index($discusion_id)
    {
        $respuestas = $this->respuesta->getAllByDiscussion($discusion_id);
        echo json_encode($respuestas);
    }


    public function store($data)
    {
        if (!isset($data['discusion_id'], $data['usuario_id'], $data['respuesta'])) {
            http_response_code(400);
            echo json_encode(["error" => "Datos incompletos"]);
            return;
        }

        $id = $this->respuesta->create($data);
        http_response_code(201);
        echo json_encode(["message" => "Respuesta creada", "id" => $id]);
    }


    public function delete($id)
    {
        $deleted = $this->respuesta->delete($id);
        if ($deleted) {
            http_response_code(200);
            echo json_encode(["message" => "Respuesta eliminada correctamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar la respuesta."]);
        }
    }

    public function deleteAllByDiscussion($discusion_id)
    {
        $deleted = $this->respuesta->deleteAllByDiscussionId($discusion_id);
        if ($deleted) {
            http_response_code(200);
            echo json_encode(["message" => "Todas las respuestas eliminadas correctamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar todas las respuestas."]);
        }
    }
}
