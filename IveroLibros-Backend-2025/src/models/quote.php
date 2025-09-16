<?php
class QuoteModel
{
    private $conn;
    private $table = "Frase";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getQuote()
    {
        $query = "SELECT `frase`, `autor` FROM " . $this->table . " WHERE `id` = 1 LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updateQuote($quote, $author)
    {
        $query = "UPDATE " . $this->table . " SET `frase` = :frase, `autor` = :autor WHERE `id` = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':frase', $quote);
        $stmt->bindParam(':autor', $author);
        return $stmt->execute();
    }
}
