import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, CardFooter } from 'react-bootstrap';
// Importamos la utilidad para peticiones HTTP
import { helpHttp } from '../helpHttp';

const PromoteBookPage = ({ userSubscriptionStatus, user }) => {
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        titulo: '',
        autores: '',
        anio: '',
        genero: '',
        editorial: '',
        paginas: '',
        sinopsis: '',
        descripcion: '',
        linkCompra: '',
        portada: '',
    });
    // Estado para controlar el envío del formulario
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Estado para mostrar mensajes de éxito o error
    const [message, setMessage] = useState(null);
    // Estado para almacenar la lista de géneros
    const [generos, setGeneros] = useState([]);
    // Estado para la carga de géneros
    const [loadingGeneros, setLoadingGeneros] = useState(true);

    // 💡 Usamos useMemo para instanciar la utilidad una sola vez.
    const api = useMemo(() => helpHttp(), []);
    const isPremium = userSubscriptionStatus === 'Premium';

    const fetchGeneros = useCallback(async () => {
        const url = 'http://localhost:8000/genero';
        setLoadingGeneros(true);

        try {
            const response = await api.get(url);
            if (!response.err) {
                setGeneros(response || []);
            } else {
                console.error('Error al cargar los géneros:', response.statusText);
            }
        } catch (error) {
            console.error('Error de conexión al cargar los géneros:', error);
        } finally {
            setLoadingGeneros(false);
        }

    }, [api]);

    useEffect(() => {
        fetchGeneros();
    }, [fetchGeneros]);

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !isPremium) {
            setMessage({ type: 'danger', text: 'Debes ser un usuario premium para enviar un libro.' });
            return;
        }

        setIsSubmitting(true);
        setMessage(null);

        const url = 'http://localhost:8000/libros';

        const dataToSend = {
            titulo: formData.titulo,
            autor: formData.autores,
            año: formData.anio,
            genero_id: formData.genero,
            editorial: formData.editorial,
            paginas: formData.paginas,
            sinopsis: formData.sinopsis,
            descripcion: formData.descripcion,
            linkCompra: formData.linkCompra,
            portada: formData.portada,
            usuario_id: user.id,
            estado: 'En revision'
        };

        try {
            const response = await api.post(url, { body: dataToSend });

            if (!response.err) {
                setMessage({ type: 'success', text: '¡Tu libro ha sido enviado para promoción exitosamente!. El libro sera publicado al pasar la aprobacion del administrador' });
                setFormData({
                    titulo: '', autores: '', anio: '', genero: '', editorial: '', paginas: '', sinopsis: '', descripcion: '', linkCompra: '', portada: '', estado: 'En revision'
                });
            } else {
                setMessage({ type: 'danger', text: response.statusText || 'Ocurrió un error al enviar el libro.' });
            }
        } catch (error) {
            console.error(error);
            setMessage({ type: 'danger', text: 'Error de conexión. Inténtalo de nuevo.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="promote-book-page py-5">
            <Container>
                {/* Sección de Encabezado */}
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold title-color-2">Impulsa tu libro y</h1>
                    <h1 className="display-4 fw-bold title-color">conquista nuevos lectores</h1>
                    <p className="lead mt-3 text-secondary">
                        ¡Da a conocer tu obra y llega a miles de lectores apasionados! <br />
                        Destaca tu libro en nuestra plataforma y conéctate con una comunidad de amantes de la lectura.
                    </p>
                </div>
                <Row className="justify-content-center">
                    <Col md={7}>
                        {isPremium ? (

                            <Card className="p-4 shadow-sm bg-light-brown rounded">
                                <h3 className="fw-bold mb-4 text-center title-color">Sube tu Libro para Promoción</h3>
                                {message && <Alert variant={message.type}>{message.text}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className='title-color-2'>Título del Libro</Form.Label>
                                        <Form.Control
                                            className='form-control-login'
                                            type="text"
                                            name="titulo"
                                            placeholder="Ingresa el título"
                                            value={formData.titulo}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Autores</Form.Label>
                                        <Form.Control
                                            className='form-control-login'
                                            type="text"
                                            name="autores"
                                            placeholder="Ej: María Pérez Yglesias"
                                            value={formData.autores}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className='title-color-2'>Año de Creación</Form.Label>
                                        <Form.Control
                                            className='form-control-login'
                                            type="number"
                                            name="anio"
                                            placeholder="Ej: 2022"
                                            value={formData.anio}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className='title-color-2'>Género</Form.Label>
                                        <Form.Select
                                            className='form-control-login'
                                            name="genero"
                                            value={formData.genero}
                                            onChange={handleChange}
                                            required
                                            disabled={loadingGeneros}
                                        >
                                            <option value="">Selecciona un género</option>
                                            {loadingGeneros ? (
                                                <option disabled>Cargando géneros...</option>
                                            ) : (
                                                generos.map((genero) => (
                                                    <option key={genero.id} value={genero.id}>
                                                        {genero.nombre}
                                                    </option>
                                                ))
                                            )}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className='title-color-2'>Editorial</Form.Label>
                                        <Form.Control
                                            className='form-control-login'
                                            type="text"
                                            name="editorial"
                                            placeholder="Ej: Editorial UCR"
                                            value={formData.editorial}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className='title-color-2'>Páginas</Form.Label>
                                        <Form.Control
                                            className='form-control-login'
                                            type="number"
                                            name="paginas"
                                            placeholder="Ej: 164"
                                            value={formData.paginas}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className='title-color-2'>Sinopsis</Form.Label>
                                        <Form.Control
                                            className='form-control-login'
                                            as="textarea"
                                            rows={4}
                                            name="sinopsis"
                                            placeholder="Escribe la sinopsis del libro..."
                                            value={formData.sinopsis}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className='title-color-2'>Descripción</Form.Label>
                                        <Form.Control
                                            className='form-control-login'
                                            as="textarea"
                                            rows={4}
                                            name="descripcion"
                                            placeholder="Añade una descripción más detallada del libro..."
                                            value={formData.descripcion}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label className='title-color-2'>Link de compra/contacto</Form.Label>
                                        <Form.Control
                                            className='form-control-login'
                                            type="text"
                                            name="linkCompra"
                                            placeholder="https://compra.com"
                                            value={formData.linkCompra}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label className='title-color-2'>Portada del Libro</Form.Label>
                                        <Form.Control
                                            className='form-control-login'
                                            type="text"
                                            name="portada"
                                            placeholder="https://portada-libro.com"
                                            value={formData.portada}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        className="w-100 btn-upgrade"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Enviando...' : 'Enviar Libro para Promoción'}
                                    </Button>
                                </Form>
                                <CardFooter className='card-information'>
                                    <div className="text-center mb-5 ">
                                        <p className="lead mt-3 text-secondary">
                                            Simplemente registra tu obra para comenzar. Tu libro entrará en estado de revisión. Una vez que nuestro equipo de administradores lo revise y apruebe, el estado cambiará a Aprobado y tu libro será publicado en la plataforma para que todos puedan disfrutarlo.
                                            <br />¡Es hora de compartir tu historia!
                                        </p>
                                    </div>
                                </CardFooter>
                            </Card>
                        ) : (
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
                                            <li><i className="bi bi-check-lg text-success me-2"></i>Soporte prioritario</li>
                                        </ul>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h4 className="fw-bold">$2 <small className="text-muted fw-normal">por mes (primer año)</small></h4>
                                            <Button
                                                variant="primary"
                                                className="btn-upgrade"
                                                onClick={() => window.open("https://wa.me/34722712716?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20suscripci%C3%B3n%20para%20publicar%20mi%20libro%20en%20IveroLibros.%20%C2%BFPodr%C3%ADan%20ayudarme%20con%20los%20detalles%3F", "_blank")}
                                            >
                                                Actualizar Ahora →
                                            </Button>
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
                                        <Button
                                            variant="primary"
                                            className="btn-upgrade"
                                            onClick={() => window.open("https://wa.me/34722712716?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20suscripci%C3%B3n%20para%20publicar%20mi%20libro%20en%20IveroLibros.%20%C2%BFPodr%C3%ADan%20ayudarme%20con%20los%20detalles%3F", "_blank")}
                                        >
                                            Obtener Suscripción Premium →
                                        </Button>
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
