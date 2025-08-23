import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { helpHttp } from '../helpHttp';

// El componente ahora recibe onLoginSuccess
const LoginPage = ({ setCurrentPage, onLoginSuccess }) => {
  // 1. Estados para los campos del formulario y mensajes de error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 2. Instancia de la utilidad para peticiones
  const api = helpHttp();

  // 3. Función para manejar el envío del formulario
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpiar cualquier mensaje de error anterior

    try {
      // 4. Petición a la API para iniciar sesión
      const response = await api.post('http://localhost:8080/login', {
        body: {
          email: email,
          contraseña: password,
        },
      });

      // 5. Manejo de la respuesta
      if (!response.err) {
        // Inicio de sesión exitoso, ahora se llama a onLoginSuccess
        console.log('Inicio de sesión exitoso:', response);
        onLoginSuccess(response); // <-- **CAMBIO CLAVE**
      } else {
        // Si hay un error, mostrar el mensaje de error del servidor
        setErrorMessage(response.statusText || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      setErrorMessage('Ocurrió un error inesperado. Inténtalo de nuevo.');
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