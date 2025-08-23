<?php
// src/controllers/UserController.php
require_once __DIR__ . "/../models/user.php";

class UserController {
    private $user;

    public function __construct($db) {
        $this->user = new User($db);
    }

    public function index() {
        echo json_encode($this->user->getAll());
    }

    public function show($id) {
        $data = $this->user->getById($id);
        echo json_encode($data ?: ["error" => "Usuario no encontrado"]);
    }

    public function store($data) {
        $required = ["nombre","apellido","role","suscripcion","fechaSuscripcion","email","contraseña"];
        foreach ($required as $field) {
            if (!isset($data[$field])) {
                http_response_code(400);
                echo json_encode(["error" => "Falta campo: $field"]);
                return;
            }
        }
        $id = $this->user->create($data);
        echo json_encode(["success" => true, "id" => $id]);
    }

    public function update($id, $data) {
        $ok = $this->user->update($id, $data);
        echo json_encode(["success" => $ok]);
    }

    public function destroy($id) {
        $ok = $this->user->delete($id);
        echo json_encode(["success" => $ok]);
    }
}
