<?php
class Respuesta {
    private $conn;
    private $table = "respuestas";

    public $id;
    public $discusion_id;
    public $usuario_id;
    public $respuesta;
    public $hora;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener todas las respuestas de una discusión
    public function getAllByDiscussion($discusion_id) {
        $query = "SELECT id, discusion_id, usuario_id, respuesta, hora FROM " . $this->table . " WHERE discusion_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$discusion_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Crear nueva respuesta
    public function create($data) {
        $query = "INSERT INTO " . $this->table . " (discusion_id, usuario_id, respuesta, hora)
                  VALUES (:discusion_id, :usuario_id, :respuesta, :hora)";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([
            ":discusion_id" => $data['discusion_id'],
            ":usuario_id" => $data['usuario_id'],
            ":respuesta" => $data['respuesta'],
            ":hora" => date("Y-m-d H:i:s")
        ]);
        return $this->conn->lastInsertId();
    }
}
