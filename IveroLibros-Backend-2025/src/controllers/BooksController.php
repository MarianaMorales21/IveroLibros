<?php
require_once __DIR__ . '/../models/book.php';

class LibroController {
    private $libro;

    public function __construct($db) {
        $this->libro = new Libro($db);
    }

    // Obtener todos los libros
    public function index() {
        $libros = $this->libro->getAll();
        echo json_encode($libros);
    }

    // Obtener libro por ID
    public function show($id) {
        $libro = $this->libro->get($id);
        if ($libro) {
            echo json_encode($libro);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Libro no encontrado"]);
        }
    }

    // Crear nuevo libro
    public function store($data) {
        $requiredFields = ['titulo','autor','año','genero','editorial','paginas','sinopsis','linkCompra','portada','descripcion','usuario_id'];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field])) {
                http_response_code(400);
                echo json_encode(["error" => "Campo $field faltante"]);
                return;
            }
        }

        $id = $this->libro->create($data);
        http_response_code(201);
        echo json_encode(["message" => "Libro creado", "id" => $id]);
    }
}
