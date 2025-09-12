import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';

const LoginPage = ({ setCurrentPage, onLoginSuccess }) => {
  const url = 'https://www.iverolibros.xyz/api/login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado de carga

  // Verificar si ya hay sesión activa
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      onLoginSuccess(parsedUser.user);
      setCurrentPage('home');
    }
  }, [setCurrentPage, onLoginSuccess]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true); // <--- Inicia el estado de carga

    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          contraseña: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Credenciales incorrectas');
      }

      const data = await response.json();

      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(data));

      // Notificar a la app y redirigir
      onLoginSuccess(data.user);
      setCurrentPage('home');
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false); // <--- Desactiva el estado de carga
    }
  };

  return (
    <div className="login-page py-5">
      <Container>
        <div className="text-center mb-3">
          <img src="/LibroInicio.png" alt="IveroLibros Logo" />
          <h1 className="display-5 fw-bold title-color">Inicio Sesion</h1>
          <p className="lead">Accede a tu cuenta de IveroLibros</p>
        </div>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form onSubmit={handleLogin} className="p-4 shadow-sm">
              {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

              <Form.Group className="mb-3">
                <Form.Label className="title-color-2">Email</Form.Label>
                <Form.Control
                  className="form-control-login"
                  type="email"
                  placeholder="Jane@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="title-color-2">Contraseña</Form.Label>
                <Form.Control
                  className="form-control-login"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </Form.Group>

              <div className="d-grid gap-2 mt-4">
                <Button variant="primary" type="submit" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="ms-2">Cargando...</span>
                    </>
                  ) : (
                    "Inicia Sesion"
                  )}
                </Button>
                <Button
                  variant="outline-primary"
                  size="lg"
                  onClick={() => setCurrentPage('register')}
                  disabled={isLoading}
                >
                  Registrarse
                </Button>
              </div>

              <div className="text-center mt-3">
                <a
                  onClick={() => setCurrentPage('forgot-password')}
                  className="register-login"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;