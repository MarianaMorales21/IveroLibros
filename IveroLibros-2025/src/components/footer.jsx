import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = ({ setCurrentPage, }) => {
  return (
    <footer className="footer text-white py-5">
      <Container>
        <Row>
          <Col md={3} className="mb-4 mb-md-0">
            <div className="d-flex align-items-center">
              <img
                src="/LogoPrincipal.png"
                width="150"
                height="150"
                className="d-inline-block align-top"
                alt="IveroLibros logo"
              />
            </div>
            <div className="mt-3">
              <a href="#" className="text-white me-3"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
              <a href="#" className="text-white me-3"><FontAwesomeIcon icon={faTwitter} size="lg" /></a>
              <a href="#" className="text-white"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
            </div>
          </Col>
          <Col md={9}>
            <Row>
              <Col sm={4}>
                <Nav className="flex-column">
                  <Nav.Link onClick={() => setCurrentPage('home')} className="text-white p-0 mb-2">Inicio</Nav.Link>
                  <Nav.Link onClick={() => setCurrentPage('forums')} className="text-white p-0 mb-2">Foro</Nav.Link>
                  <Nav.Link onClick={() => setCurrentPage('featured-books')} className="text-white p-0 mb-2">Libros Destacados</Nav.Link>
                  <Nav.Link onClick={() => setCurrentPage('promote-book')} className="text-white p-0 mb-2">Promocionar Libro</Nav.Link>
                </Nav>
              </Col>
              <Col sm={4}>
                <Nav className="flex-column">
                  <Nav.Link onClick={() => setCurrentPage('login')} className="text-white p-0 mb-2">Inicio Sesión</Nav.Link>
                  <Nav.Link onClick={() => setCurrentPage('register')} className="text-white p-0 mb-2">Registro</Nav.Link>
                  <Nav.Link
                    onClick={() => window.open("https://wa.me/34722712716?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n...", "_blank")}
                    className="text-white p-0 mb-2"
                  >
                    Suscripción
                  </Nav.Link>
                </Nav>
              </Col>
              <Col sm={4}>
                <Nav className="flex-column">
                  <Nav.Link
                    onClick={() => window.open("https://wa.me/34722712716?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n...", "_blank")}
                    className="text-white p-0 mb-2"
                  >
                    Contactanos
                  </Nav.Link>
                  <Nav.Link href="#" className="text-white p-0 mb-2">Aviso Legal</Nav.Link>
                  <Nav.Link href="#" className="text-white p-0 mb-2">Política de Privacidad</Nav.Link>
                </Nav>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5 footer-bottom">
          <Col className="text-center">
            <small>© 2025 IveroLibros. Todos los derechos reservados - Compras a través de enlace de afiliado</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;