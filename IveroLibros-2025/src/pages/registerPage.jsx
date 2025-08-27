import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const RegisterPage = ({ setCurrentPage }) => {
  // 1. Estados para los campos del formulario
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 2. Función para manejar el envío del formulario (modificada para usar fetch)
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpiar cualquier mensaje de error anterior

    // Validación: Asegurar que las contraseñas coincidan
    if (password !== repeatPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      // Petición a la API para registrar al usuario
      const url = 'http://localhost:8000/usuarios';
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: name,
          apellido: lastName,
          email: email,
          contraseña: password,
          rol: 'Usuario',
          suscripcion: 'Ninguna',
          fechaSuscripcion: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ocurrió un error en el registro.');
      }

      // Si la respuesta es exitosa
      const data = await response.json();
      console.log('Registro exitoso:', data);
      setCurrentPage('login'); // Redirige al usuario a la página de inicio de sesión

    } catch (error) {
      console.error('Error durante el registro:', error);
      // Actualiza el mensaje de error del estado
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="register-page py-5">
      <Container>
        <div className="text-center mb-3">
          <img src="/LibroInicio.png" alt="IveroLibros Logo" className="" />
          <h1 className="display-5 fw-bold title-color">Registro</h1>
          <p className="lead">Accede a todo lo que IveroLibros te ofrece</p>
        </div>

        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Form onSubmit={handleRegister} className="p-4 rounded-3 shadow-sm">
              {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="title-color-2">Nombre</Form.Label>
                    <Form.Control
                      className="form-control-login"
                      type="text"
                      placeholder="Jane"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="title-color-2">Apellido</Form.Label>
                    <Form.Control
                      className="form-control-login"
                      type="text"
                      placeholder="Smith"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label className="title-color-2">Correo</Form.Label>
                <Form.Control
                  className="form-control-login"
                  type="email"
                  placeholder="Jane@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="gmail"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="title-color-2">Contraseña</Form.Label>
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
                <Form.Label className="title-color-2">Confirmar Contraseña</Form.Label>
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

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Acepto los Términos y Condiciones y la Política de Privacidad" required />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Crear Cuenta
              </Button>
              <div className="text-center mt-3">
                ¿Ya tienes una cuenta? <a onClick={() => setCurrentPage('login')} className="register-login">Inicia sesión aquí</a>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;