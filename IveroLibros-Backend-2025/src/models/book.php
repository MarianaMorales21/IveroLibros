<?php
class Libro
{
    private $conn;
    private $table = "libros";

    public $id;
    public $titulo;
    public $autor;
    public $año;
    public $genero;
    public $editorial;
    public $paginas;
    public $sinopsis;
    public $linkCompra;
    public $portada;
    public $descripcion;
    public $usuario_id;
    public $estado; 

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getDb()
    {
        return $this->conn;
    }

    // Obtener todos los libros
    public function getAll()
    {
       
        $query = "SELECT 
                id, 
                titulo, 
                autor, 
                año, 
                genero_id, 
                editorial, 
                paginas, 
                sinopsis, 
                linkCompra, 
                portada, 
                descripcion, 
                usuario_id,
                estado 
            FROM " . $this->table;

        $stmt = $this->conn->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function get($id)
    {

        $query = "SELECT id, titulo, autor, año, genero_id, editorial, paginas, sinopsis, linkCompra, portada, descripcion, usuario_id, estado FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Crear nuevo libro
    public function create($data)
    {

        $query = "INSERT INTO " . $this->table . " 
    (titulo, autor, año, genero_id, editorial, paginas, sinopsis, linkCompra, portada, descripcion, usuario_id, estado) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; 

        $stmt = $this->conn->prepare($query);


        return $stmt->execute([
            $data['titulo'],
            $data['autor'],
            $data['año'],
            $data['genero_id'],
            $data['editorial'],
            $data['paginas'],
            $data['sinopsis'],
            $data['linkCompra'],
            $data['portada'],
            $data['descripcion'],
            $data['usuario_id'],
            $data['estado'] 
        ]);
    }

    // Actualizar un libro
    public function update($id, $data)
    {
        $query = "UPDATE " . $this->table . " SET 
        titulo = ?, 
        autor = ?, 
        año = ?, 
        genero_id = ?, 
        editorial = ?, 
        paginas = ?, 
        sinopsis = ?, 
        linkCompra = ?, 
        portada = ?, 
        descripcion = ?, 
        usuario_id = ?,
        estado = ? 
    WHERE id = ?";

        $params = [
            $data['titulo'],
            $data['autor'],
            $data['año'],
            $data['genero_id'],
            $data['editorial'],
            $data['paginas'],
            $data['sinopsis'],
            $data['linkCompra'],
            $data['portada'],
            $data['descripcion'],
            $data['usuario_id'],
            $data['estado'], 
            $id 
        ];

        $stmt = $this->conn->prepare($query);
        return $stmt->execute($params);
    }

    // Nuevo método para eliminar un libro
    public function delete($id)
    {
        $query = "DELETE FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->rowCount();
    }
}
