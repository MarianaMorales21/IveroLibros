import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const BookDetailsPage = () => {
  // Objeto con los detalles del libro
  const bookDetails = {
    title: 'El Susurro de las Páginas',
    subtitle: 'El susurro de las páginas - Libro',
    year: 2022,
    authors: 'María Pérez Yglesias',
    genre: 'Poesía',
    publisher: 'Editorial UCR',
    pages: 164,
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLO6mv9QkTQ37qe3pVP66MJs_tD__HFk440w&s",
    synopsis: [
      "Este libro de poesía invita a los lectores a sumergirse en un mundo de emociones y sensaciones a través de versos que exploran la naturaleza, el conocimiento y las experiencias humanas. Las hojas, como metáfora, susurran historias que conectan al lector con sus propios sentimientos y reflexiones.",
      "La autora utiliza un lenguaje evocador y simbólico para transmitir mensajes profundos sobre la vida, la muerte, el amor y la memoria. Cada poema es una invitación a escuchar el 'susurro' que emana de las hojas, ese murmullo que nos habla de lo efímero y lo eterno.",
      "En resumen, *El susurro de las hojas cómplices* es una obra que celebra la belleza de lo cotidiano, la profundidad de los sentimientos humanos y la conexión con la naturaleza, invitando al lector a reflexionar sobre su propia existencia y su relación con el entorno."
    ]
  };

  return (
    <div className="book-details-page py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold title-color-2 title-book-details">El Susurro de las</h1>
          <h1 className="display-5 fw-bold title-color title-book-details">Paginas</h1>
        </div>

        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="g-4 align-items-center">
              <Col md={4} className="mb-4 d-flex flex-column align-items-center">
                <img
                  src={bookDetails.imageSrc}
                  alt="Book cover"
                  className="img-fluid rounded-3 shadow-lg mb-3"
                />
              </Col>
              <Col md={8}>
                <p className="text-muted fw-bold">{bookDetails.subtitle}</p>
                <ul className="list-unstyled mb-0">
                  <li>
                    <strong className="fw-bold">Año de creación:</strong> {bookDetails.year}
                  </li>
                  <li>
                    <strong className="fw-bold">Autores:</strong> {bookDetails.authors}
                  </li>
                  <li>
                    <strong className="fw-bold">Género:</strong> {bookDetails.genre}
                  </li>
                  <li>
                    <strong className="fw-bold">Editorial:</strong> {bookDetails.publisher}
                  </li>
                  <li>
                    <strong className="fw-bold">Páginas:</strong> {bookDetails.pages}
                  </li>
                </ul>
                <Button variant="primary" className="w-100">
                  Comprar
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <h4 className="mt-4 fw-bold">Sinopsis</h4>
        {bookDetails.synopsis.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </Container>
    </div>
  );
};

export default BookDetailsPage;