import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { BiHome, BiBookOpen, BiGroup, BiStar, BiNews, BiTachometer } from 'react-icons/bi';
import { helpHttp } from '../helpHttp';
// Se agrega la prop 'isAdmin' para validar si el usuario es administrador
const MyNavbar = ({ currentPage, setCurrentPage, isAdmin }) => {
  const api = helpHttp();
  const handleLogout = async () => {
    try {
      const response = await api.post('http://localhost:8000/logout');
      if (!response.err) {
        console.log('Sesión cerrada correctamente');
        // Redirigir al usuario a la página de inicio de sesión
        setCurrentPage('login');
      } else {
        console.error('Error al cerrar sesión:', response);
      }
    } catch (error) {
      console.error('Error de red al cerrar sesión:', error);
    }
  };

  return (
    <Navbar expand="lg" className="py-3 shadow-sm navbar-color">
      <Container>
        <Navbar.Brand href="#" onClick={() => setCurrentPage('home')}>
          <div className="d-flex align-items-center">
            <div className="bg-brown text-white p-2 rounded">
              <i className="bi bi-book"></i>
            </div>
            <span className="ms-2 fw-bold text-brown">IveroLibros</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Inicio */}
            <Nav.Link
              className={`navbar-style ${currentPage === 'home' ? 'active-link' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              <BiHome className="me-1" /> Inicio
            </Nav.Link>

            {/* Foros */}
            <Nav.Link
              className={`navbar-style ${currentPage === 'forums' ? 'active-link' : ''}`}
              onClick={() => setCurrentPage('forums')}
            >
              <BiGroup className="me-1" /> Foros
            </Nav.Link>

            {/* Libros Destacados */}
            <Nav.Link
              className={`navbar-style ${currentPage === 'featured-books' ? 'active-link' : ''}`}
              onClick={() => setCurrentPage('featured-books')}
            >
              <BiBookOpen className="me-1" /> Libros Destacados
            </Nav.Link>

            {/* Promocionar Libro */}
            <Nav.Link
              className={`navbar-style ${currentPage === 'promote-book' ? 'active-link' : ''}`}
              onClick={() => setCurrentPage('promote-book')}
            >
              <BiStar className="me-1" /> Promocionar Libro
            </Nav.Link>

            {/* Renderizado condicional del Dashboard */}
            {isAdmin && (
              <Nav.Link
                className={`navbar-style ${currentPage === 'dashboard' ? 'active-link' : ''}`}
                onClick={() => setCurrentPage('dashboard')}
              >
                <BiTachometer className="me-1" /> Dashboard
              </Nav.Link>
            )}
          </Nav>
          <Button variant="primary" className="ms-2" onClick={handleLogout}>Cerrar Sesión</Button>
          <Button variant="primary" className="ms-2" onClick={() => setCurrentPage('login')}>
            Iniciar Sesión
          </Button>
          <Button variant="outline-primary" className="ms-2" onClick={() => setCurrentPage('register')}>
            Registrarse
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;


