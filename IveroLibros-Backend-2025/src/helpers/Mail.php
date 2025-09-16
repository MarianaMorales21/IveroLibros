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
            // Configuración del servidor SMTP
            $this->mail->isSMTP();
            $this->mail->Host       = 'smtp.gmail.com';  // Cambia si usas otro servidor
            $this->mail->SMTPAuth   = true;
            $this->mail->Username   = 'marianamorales2110@gmail.com'; // 👉 tu correo
            $this->mail->Password   = 'ngek yynl xnpc svuv';     // 👉 App Password, no tu clave normal
            $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $this->mail->Port       = 587;

            // Remitente por defecto
            $this->mail->setFrom('marianamorales2110@gmail.com', 'IveroLibros');
        } catch (Exception $e) {
            error_log("Error inicializando PHPMailer: " . $e->getMessage());
        }
    }

    /**
     * Enviar correo
     */
    public function enviar($destinatario, $asunto, $mensajeHtml, $mensajeTexto = '') {
        try {
            $this->mail->clearAddresses(); // Limpia destinatarios previos
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
