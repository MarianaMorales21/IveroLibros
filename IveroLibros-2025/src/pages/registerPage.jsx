import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { helpHttp } from '../helpHttp'; // Ruta corregida

const RegisterPage = ({ setCurrentPage }) => {
  // 1. Estados para los campos del formulario
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 2. Instancia de la utilidad para peticiones
  const api = helpHttp();

  // 3. Función para manejar el envío del formulario
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpiar cualquier mensaje de error anterior

    // 4. Validación: Asegurar que las contraseñas coincidan
    if (password !== repeatPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      // 5. Petición a la API para registrar al usuario
      const response = await api.post('http://localhost:8080/register', {
        body: {
          nombre: name,
          apellido: lastName,
          email: email,
          contraseña: password,
          // Valores predeterminados que no están en el formulario
          role: 'Usuario',
          suscripcion: 'Gratuita',
          fechaSuscripcion: null
        },
        credentials: 'include',
      });

      // 6. Manejo de la respuesta
      if (!response.err) {
        // Registro exitoso, redirigir al login o a la página principal
        console.log('Registro exitoso:', response);
        setCurrentPage('login'); // Redirige al usuario a la página de inicio de sesión
      } else {
        // Si hay un error, mostrar el mensaje de error del servidor
        setErrorMessage(response.statusText);
      }
    } catch (error) {
      console.error('Error durante el registro:', error);
      setErrorMessage('Ocurrió un error inesperado. Inténtalo de nuevo.');
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
            {/* 7. Conectar la función de envío al formulario */}
            <Form onSubmit={handleRegister} className="p-4 rounded-3 shadow-sm">
              {/* Mostrar mensaje de error */}
              {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="title-color-2">Nombre</Form.Label>
                    {/* 8. Conectar el estado al input */}
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
                    {/* Conectar el estado al input */}
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
                {/* Conectar el estado al input */}
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
                {/* Conectar el estado al input */}
                <Form.Control
                  className="form-control-login"
                  type="password"
                  placeholder="*****"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="title-color-2">Confirmar Contraseña</Form.Label>
                {/* Conectar el estado al input */}
                <Form.Control
                  className="form-control-login"
                  type="password"
                  placeholder="*****"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Acepto los Términos y Condiciones y la Política de Privacidad" required/>
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