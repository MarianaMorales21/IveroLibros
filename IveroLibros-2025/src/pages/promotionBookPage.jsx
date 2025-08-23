import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

// Se añade la prop userSubscriptionStatus para controlar el contenido
const PromoteBookPage = ({ userSubscriptionStatus }) => {
    const isPremium = userSubscriptionStatus === 'Premium';

    return (
        <div className="promote-book-page py-5">
            <Container>
                {/* Sección de Encabezado */}
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold title-color-2">Impulsa tu libro y</h1>
                    <h1 className="display-4 fw-bold title-color">conquista nuevos lectores</h1>
                    <p className="lead mt-3 text-secondary">
                        Destaca tu obra en nuestra plataforma y llega a miles de lectores apasionados.
                    </p>
                </div>

                <Row className="justify-content-center">
                    <Col md={7}>
                        {isPremium ? (
                            // **CONTENIDO PARA USUARIO PREMIUM**
                            <Card className="p-4 shadow-sm bg-light-brown rounded">
                                <h3 className="fw-bold mb-4 text-center title-color">Sube tu Libro para Promoción</h3>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label className='title-color-2'>Título del Libro</Form.Label>
                                        <Form.Control className='form-control-login' type="text" placeholder="Ingresa el título" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Autores</Form.Label>
                                        <Form.Control className='form-control-login' type="text" placeholder="Ej: María Pérez Yglesias" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className='title-color-2'>Año de Creación</Form.Label>
                                        <Form.Control className='form-control-login' type="number" placeholder="Ej: 2022" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className='title-color-2'>Género</Form.Label>
                                        <Form.Control className='form-control-login' type="text" placeholder="Ej: Poesía" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className='title-color-2'>Editorial</Form.Label>
                                        <Form.Control className='form-control-login' type="text" placeholder="Ej: Editorial UCR" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className='title-color-2'>Páginas</Form.Label>
                                        <Form.Control className='form-control-login' type="number" placeholder="Ej: 164" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className='title-color-2'>Sinopsis</Form.Label>
                                        <Form.Control className='form-control-login' as="textarea" rows={4} placeholder="Escribe la sinopsis del libro..." />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className='title-color-2'>Link de compra/contacto</Form.Label>
                                        <Form.Control className='form-control-login' type="text" placeholder="https://compra.com" />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label className='title-color-2'>Portada del Libro</Form.Label>
                                        <Form.Control className='form-control-login' type="file" accept="image/*" />
                                    </Form.Group>
                                    <Button variant="primary" className="w-100 btn-upgrade">
                                        Enviar Libro para Promoción
                                    </Button>
                                </Form>
                            </Card>
                        ) : (
                            // **CONTENIDO ORIGINAL PARA USUARIO NO-PREMIUM**
                            <>
                                {/* Tarjeta de Suscripción Premium */}
                                <Card className="mb-4 p-3 shadow-sm premium-card-active">
                                    <Card.Body>
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="me-2 text-warning">
                                                <i className="bi bi-star-fill" style={{ fontSize: '1.5rem' }}></i>
                                            </div>
                                            <span className="fw-bold">Suscripción Premium Requerida</span>
                                        </div>
                                        <p className="mb-4">
                                            Para promocionar tu libro necesitas una suscripción premium. Obtén acceso
                                            completo por solo $2/mes durante el primer año.
                                        </p>
                                        <ul className="list-unstyled mb-4">
                                            <li><i className="bi bi-check-lg text-success me-2"></i>Promoción ilimitada de libros</li>
                                            <li><i className="bi bi-check-lg text-success me-2"></i>Destacado en página principal</li>
                                            <li><i className="bi bi-check-lg text-success me-2"></i>Estadísticas detalladas</li>
                                            <li><i className="bi bi-check-lg text-success me-2"></i>Soporte prioritario</li>
                                        </ul>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h4 className="fw-bold">$2 <small className="text-muted fw-normal">por mes (primer año)</small></h4>
                                            <Button variant="primary" className="btn-upgrade">Actualizar Ahora →</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                                {/* Tarjeta de Suscripción No Activa */}
                                <Card className="p-3 shadow-sm premium-card-inactive">
                                    <Card.Body className="text-center">
                                        <div className="mb-3 text-muted">
                                            <i className="bi bi-lock-fill" style={{ fontSize: '2rem' }}></i>
                                        </div>
                                        <h5 className="fw-bold">Suscripción Premium Requerida</h5>
                                        <p className="text-muted">
                                            Para acceder al formulario de promoción de libros,<br /> necesitas una suscripción premium activa.
                                        </p>
                                        <Button variant="primary" className="btn-upgrade-inactive">Obtener Suscripción Premium</Button>
                                    </Card.Body>
                                </Card>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PromoteBookPage;