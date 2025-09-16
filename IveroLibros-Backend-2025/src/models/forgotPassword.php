<?php
// models/User.php

class Password
{
    private $conn;
    private $table = "usuario";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Busca un usuario por su email
    public function findByEmail($email)
    {
        $query = "SELECT id, email, contraseña, token_recuperacion, token_expiracion FROM " . $this->table . " WHERE email = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Busca un usuario por su token de restablecimiento
    public function findByToken($token)
    {
        $query = "SELECT id, email, token_recuperacion, token_expiracion FROM " . $this->table . " WHERE token_recuperacion = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$token]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Actualiza la contraseña encriptada
    public function updatePassword($id, $new_password)
    {
        $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

        $query = "UPDATE " . $this->table . " SET contraseña = ?, token_recuperacion = NULL, token_expiracion = NULL WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$hashed_password, $id]);
    }

    // Actualiza el token de restablecimiento y su fecha de expiración
    public function updateResetToken($email, $token, $expiry)
    {
        $query = "UPDATE " . $this->table . " SET token_recuperacion = ?, token_expiracion = ? WHERE email = ?";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$token, $expiry, $email]);
    }
}
