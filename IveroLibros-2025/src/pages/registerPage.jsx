import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const RegisterPage = () => {
  return (
    <div className="register-page py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold">Registro</h1>
          <p className="lead">Accede a todo lo que IveroLibros te ofrece</p>
        </div>

        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Form className="p-4 rounded-3 shadow-sm bg-white">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Jane" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder="Smith" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control type="text" placeholder="Jane Smith" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="tel" placeholder="+58 0412364587" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" placeholder="Jane@framer.com" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="*****" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control type="password" placeholder="*****" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Acepto los Términos y Condiciones y la Política de Privacidad" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Crear Cuenta
              </Button>
              <div className="text-center mt-3">
                ¿Ya tienes una cuenta? <a href="#">Inicia sesión aquí</a>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;