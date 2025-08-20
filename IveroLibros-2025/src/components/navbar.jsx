import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const MyNavbar = ({ setCurrentPage }) => {
  return (
    <Navbar expand="lg" className="py-3 shadow-sm " >
      <Container>
        <Navbar.Brand href="#" onClick={() => setCurrentPage('home')}>
          <div className="d-flex align-items-center">
            <div className="bg-brown text-white p-2 rounded">
              <i className="bi bi-book"></i>
            </div>
            <span class="ms-2 fw-bold text-brown">IveroLibros</span>
          </div>

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => setCurrentPage('home')}>Inicio</Nav.Link>
            <Nav.Link onClick={() => setCurrentPage('forums')}>Foros</Nav.Link>
            <Nav.Link onClick={() => setCurrentPage('featured-books')}>Libros Destacados</Nav.Link>
            <Nav.Link href="#">Promocionar Libro</Nav.Link>
            <Nav.Link href="#">Noticias</Nav.Link>
          </Nav>
          <Button variant="primary" className="ms-2" onClick={() => setCurrentPage('login')}>Iniciar Sesión</Button>
          <Button variant="outline-primary" className="ms-2" onClick={() => setCurrentPage('register')}>Registrarse</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;