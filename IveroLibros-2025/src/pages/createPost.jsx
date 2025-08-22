import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const CreatePostPage = () => {
  return (
    <div className="create-post-page py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold title-color-2">Inicia una Nueva </h1>
          <h1 className="display-5 fw-bold title-color">Conversación Literaria</h1>
        </div>

        <Row className="justify-content-center create-post-Row">
          <Col md={8}>
            <Form className="form">
              <Form.Group className="mb-3">
                <Form.Label className='title-color-2'>Título de la discusión:</Form.Label>
                <Form.Control className='post-forum' type="text" placeholder="Agregar título" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className='title-color-2'>Categoría:</Form.Label>
                <Form.Control className='post-forum' as="select">
                  <option>Selecciona una categoría</option>
                  <option>Discusiones Generales</option>
                  <option>Ciencia Ficción</option>
                  <option>Poesía</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className='title-color-2'>Escribe el contenido de la discusion:</Form.Label>
                <Form.Control className='post-forum' as="textarea" rows={6} placeholder="En este apartado escribe el contenido de la discusion. Se claro con lo que deseas compartir" />
              </Form.Group>

              <div className="mt-5">
                <h4 className="fw-bold title-color">CONSEJOS PARA UNA BUENA DISCUSIÓN:</h4>
                <ul>
                  <li>Usa un título claro y descriptivo</li>
                  <li>Proporciona contexto suficiente en tu mensaje</li>
                  <li>Sé respetuoso con otros miembros</li>
                  <li>Revisa si ya existe una discusión similar</li>
                </ul>
              </div>

              <div className="d-grid gap-2 mt-4">
                <Button className="btn-primary" size="lg">Crear Discusion</Button>
                <Button className="btn-outline-primary" variant="outline-secondary" size="lg">Cancelar</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreatePostPage;