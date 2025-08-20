import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const LoginPage = () => {
  return (
    <div className="login-page py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold">Inicio Sesion</h1>
          <p className="lead">Accede a tu cuenta de IveroLibros</p>
        </div>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form className="p-4 rounded-3 shadow-sm bg-white">
              <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control type="text" placeholder="Jane Smith" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="********" />
              </Form.Group>
              <div className="d-grid gap-2 mt-4">
                <Button variant="primary" size="lg">Inicia Sesion</Button>
                <Button variant="outline-primary" size="lg">Registrarse</Button>
              </div>
              <div className="text-center mt-3">
                <a href="#">¿Olvidaste tu contraseña?</a>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;