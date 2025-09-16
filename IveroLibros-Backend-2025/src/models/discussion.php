<?php
class Discussion
{
    private $conn;
    private $table = "discusion";

    public $id;
    public $titulo;
    public $categoria;
    public $contenido;
    public $usuario_id;
    public $hora;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAll()
    {
        $query = "SELECT id, titulo, categoria, contenido, usuario_id, hora FROM " . $this->table;
        $stmt = $this->conn->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function get($id)
    {
        $query = "SELECT id, titulo, categoria, contenido, usuario_id, hora FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }


    public function create($data)
    {
        $query = "INSERT INTO " . $this->table . " (titulo, categoria, contenido, usuario_id, hora)
                  VALUES (:titulo, :categoria, :contenido, :usuario_id, :hora)";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([
            ":titulo" => $data['titulo'],
            ":categoria" => $data['categoria'],
            ":contenido" => $data['contenido'],
            ":usuario_id" => $data['usuario_id'],
            ":hora" => date("Y-m-d H:i:s")
        ]);
        return $this->conn->lastInsertId();
    }
    public function delete($id)
    {
        try {
            $this->conn->beginTransaction(); 
            $query = "DELETE FROM " . $this->table . " WHERE id = ?";
            $stmt = $this->conn->prepare($query);
            $result = $stmt->execute([$id]);

            if ($result) {
                $this->conn->commit();
                return true;
            } else {
                $this->conn->rollBack(); 
                return false;
            }
        } catch (PDOException $e) {
            $this->conn->rollBack(); 
            return false;
        }
    }
}
