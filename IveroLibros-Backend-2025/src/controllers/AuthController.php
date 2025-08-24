<?php
// src/controllers/AuthController.php
require_once __DIR__ . "/../models/user.php";

class AuthController
{
    private $user;

    public function __construct($db)
    {
        $this->user = new User($db);
    }

    public function login($data)
    {
        if (!isset($data["email"]) || !isset($data["contraseña"])) {
            http_response_code(400);
            echo json_encode(["error" => "Faltan credenciales."]);
            return;
        }

        $email = $data["email"];
        $password = $data["contraseña"];

        $user = $this->user->getByEmail($email);

        if ($user && password_verify($password, $user['contraseña'])) {
            // 1. Generar un token de seguridad
            // En un entorno de producción, se recomienda un JWT
            $token = bin2hex(random_bytes(32));

            // 2. Guardar el token en una cookie
            $cookie_name = "auth_token";
            $cookie_value = $token;
            $expiration_time = time() + (3600 * 24); // Expira en 24 horas

            // Configurar la cookie
            // HttpOnly: previene el acceso desde JavaScript
            // secure: solo si usas HTTPS (recomendado en producción)
            // SameSite: previene ataques CSRF
            setcookie($cookie_name, $cookie_value, [
                'expires' => $expiration_time,
                'path' => '/',
                'httponly' => true,
                'secure' => false, // Cambiar a true en producción
                'samesite' => 'Lax',
            ]);

            // 3. Devolver una respuesta exitosa al frontend
            unset($user['contraseña']);
            http_response_code(200);
            echo json_encode(["success" => true, "user" => $user]);
        } else {
            http_response_code(401);
            echo json_encode(["error" => "Credenciales incorrectas."]);
        }
    }
}