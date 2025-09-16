<?php

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

            $token = bin2hex(random_bytes(32));


            $cookie_name = "auth_token";
            $cookie_value = $token;
            $expiration_time = time() + (3600 * 24); 


            setcookie($cookie_name, $cookie_value, [
                'expires' => $expiration_time,
                'path' => '/',
                'httponly' => true,
                'secure' => false, 
                'samesite' => 'Lax',
            ]);


            unset($user['contraseña']);
            http_response_code(200);
            echo json_encode(["success" => true, "user" => $user]);
        } else {
            http_response_code(401);
            echo json_encode(["error" => "Credenciales incorrectas."]);
        }
    }
}
