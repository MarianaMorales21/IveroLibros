import React from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';

const FeaturedBooksPage = ({ setCurrentPage, setSelectedBook }) => {
  const books = [
    {
      id: 1,
      title: 'El Susurro de las Páginas',
      description: 'Una novela cautivadora que explora los secretos ocultos en una biblioteca centenaria.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLO6mv9QkTQ37qe3pVP66MJs_tD__HFk440w&s',
      alt: 'Book cover for El Susurro de las Páginas'
    },
    {
      id: 2,
      title: 'Lo que nunca te dije',
      description: 'Una narrativa emocional que revelará secretos del pasado.',
      image: 'https://panamericana.vtexassets.com/arquivos/ids/290167-800-auto?v=636596702376200000&width=800&height=auto&aspect=true',
      alt: 'Book cover for Lo que nunca te dije'
    },
    {
      id: 3,
      title: 'El Viaje del Héroe',
      description: 'Un relato épico sobre el autodescubrimiento y la valentía en un mundo de fantasía.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxr83LoozE7JPzRIHb3RCisYnZkTkBl3fA8Q&s',
      alt: 'Book cover for El Viaje del Héroe'
    },
    {
      id: 4,
      title: 'Los Cien Días de Invierno',
      description: 'Un thriller psicológico ambientado en un remoto pueblo nevado, donde cada habitante es un sospechoso.',
      image: 'https://m.media-amazon.com/images/I/51AdBl6JoEL._UF1000,1000_QL80_.jpg',
      alt: 'Book cover for Los Cien Días de Invierno'
    },
  ];

  return (
    <div className="featured-books-page py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold">Descubre Nuevas</h1>
          <h1 className="display-5 fw-bold title-color">Joyas Literarias</h1>
          <p className="lead">Explora nuestra selección de libros imperdibles: conoce sus reseñas y adquiere tu próxima gran lectura.</p>
        </div>

        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label className="title-color">Nombre del libro</Form.Label>
              <Form.Control className="filter" type="text" placeholder="Ej. El Susurro de las Páginas" />
            </Form.Group>
          </Col>
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label className="title-color">Filtrar por:</Form.Label>
              <Form.Control className="filter" as="select">
                <option>Selecciona un género</option>
                <option>Ficción</option>
                <option>No ficción</option>
                <option>Fantasía</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-4">
          {books.map(book => (
            <Col xs={12} sm={6} md={4} lg={3} key={book.id}>
              <Card className="h-100 shadow-sm custom-card">
                <Card.Img variant="top" src={book.image} alt={book.alt} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text className="text-muted">{book.description}</Card.Text>
                  <div className="d-grid gap-2">
                    <Button variant="primary">Comprar</Button>
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        setSelectedBook(book);
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