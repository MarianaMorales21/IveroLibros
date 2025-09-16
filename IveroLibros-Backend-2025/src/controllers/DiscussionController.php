<?php
require_once __DIR__ . '/../models/discussion.php';

class DiscussionController
{
    private $discussion;

    public function __construct($db)
    {
        $this->discussion = new Discussion($db);
    }

    public function index()
    {
        $discusiones = $this->discussion->getAll();
        echo json_encode($discusiones);
    }

    public function show($id)
    {
        $disc = $this->discussion->get($id);
        if ($disc) {
            echo json_encode($disc);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Discusión no encontrada"]);
        }
    }

    public function store($data)
    {
        if (!isset($data['titulo'], $data['contenido'], $data['usuario_id'])) {
            http_response_code(400);
            echo json_encode(["error" => "Datos incompletos"]);
            return;
        }

        $id = $this->discussion->create($data);
        http_response_code(201);
        echo json_encode(["message" => "Discusión creada", "id" => $id]);
    }


    public function delete($id)
    {
        if ($this->discussion->delete($id)) {
            http_response_code(200);
            echo json_encode(["message" => "Discusión eliminada"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar la discusión."]);
        }
    }
}
