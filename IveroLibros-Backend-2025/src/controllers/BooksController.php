<?php
require_once __DIR__ . '/../models/book.php';

class LibroController
{
    private $libro;

    public function __construct($db)
    {
        $this->libro = new Libro($db);
    }

    // Obtener todos los libros
    public function index()
    {
        $libros = $this->libro->getAll();
        echo json_encode($libros);
    }

    // Obtener libro por ID
    public function show($id)
    {
        $libro = $this->libro->get($id);
        if ($libro) {
            echo json_encode($libro);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Libro no encontrado"]);
        }
    }

    // Crear nuevo libro
    public function store($data)
    {
        // Se agregó 'estado' a la lista de campos requeridos
        $requiredFields = [
            'titulo',
            'autor',
            'año',
            'genero_id',
            'editorial',
            'paginas',
            'sinopsis',
            'linkCompra',
            'portada',
            'descripcion',
            'usuario_id',
            'estado'
        ];

        foreach ($requiredFields as $field) {
            if (!isset($data[$field])) {
                http_response_code(400);
                echo json_encode(["error" => "Campo '$field' faltante"]);
                return;
            }
        }

        if ($this->libro->create($data)) {
            http_response_code(201);
            echo json_encode(["message" => "Libro creado exitosamente."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear el libro."]);
        }
    }

    // Nuevo método para actualizar un libro
    public function update($id, $data)
    {
        // Se agregó 'estado' a la lista de campos requeridos
        $requiredFields = [
            'titulo',
            'autor',
            'año',
            'genero_id',
            'editorial',
            'paginas',
            'sinopsis',
            'linkCompra',
            'portada',
            'descripcion',
            'usuario_id',
            'estado'
        ];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field])) {
                http_response_code(400);
                echo json_encode(["error" => "Campo '$field' faltante en los datos de actualización."]);
                return;
            }
        }

        if ($this->libro->update($id, $data)) {
            http_response_code(200);
            echo json_encode(["message" => "Libro actualizado exitosamente."]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Libro no encontrado o no se realizaron cambios."]);
        }
    }

    // Nuevo método para eliminar un libro
    public function destroy($id)
    {
        $deletedRows = $this->libro->delete($id);
        if ($deletedRows > 0) {
            http_response_code(200);
            echo json_encode(["message" => "Libro eliminado exitosamente."]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Libro no encontrado para eliminar."]);
        }
    }
}
