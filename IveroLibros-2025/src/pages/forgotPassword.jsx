import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ForgotPasswordPage = ({ setCurrentPage }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            const url = 'https://www.iverolibros.xyz/api/forgot-password'; // Endpoint del backend
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });

            // El backend siempre responde con 200 para no revelar si el email existe
            if (response.ok) {
                setMessage('Si el correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada.');
                setEmail(''); // Limpiar el campo
            } else {
                const errorData = await response.json();
                setMessage(errorData.error || 'Ocurrió un error. Por favor, inténtalo de nuevo.');
                setIsError(true);
            }
        } catch (error) {
            console.error('Error al solicitar restablecimiento:', error);
            setMessage('Hubo un problema de conexión. Por favor, inténtalo más tarde.');
            setIsError(true);
        }
    };

    return (
        <div className="register-page py-5">
            <Container>
                <div className="text-center mb-3">
                    <img src="/LibroInicio.png" alt="IveroLibros Logo" className="" />
                    <h1 className="display-5 fw-bold title-color">¿Olvidaste tu Contraseña?</h1>
                    <p className="lead">Ingresa tu correo electrónico para recibir un enlace de restablecimiento.</p>
                </div>

                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <Form onSubmit={handleForgotPassword} className="p-4 rounded-3 shadow-sm">
                            {message && (
                                <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`}>
                                    {message}
                                </div>
                            )}

                            <Form.Group className="mb-3">
                                <Form.Label className="title-color-2">Correo</Form.Label>
                                <Form.Control
                                    className="form-control-login"
                                    type="email"
                                    placeholder="ejemplo@correo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Enviar Enlace de Restablecimiento
                            </Button>
                            <div className="text-center mt-3">
                                <a onClick={() => setCurrentPage('login')} className="register-login">Volver al inicio de sesión</a>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ForgotPasswordPage;