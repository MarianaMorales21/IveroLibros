<?php
class Libro
{
    private $conn;
    private $table = "libros";

    public $id;
    public $titulo;
    public $autor;
    public $año;
    public $genero;
    public $editorial;
    public $paginas;
    public $sinopsis;
    public $linkCompra;
    public $portada;
    public $descripcion;
    public $usuario_id;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Obtener todos los libros
    public function getAll()
    {
        $query = "SELECT id, titulo, autor, año, genero_id, editorial, paginas, sinopsis, linkCompra, portada, descripcion, usuario_id FROM " . $this->table;
        $stmt = $this->conn->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Obtener libro por ID
    public function get($id)
    {
        $query = "SELECT id, titulo, autor, año, genero_id, editorial, paginas, sinopsis, linkCompra, portada, descripcion, usuario_id FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Crear nuevo libro
    public function create($data)
    {
        $query = "INSERT INTO " . $this->table . " (titulo, autor, año, genero_id, editorial, paginas, sinopsis, linkCompra, portada, descripcion, usuario_id)
                  VALUES (:titulo, :autor, :año, :genero_id, :editorial, :paginas, :sinopsis, :linkCompra, :portada, :descripcion, :usuario_id)";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([
            ":titulo" => $data['titulo'],
            ":autor" => $data['autor'],
            ":año" => $data['año'],
            ":genero" => $data['genero'],
            ":editorial" => $data['editorial'],
            ":paginas" => $data['paginas'],
            ":sinopsis" => $data['sinopsis'],
            ":linkCompra" => $data['linkCompra'],
            ":portada" => $data['portada'], // Puede ser URL o base64
            ":descripcion" => $data['descripcion'],
            ":usuario_id" => $data['usuario_id']
        ]);
        return $this->conn->lastInsertId();
    }
}
