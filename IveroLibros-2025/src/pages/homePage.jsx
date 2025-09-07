import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const MainContent = ({ setCurrentPage }) => {
  return (
    <>
      {/* Sección Hero */}
      <div className="hero-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4 title-color-2">
                Conecta con la <br />
                <span className="d-block title-color">Comunidad <br /> Literaria</span>
                más Vibrante
              </h1>
              <p className="lead mt-3">
                Únete a IveroLibros, donde autores y lectores se encuentran para compartir pasiones, descubrir nuevos títulos y promocionar obras literarias en un ambiente acogedor y profesional.
              </p>
              <div className="mt-4 ">
                <Button
                  variant="primary"
                  className="me-2 margin-button"
                  onClick={() => setCurrentPage('forums')}
                >
                  Explora el foro
                </Button>
                <Button variant="outline-primary" onClick={() => setCurrentPage('promote-book')}>Promociona tu libro</Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="img-container">
                <img src="/Principal.jpg" alt="bookshelf" className="img-fluid rounded-3 shadow" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Sección de Contenido */}
      <div className="content-section py-5">
        <Container>
          <Row className="g-4">
            <Col md={6}>
              <Card className="h-100 card">
                <div className="card-img-container">
                  <Card.Img variant="top" src="/Libros.jpg" className="rounded-3" alt="stack of books" />
                </div>
                <Card.Body className="text-center text-md-start">
                  <Card.Title className="fw-bold">Libros.</Card.Title>
                  <Card.Text>Sumérgete en mundos de imaginación y conoce nuevos libros que motivan y emocionan.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 card">
                <div className="card-img-container">
                  <Card.Img variant="top" src="/Revistas.jpg" className="rounded-3" alt="stack of magazines" />
                </div>
                <Card.Body className="text-center text-md-start">
                  <Card.Title className="fw-bold">Revistas.</Card.Title>
                  <Card.Text>Explora mundos de imaginación y reflexión, descubre nuevas revistas literarias.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Sección para Unirse */}
      <div className="join-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="fw-bold title-color">ÚNETE A NUESTRA COMUNIDAD</h2>
              <p className="mt-3">
                En IveroLibros, te invitamos a ir más allá de la lectura solitaria. Nuestra plataforma no solo te permite explorar un extenso catálogo de libros, sino que te ofrece el espacio para conectar con otros lectores. Publica tus reseñas, participa en discusiones profundas sobre tus obras favoritas y debate ideas.
              </p>
              <Button variant="primary" onClick={() => setCurrentPage('register')}>Ir al Registro</Button>
            </Col>
            <Col lg={6} className="text-center text-lg-end">
              <blockquote className="blockquote">
                <p className="mb-0 fs-4 fw-bold">
                  "El que lee mucho y anda mucho, ve mucho y sabe mucho."
                </p>
                <footer className="blockquote-footer mt-2">
                  Miguel de Cervantes
                </footer>
              </blockquote>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MainContent;