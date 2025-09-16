<?php
require_once __DIR__ . "/../models/user.php";
require_once __DIR__ . "/../helpers/Mail.php";
class UserController
{
    private $user;

    public function __construct($db)
    {
        $this->user = new User($db);
    }

    public function index()
    {
        echo json_encode($this->user->getAll());
    }

    public function show($id)
    {
        $data = $this->user->getById($id);
        echo json_encode($data ?: ["error" => "Usuario no encontrado"]);
    }
    //aqui 
    public function store($data)
    {
        $required = ["nombre", "apellido", "rol", "suscripcion", "email", "contraseña"];
        foreach ($required as $field) {
            if (!isset($data[$field])) {
                http_response_code(400);
                echo json_encode(["error" => "Falta campo: $field"]);
                return;
            }
        }

        if ($this->user->getByEmail($data['email'])) {
            http_response_code(409);
            echo json_encode(["error" => "El email ya está registrado"]);
            return;
        }


        if ($data['suscripcion'] === 'Ninguna') {
            $data['fechaSuscripcion'] = null;
        }

        $id = $this->user->create($data);

        if ($id) {

            http_response_code(201);
            echo json_encode(["success" => true, "id" => $id]);


            if (function_exists('fastcgi_finish_request')) {
                fastcgi_finish_request();
            } else {
                @ob_end_flush();
                flush();
            }

            $nombre = $data['nombre'];
            $mensaje_html = "
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 10px; }
            h1 { color: #884615; }
            p { font-size: 16px; line-height: 1.5; }
            .button { display: inline-block; padding: 10px 20px; background-color: #884615; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class='container'>
            <h1>¡Hola {$nombre}! 👋</h1>
            <p>Estamos encantados de darte la bienvenida a nuestra plataforma. Tu registro fue exitoso y ya eres parte de nuestra comunidad.</p>
            <p>Explora todas las funcionalidades, conecta con otros usuarios y empieza a disfrutar de todo lo que tenemos para ofrecerte.</p>
            <p>Si tienes alguna duda, nuestro equipo de soporte está siempre listo para ayudarte.</p>
            <a href='https://tusitio.com' class='button'>Comienza ahora</a>
            <p>¡Gracias por unirte a nosotros! 🎉</p>
          </div>
        </body>
        </html>
        ";

            $mailer = new Mailer();
            $mailer->enviar(
                $data['email'],
                "Bienvenido a nuestra comunidad, {$nombre}",
                $mensaje_html
            );
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al registrar el usuario"]);
        }
    }

    public function update($id, $data)
    {
        $ok = $this->user->update($id, $data);
        echo json_encode(["success" => $ok]);
    }

    public function destroy($id)
    {
        $ok = $this->user->delete($id);
        echo json_encode(["success" => $ok]);
    }
}
