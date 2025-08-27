<?php
class Genero
{
    private $conn;
    private $table = "generos";

    public $id;
    public $nombre;
    public $descripcion;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Obtener todos los géneros
    public function getAll()
    {
        $query = "SELECT id, nombre, descripcion FROM " . $this->table;
        $stmt = $this->conn->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Obtener género por ID
    public function get($id)
    {
        $query = "SELECT id, nombre, descripcion FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
