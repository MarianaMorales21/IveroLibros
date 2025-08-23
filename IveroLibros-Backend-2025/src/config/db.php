<?php
class Database {
    private $host = "localhost";
    private $db_name = "iverolibros";
    private $username = "root";
    private $password = "12345";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name.";charset=utf8",
                                   $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            die(json_encode(["error" => "DB Connection failed: " . $e->getMessage()]));
        }
        return $this->conn;
    }
}
