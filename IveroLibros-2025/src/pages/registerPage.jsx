import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const RegisterPage = () => {
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
            <Form className="p-4 rounded-3 shadow-sm">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="title-color">Nombre</Form.Label>
                    <Form.Control className="form-control-login" type="text" placeholder="Jane" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="title-color">Apellido</Form.Label>
                    <Form.Control className="form-control-login" type="text" placeholder="Smith" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label className="title-color">Usuario</Form.Label>
                <Form.Control className="form-control-login" type="text" placeholder="Jane Smith" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="title-color">Teléfono</Form.Label>
                <Form.Control className="form-control-login" type="tel" placeholder="+58 0412364587" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="title-color">Correo</Form.Label>
                <Form.Control className="form-control-login" type="email" placeholder="Jane@framer.com" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control className="form-control-login" type="password" placeholder="*****" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="title-color">Confirmar Contraseña</Form.Label>
                <Form.Control className="form-control-login" type="password" placeholder="*****" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check  type="checkbox" label="Acepto los Términos y Condiciones y la Política de Privacidad" />
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