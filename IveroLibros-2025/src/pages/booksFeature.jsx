import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Card, Button, Spinner } from 'react-bootstrap';
import { helpHttp } from '../helpHttp';

const FeaturedBooksPage = ({ setCurrentPage, setSelectedBook }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = helpHttp();
  const urlBooks = 'https://www.iverolibros.xyz/api/libros';
  const urlGenres = 'https://www.iverolibros.xyz/api/genero';

  useEffect(() => {
    fetchBooks();
    fetchGenres();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filterName, filterGenre, books]);

  // Obtener libros aprobados
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get(urlBooks);

      if (!response.err) {
        const approvedBooks = (response || []).filter(book => book.estado === 'Aprobado');
        setBooks(approvedBooks);
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

  // Obtener géneros desde API
  const fetchGenres = async () => {
    try {
      const response = await api.get(urlGenres);
      if (!response.err) {
        setGenres(response || []);
      } else {
        console.error('Error cargando géneros:', response.statusText);
      }
    } catch (err) {
      console.error('Error de red al cargar géneros:', err);
    }
  };

  // Aplicar filtros
  const applyFilters = () => {
    let filtered = books;

    if (filterName.trim() !== '') {
      filtered = filtered.filter(book =>
        book.titulo.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    if (filterGenre !== '') {
      filtered = filtered.filter(book => Number(book.genero_id) === Number(filterGenre));
    }

    setFilteredBooks(filtered);
  };
  if (loading) {
    return (
      <div className="forums-page py-5 d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando Libros...</span>
          </Spinner>
          <p className="mt-2">Cargando Libros...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="forums-page py-5 d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <p>{error}</p>
          <Button variant="primary" onClick={fetchBooks}>Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="featured-books-page py-5">
      <Container>
        {/* Encabezado */}
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold title-color-2">Descubre Nuevas</h1>
          <h1 className="display-5 fw-bold title-color">Joyas Literarias</h1>
          <p className="lead">
            Explora nuestra selección de libros imperdibles: conoce sus reseñas y adquiere tu próxima gran lectura.
          </p>
        </div>

        {/* Filtros */}
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label className="title-color-2">Nombre del libro</Form.Label>
              <Form.Control
                className="filter form-control-login"
                type="text"
                placeholder="Ej. El Susurro de las Páginas"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label className="title-color-2">Filtrar por género</Form.Label>
              <Form.Control
                className="filter form-control-login"
                as="select"
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
              >
                <option value="">Todos los géneros</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Resultado de los filtros */}
        {filteredBooks.length === 0 ? (
          <div className="text-center my-5">
            <p>No se encontraron libros destacados con los filtros aplicados.</p>
          </div>
        ) : (
          <Row className="g-4">
            {filteredBooks.map((book) => (
              <Col xs={12} sm={6} md={4} lg={3} key={book.id}>
                <Card className="h-100 shadow-sm custom-card title-color-section">
                  <Card.Img variant="top" src={book.portada} alt={book.titulo} />
                  <Card.Body>
                    <Card.Title>{book.titulo}</Card.Title>
                    <Card.Text className="text-muted">{book.descripcion}</Card.Text>
                    <div className="d-grid gap-2">
                      <Button variant="primary" href={book.linkCompra}>Comprar</Button>
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
        )}
      </Container>
    </div>
  );
};

export default FeaturedBooksPage;
