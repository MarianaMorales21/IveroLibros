import React from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { BiHome, BiBookOpen, BiGroup, BiStar, BiNews, BiTachometer, BiUser } from 'react-icons/bi';

// Se agregan las props 'user', 'isLoggedIn' y 'handleLogout'
const MyNavbar = ({ currentPage, setCurrentPage, isAdmin, user, isLoggedIn, handleLogout }) => {
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

            {/* Renderizado condicional del Dashboard para admin */}
            {isAdmin && (
              <Nav.Link
                className={`navbar-style ${currentPage === 'dashboard' ? 'active-link' : ''}`}
                onClick={() => setCurrentPage('dashboard')}
              >
                <BiTachometer className="me-1" /> Dashboard
              </Nav.Link>
            )}
          </Nav>

          {/* Renderizado condicional de los botones de autenticación */}
          {!isLoggedIn ? (
            <>
              <Button variant="primary" className="ms-2" onClick={() => setCurrentPage('login')}>
                Iniciar Sesión
              </Button>
              <Button variant="outline-primary" className="ms-2" onClick={() => setCurrentPage('register')}>
                Registrarse
              </Button>
            </>
          ) : (
            <NavDropdown
              title={
                <div className="d-flex align-items-center">
                  <BiUser className="me-1" />
                  <span className="me-2">{user?.nombre} {user?.apellido}</span>
                  <span className={`badge ${user?.suscripcion === 'Premium' ? 'bg-success' : 'bg-secondary'}`}>
                    {user?.suscripcion}
                  </span>
                </div>
              }
              id="user-dropdown"
              className="ms-2 nav-dropdown-user"
            >
              <NavDropdown.Item className='menu-item' onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
