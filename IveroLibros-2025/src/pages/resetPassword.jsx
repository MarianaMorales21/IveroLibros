import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

// ✅ El componente ahora recibe 'token' y 'setCurrentPage' como props
const ResetPasswordPage = ({ setCurrentPage, token }) => {
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // ✅ Eliminamos el useEffect que usaba useLocation.
    // El token ya está disponible en la prop 'token'.
    useEffect(() => {
        if (!token) {
            setMessage('Token no encontrado. Por favor, usa el enlace que se te envió por correo.');
            setIsError(true);
        }
    }, [token]); // El efecto se ejecuta cuando el 'token' cambia

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        if (password !== repeatPassword) {
            setMessage('Las contraseñas no coinciden.');
            setIsError(true);
            return;
        }

        if (!token) {
            setMessage('Token inválido o faltante.');
            setIsError(true);
            return;
        }

        try {
            const url = 'https://www.iverolibros.xyz/api/reset-password'; // Endpoint del backend
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: token, contraseña: password }), 
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('¡Contraseña actualizada con éxito! Redirigiendo a la página de inicio de sesión...');
                setIsError(false);
                setTimeout(() => {
                    setCurrentPage('login');
                }, 2000);
            } else {
                setMessage(data.error || 'Ocurrió un error al restablecer la contraseña.');
                setIsError(true);
            }
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            setMessage('Hubo un problema de conexión. Por favor, inténtalo más tarde.');
            setIsError(true);
        }
    };

    if (!token) {
        return (
            <div className="register-page py-5">
                <Container>
                    <div className={`alert ${isError ? 'alert-danger' : 'alert-info'}`}>
                        {message}
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="register-page py-5">
            <Container>
                <div className="text-center mb-3">
                    <img src="/LibroInicio.png" alt="IveroLibros Logo" className="" />
                    <h1 className="display-5 fw-bold title-color">Restablecer Contraseña</h1>
                    <p className="lead">Ingresa tu nueva contraseña para continuar.</p>
                </div>

                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <Form onSubmit={handleResetPassword} className="p-4 rounded-3 shadow-sm">
                            {message && (
                                <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`}>
                                    {message}
                                </div>
                            )}

                            <Form.Group className="mb-3">
                                <Form.Label className="title-color-2">Nueva Contraseña</Form.Label>
                                <Form.Control
                                    className="form-control-login"
                                    type="password"
                                    placeholder="*****"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="title-color-2">Confirmar Nueva Contraseña</Form.Label>
                                <Form.Control
                                    className="form-control-login"
                                    type="password"
                                    placeholder="*****"
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    autoComplete="new-password"
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Actualizar Contraseña
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ResetPasswordPage;