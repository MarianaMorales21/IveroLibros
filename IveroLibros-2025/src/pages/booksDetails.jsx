import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const BookDetailsPage = () => {
  return (
    <div className="book-details-page py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold">El Susurro de las Páginas</h1>
        </div>
        <Row>
          <Col md={4} className="mb-4">
            <img src="https://via.placeholder.com/400x600" alt="Book cover" className="img-fluid rounded-3 shadow-lg" />
            <Button variant="primary" className="w-100 mt-3">Comprar</Button>
          </Col>
          <Col md={8}>
            <Card className="h-100 p-4 shadow-sm">
              <Card.Body>
                <p className="text-muted">El susurro de las páginas - Libro</p>
                <ul className="list-unstyled">
                  <li><strong>Año de creación:</strong> 2022</li>
                  <li><strong>Autores:</strong> María Pérez Yglesias</li>
                  <li><strong>Género:</strong> Poesía</li>
                  <li><strong>Editorial:</strong> Editorial UCR</li>
                  <li><strong>Páginas:</strong> 164</li>
                </ul>
                <h4 className="mt-4">Sinopsis</h4>
                <p>
                  Este libro de poesía invita a los lectores a sumergirse en un mundo de emociones y sensaciones a través de
                  versos que exploran la naturaleza, el conocimiento y las experiencias humanas. Las hojas, como metáfora,
                  susurran historias que conectan al lector con sus propios sentimientos y reflexiones.
                </p>
                <p>
                  La autora utiliza un lenguaje evocador y simbólico para transmitir mensajes profundos sobre la vida, la muerte,
                  el amor y la memoria. Cada poema es una invitación a escuchar el 'susurro' que emana de las hojas, ese
                  murmullo que nos habla de lo efímero y lo eterno.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BookDetailsPage;