import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { helpHttp } from '../helpHttp';

const BookDetailsPage = ({ bookId, setCurrentPage }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = helpHttp();

  const fetchBookDetails = useCallback(async () => {
    if (!bookId) {
      setError("ID del libro no proporcionado.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // CAMBIO 1: Corregir la URL para que coincida con el backend
      const response = await api.get(`http://localhost:8080/libros/read_single.php?id=${bookId}`);
      
      if (!response.err) {
        // CAMBIO 2: Asignar la respuesta directamente sin .data
        setBook(response); 
        setError(null);
      } else {
        setError(response.statusText || 'Error al cargar los detalles del libro.');
      }
    } catch (err) {
      console.error("Error de red:", err);
      setError('Ocurrió un error de red. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [bookId, api]);

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando detalles...</span>
        </Spinner>
        <p className="mt-2">Cargando detalles del libro...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="text-center my-5 text-danger">
        <p>{error || "No se pudo encontrar el libro. Por favor, intente de nuevo."}</p>
        <Button variant="primary" onClick={() => setCurrentPage('featured-books')}>
          Volver a la lista de libros
        </Button>
      </div>
    );
  }

  // CAMBIO 3: Usar los nombres de propiedades del backend en el JSX
  return (
    <div className="book-details-page py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold title-color-2 title-book-details">{book.titulo}</h1>
          <h1 className="display-5 fw-bold title-color title-book-details">Detalles</h1>
        </div>

        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="g-4 align-items-center">
              <Col md={4} className="mb-4 d-flex flex-column align-items-center">
                <img
                  src={book.portada} // Usar 'portada' en lugar de 'image'
                  alt={`Portada de ${book.titulo}`}
                  className="img-fluid rounded-3 shadow-lg mb-3"
                />
              </Col>
              <Col md={8}>
                <p className="text-muted fw-bold">{book.descripcion || 'Sin descripción'}</p>
                <ul className="list-unstyled mb-0">
                  <li>
                    <strong className="fw-bold">Año:</strong> {book.año || 'N/A'}
                  </li>
                  <li>
                    <strong className="fw-bold">Autor:</strong> {book.autor || 'N/A'}
                  </li>
                  <li>
                    <strong className="fw-bold">Género:</strong> {book.genero || 'N/A'}
                  </li>
                  <li>
                    <strong className="fw-bold">Editorial:</strong> {book.editorial || 'N/A'}
                  </li>
                  <li>
                    <strong className="fw-bold">Páginas:</strong> {book.paginas || 'N/A'}
                  </li>
                </ul>
                <Button variant="primary" className="w-100 mt-3" href={book.linkCompra}>
                  Comprar
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <h4 className="mt-4 fw-bold">Sinopsis</h4>
        <p>{book.sinopsis || 'Sin sinopsis'}</p>
        
        <div className="mt-4">
          <Button variant="outline-primary" onClick={() => setCurrentPage('featured-books')}>
            Volver a la lista de libros
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default BookDetailsPage;