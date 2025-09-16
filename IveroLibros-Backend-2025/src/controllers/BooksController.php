<?php
require_once __DIR__ . '/../models/book.php';
require_once __DIR__ . '/../helpers/Mail.php';
require_once __DIR__ . '/../models/user.php';
class LibroController
{
    private $libro;

    public function __construct($db)
    {
        $this->libro = new Libro($db);
    }


    public function index()
    {
        $libros = $this->libro->getAll();
        echo json_encode($libros);
    }


    public function show($id)
    {
        $libro = $this->libro->get($id);
        if ($libro) {
            echo json_encode($libro);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Libro no encontrado"]);
        }
    }


    public function store($data)
    {
        $requiredFields = [
            'titulo',
            'autor',
            'año',
            'genero_id',
            'editorial',
            'paginas',
            'sinopsis',
            'linkCompra',
            'portada',
            'descripcion',
            'usuario_id',
            'estado'
        ];

        foreach ($requiredFields as $field) {
            if (!isset($data[$field])) {
                http_response_code(400);
                echo json_encode(["error" => "Campo '$field' faltante"]);
                return;
            }
        }

        if ($this->libro->create($data)) {

            http_response_code(201);
            echo json_encode(["message" => "Libro creado exitosamente."]);

   
            if (function_exists('fastcgi_finish_request')) {
                fastcgi_finish_request();
            } else {
                @ob_end_flush();
                flush();
            }


            $mailer = new Mailer();
            $usuarioModel = new User($this->libro->getDb());
            $usuario = $usuarioModel->getById($data['usuario_id']);

            if ($usuario) {
                $titulo = $data['titulo'];
                $autor = $data['autor'];
                $anio = $data['año'];
                $editorial = $data['editorial'];
                $paginas = $data['paginas'];
                $sinopsis = $data['sinopsis'];
                $linkCompra = $data['linkCompra'];
                $portada = $data['portada'];
                $descripcion = $data['descripcion'];
                $estado = $data['estado'];

                $mensaje_html = "
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; background-color: #F4F4DA; color: #333; }
                .container { max-width: 600px; margin: 0 auto; background: #F4F4DA; padding: 20px; border-radius: 10px; }
                h1 { color: #884615; }
                p { font-size: 16px; line-height: 1.5; }
                .button { display: inline-block; padding: 10px 20px; background-color: #884615; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
                .book-img { max-width: 150px; border-radius: 5px; }
              </style>
            </head>
            <body>
              <div class='container'>
                <h1>¡Nuevo libro agregado! 📚</h1>
                <p>Se ha agregado el libro <b>{$titulo}</b> a la biblioteca.</p>
                
                <img src='{$portada}' alt='Portada de {$titulo}' class='book-img'>
                
                <h2>Detalles del libro:</h2>
                <ul>
                  <li><b>Autor:</b> {$autor}</li>
                  <li><b>Año:</b> {$anio}</li>
                  <li><b>Editorial:</b> {$editorial}</li>
                  <li><b>Páginas:</b> {$paginas}</li>
                  <li><b>Estado:</b> {$estado}</li>
                </ul>
                
                <h3>Sinopsis:</h3>
                <p>{$sinopsis}</p>

                <h3>Descripcion:</h3>
                <p>{$descripcion}</p>
                
                <a href='{$linkCompra}' class='button'>Libro</a>
                <p>¡Disfruta de tu lectura! 📖</p>
              </div>
            </body>
            </html>
            ";

                $mailer->enviar(
                    $usuario['email'],
                    "Agregaste un nuevo libro: {$titulo}",
                    $mensaje_html
                );
            }
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear el libro."]);
        }
    }


    public function update($id, $data)
    {

        $requiredFields = [
            'titulo',
            'autor',
            'año',
            'genero_id',
            'editorial',
            'paginas',
            'sinopsis',
            'linkCompra',
            'portada',
            'descripcion',
            'usuario_id',
            'estado'
        ];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field])) {
                http_response_code(400);
                echo json_encode(["error" => "Campo '$field' faltante en los datos de actualización."]);
                return;
            }
        }

        if ($this->libro->update($id, $data)) {
            http_response_code(200);
            echo json_encode(["message" => "Libro actualizado exitosamente."]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Libro no encontrado o no se realizaron cambios."]);
        }
    }


    public function destroy($id)
    {
        $deletedRows = $this->libro->delete($id);
        if ($deletedRows > 0) {
            http_response_code(200);
            echo json_encode(["message" => "Libro eliminado exitosamente."]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Libro no encontrado para eliminar."]);
        }
    }
}
