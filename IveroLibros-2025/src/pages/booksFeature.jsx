import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Card, Button, Spinner } from 'react-bootstrap';
import { helpHttp } from '../helpHttp';

const FeaturedBooksPage = ({ setCurrentPage, setSelectedBook }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = helpHttp();
  const urlBooks = 'http://localhost:8000/libros';

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get(urlBooks);

      if (!response.err) {
        setBooks(response || []);
        setError(null);
      } else {
        setError(response.statusText || 'Error al cargar los libros.');
      }
    } catch (err) {
      console.error('Error de red:', err);
      setError('Ocurrió un error de red. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando libros...</span>
        </Spinner>
        <p className="mt-2">Cargando libros...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-5 text-danger">
        <p>{error}</p>
        <Button variant="primary" onClick={fetchBooks}>Reintentar</Button>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center my-5">
        <p>No se encontraron libros destacados.</p>
      </div>
    );
  }

  return (
    <div className="featured-books-page py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold title-color-2">Descubre Nuevas</h1>
          <h1 className="display-5 fw-bold title-color">Joyas Literarias</h1>
          <p className="lead">
            Explora nuestra selección de libros imperdibles: conoce sus reseñas y adquiere tu próxima gran lectura.
          </p>
        </div>

        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label className="title-color-2">Nombre del libro</Form.Label>
              <Form.Control
                className="filter form-control-login"
                type="text"
                placeholder="Ej. El Susurro de las Páginas"
              />
            </Form.Group>
          </Col>
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label className="title-color-2">Filtrar por:</Form.Label>
              <Form.Control className="filter form-control-login" as="select">
                <option>Selecciona un género</option>
                <option>Ficción</option>
                <option>No ficción</option>
                <option>Fantasía</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-4">
          {books.map((book) => (
            <Col xs={12} sm={6} md={4} lg={3} key={book.id}>
              <Card className="h-100 shadow-sm custom-card title-color-section">
                <Card.Img variant="top" src={book.image} alt={book.title} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text className="text-muted">{book.description}</Card.Text>
                  <div className="d-grid gap-2">
                    <Button variant="primary">Comprar</Button>
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        setSelectedBook(book.id);
                        setCurrentPage('book-details');
                      }}
                    >
                      Reseña
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FeaturedBooksPage;
