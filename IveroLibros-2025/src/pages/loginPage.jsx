import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const LoginPage = ({ setCurrentPage, onLoginSuccess }) => {
  const url = 'http://localhost:8000/login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  // Redirección si el usuario ya está logeado
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setCurrentPage('login');
    }
  }, []);

  // Función para manejar el envío del formulario
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpiar cualquier mensaje de error anterior

    try {
      // Petición a la API para iniciar sesión
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include', // Para enviar cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          contraseña: password,
        }),
      });

      if (!response.ok) {
        // Si el estado no es 200, leer el cuerpo del error y lanzar una excepción
        const errorData = await response.json();
        throw new Error(errorData.error || 'Credenciales incorrectas');
      }

      const data = await response.json();
      console.log('Inicio de sesión exitoso:', data);
      localStorage.setItem('user', JSON.stringify(data));
      onLoginSuccess(data.user); // Usa data.user para la respuesta
      setCurrentPage('home'); // Redirige al dashboard

    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      // Actualiza el mensaje de error del estado
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-page py-5">
      <Container>
        <div className="text-center mb-3">
          <img src="/LibroInicio.png" alt="IveroLibros Logo" className="" />
          <h1 className="display-5 fw-bold title-color">Inicio Sesion</h1>
          <p className="lead">Accede a tu cuenta de IveroLibros</p>
        </div>
        <Row className="justify-content-center ">
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
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="title-color-2">Contraseña</Form.Label>
                <Form.Control
                  className='form-control-login'
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="d-grid gap-2 mt-4">
                <Button variant="primary" type="submit" size="lg">Inicia Sesion</Button>
                <Button variant="outline-primary" size="lg" onClick={() => setCurrentPage('register')}>Registrarse</Button>
              </div>
              <div className="text-center mt-3">
                <a onClick={() => setCurrentPage('forgotPassword')} className="register-login">¿Olvidaste tu contraseña?</a>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
