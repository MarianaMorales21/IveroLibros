<?php
// src/helpers/Mail.php

require __DIR__ . '/../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Mailer {
    private $mail;

    public function __construct() {
        $this->mail = new PHPMailer(true);

        try {

            $this->mail->isSMTP();
            $this->mail->Host       = 'smtp.gmail.com';  
            $this->mail->SMTPAuth   = true;
            $this->mail->Username   = 'ivero.libros.net@gmail.com'; 
            $this->mail->Password   = 'hfwfcadchrofhihr';     
            $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $this->mail->Port       = 587;


            $this->mail->setFrom('ivero.libros.net@gmail.com', 'IveroLibros');
        } catch (Exception $e) {
            error_log("Error inicializando PHPMailer: " . $e->getMessage());
        }
    }

    public function enviar($destinatario, $asunto, $mensajeHtml, $mensajeTexto = '') {
        try {
            $this->mail->clearAddresses(); 
            $this->mail->addAddress($destinatario);

            $this->mail->isHTML(true);
            $this->mail->Subject = $asunto;
            $this->mail->Body    = $mensajeHtml;
            $this->mail->AltBody = $mensajeTexto ?: strip_tags($mensajeHtml);

            $this->mail->send();
            return true;
        } catch (Exception $e) {
            return "Error al enviar el correo: {$this->mail->ErrorInfo}";
        }
    }
}
