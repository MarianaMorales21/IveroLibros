<?php
require_once __DIR__ . '/../models/gender.php';

class GeneroController {
    private $genero;

    public function __construct($db) {
        $this->genero = new Genero($db);
    }


    public function index() {
        $generos = $this->genero->getAll();
        echo json_encode($generos);
    }


    public function show($id) {
        $genero = $this->genero->get($id);
        if ($genero) {
            echo json_encode($genero);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Género no encontrado"]);
        }
    }
}
