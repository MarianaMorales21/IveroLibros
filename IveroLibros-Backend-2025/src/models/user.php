<?php
// src/models/User.php
class User {
    private $conn;
    private $table = "usuario";

    public $id;
    public $nombre;
    public $apellido;
    public $rol;
    public $suscripcion;
    public $fechaSuscripcion;
    public $email;
    public $contraseña;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener todos
    public function getAll() {
        $stmt = $this->conn->query("SELECT id, nombre, apellido, rol, suscripcion, fechaSuscripcion, email FROM " . $this->table);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Obtener uno
    public function getById($id) {
        $stmt = $this->conn->prepare("SELECT id, nombre, apellido, rol, suscripcion, fechaSuscripcion, email FROM " . $this->table . " WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Crear
    public function create($data) {
        $sql = "INSERT INTO " . $this->table . " 
            (nombre, apellido, rol, suscripcion, fechaSuscripcion, email, contraseña) 
            VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);

        // Encriptar la contraseña
        $hashedPassword = password_hash($data["contraseña"], PASSWORD_BCRYPT);

        $stmt->execute([
            $data["nombre"],
            $data["apellido"],
            $data["rol"],
            $data["suscripcion"],
            $data["fechaSuscripcion"],
            $data["email"],
            $hashedPassword
        ]);
        return $this->conn->lastInsertId();
    }

    // Actualizar
    public function update($id, $data) {
        $sql = "UPDATE " . $this->table . " 
            SET nombre=?, apellido=?, rol=?, suscripcion=?, fechaSuscripcion=?, email=?";

        $params = [
            $data["nombre"],
            $data["apellido"],
            $data["rol"],
            $data["suscripcion"],
            $data["fechaSuscripcion"],
            $data["email"]
        ];

        // Si se envía contraseña, se actualiza
        if (!empty($data["contraseña"])) {
            $sql .= ", contraseña=?";
            $params[] = password_hash($data["contraseña"], PASSWORD_BCRYPT);
        }

        $sql .= " WHERE id=?";
        $params[] = $id;

        $stmt = $this->conn->prepare($sql);
        return $stmt->execute($params);
    }

    // Eliminar
    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM " . $this->table . " WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
