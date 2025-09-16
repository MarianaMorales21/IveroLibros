<?php
require_once __DIR__ . "/../models/User.php";
require_once __DIR__ . "/../helpers/Mail.php";
require_once __DIR__ . "/../models/forgotPassword.php"; 

class PasswordController
{
    private $user;
    private $passwordModel; 

    public function __construct($db)
    {

        $this->user = new User($db); 
        $this->passwordModel = new Password($db);
    }


    public function forgotPassword($data)
    {
        if (!isset($data['email'])) {
            http_response_code(400);
            echo json_encode(["error" => "El campo email es requerido."]);
            return;
        }

        $user = $this->passwordModel->findByEmail($data['email']);

        if ($user) {
            $token = bin2hex(random_bytes(32));
            $expires_at = date('Y-m-d H:i:s', strtotime('+1 hour'));


            $this->passwordModel->updateResetToken($user['email'], $token, $expires_at);

            $resetLink = "http://localhost:5173/reset-password?token={$token}";

            $mensaje_html = "
                <html>
                <head>
                  <style>
                    body { font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 10px; }
                    h1 { color: #884615; }
                    p { font-size: 16px; line-height: 1.5; }
                    .button { display: inline-block; padding: 10px 20px; background-color: #884615; color: white important!; border-radius: 10px;}
                  </style>
                </head>
                <body>
                  <div class='container'>
                    <h1>Restablece tu contraseña</h1>
                    <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el siguiente enlace para continuar:</p>
                    <a href='{$resetLink}' class='button'>Restablecer Contraseña</a>
                    <p>Si no solicitaste un restablecimiento de contraseña, por favor ignora este correo.</p>
                    <p>Este enlace expirará en una hora.</p>
                  </div>
                </body>
                </html>
            ";

            $mailer = new Mailer();
            $mailer->enviar(
                $user['email'],
                "Restablece tu contraseña",
                $mensaje_html
            );
        }

        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Si el correo electrónico está registrado, recibirás un enlace de restablecimiento."]);
    }


    public function resetPassword($data)
    {
        if (!isset($data['token']) || !isset($data['contraseña'])) {
            http_response_code(400);
            echo json_encode(["error" => "El token y la nueva contraseña son requeridos."]);
            return;
        }


        $user = $this->passwordModel->findByToken($data['token']);


        if (!$user || strtotime($user['token_expiracion']) < time()) {
            http_response_code(400);
            echo json_encode(["error" => "El token es inválido o ha expirado."]);
            return;
        }


        $ok = $this->passwordModel->updatePassword($user['id'], $data['contraseña']);

        if ($ok) {
            http_response_code(200);
            echo json_encode(["success" => true, "message" => "Contraseña actualizada exitosamente."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar la contraseña."]);
        }
    }
}
