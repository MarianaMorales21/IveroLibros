import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap';

const MainContent = ({ setCurrentPage }) => {
  // Estado para los datos de la cita y su carga
  const [quoteData, setQuoteData] = useState({ frase: '', autor: '' });
  const [loadingQuote, setLoadingQuote] = useState(true);

  // Efecto para cargar la cita
  useEffect(() => {
    // Establece el estado de carga solo para la cita
    setLoadingQuote(true);
    fetch('https://www.iverolibros.xyz/api/frase')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar la cita');
        }
        return response.json();
      })
      .then(data => {
        setQuoteData(data);
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
        // Si hay un error, puedes mostrar un mensaje predeterminado
        setQuoteData({
          frase: 'No hay frase disponible. Intente de nuevo más tarde.',
          autor: 'Error en el servidor'
        });
      })
      .finally(() => {
        // Independientemente del resultado, la carga de la cita ha terminado
        setLoadingQuote(false);
      });
  }, []);

  return (
    <>
      {/* Sección Hero - Se renderiza inmediatamente */}
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

      {/* Sección de Contenido - Se renderiza inmediatamente */}
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
                {/* Muestra el cargando solo en el bloque de la cita */}
                {loadingQuote ? (
                  <div className="text-center">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Cargando frase...</span>
                    </Spinner>
                  </div>
                ) : (
                  <>
                    <p className="mb-0 fs-4 fw-bold">{quoteData.frase}</p>
                    <footer className="blockquote-footer mt-2">{quoteData.autor}</footer>
                  </>
                )}
              </blockquote>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MainContent;