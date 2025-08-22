import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const Forums = () => {
    // Array de objetos con las respuestas del foro
    const forumResponses = [
        {
            id: 1,
            author: "Pedro Moreno",
            time: "hace 2 horas",
            avatarClass: "user-avatar-pedro",
            text: "Totalmente de acuerdo contigo. La ciencia ficción tiene esa capacidad única de hacernos reflexionar sobre el futuro mientras nos entretiene. Recomiendo mucho 'Fundación' de Asimov."
        },
        {
            id: 2,
            author: "Pedro Moreno",
            time: "hace 2 horas",
            avatarClass: "user-avatar-pedro",
            text: "Totalmente de acuerdo contigo. La ciencia ficción tiene esa capacidad única de hacernos reflexionar sobre el futuro mientras nos entretiene. Recomiendo mucho 'Fundación' de Asimov."
        },
        {
            id: 3,
            author: "Pedro Moreno",
            time: "hace 2 horas",
            avatarClass: "user-avatar-pedro",
            text: "Totalmente de acuerdo contigo. La ciencia ficción tiene esa capacidad única de hacernos reflexionar sobre el futuro mientras nos entretiene. Recomiendo mucho 'Fundación' de Asimov."
        },
    ];

    return (
        <div className="forums-page py-5">
            <Container>
                {/* Sección de Encabezado */}
                <div className="text-center mb-5 forum-header">
                    <h1 className="display-4 fw-bold title-color-2">Participa en la</h1>
                    <h1 className="display-4 fw-bold title-color">Conversación</h1>
                    <p className="lead mt-3">
                        Aporta tu opinión, comparte tu perspectiva y enriquece el debate con tu voz. Cada respuesta
                        suma a la construcción de nuestra comunidad literaria.
                    </p>
                </div>

                {/* Hilo Principal del Foro */}
                <Card className="mb-4 shadow-sm main-post-card bg-custom-yellow title-color-section">
                    <Card.Body>
                        <div className="d-flex align-items-center mb-3">
                            <div className="user-avatar user-avatar-maria me-2"></div>
                            <div className="user-info">
                                <span className="fw-bold">Maria Ruiz</span>
                                <br />
                                <span className="text-muted small">Publicado hace 2horas</span>
                            </div>
                        </div>
                        <h4 className="fw-bold mb-3 title-color">¿Cuál es tu género literario favorito y por qué?</h4>
                        <p>
                            Me encantaría conocer las preferencias de la comunidad. Personalmente, soy fanático de la ciencia ficción porque me
                            permite explorar posibilidades futuras y reflexionar sobre temas profundos de una manera entretenida.
                        </p>
                        <p>
                            Algunos de mis autores favoritos incluyen Isaac Asimov, Philip K. Dick y Liu Cixin. Sus obras no solo me entretienen, sino
                            que me hacen pensar sobre la tecnología, la sociedad y nuestro lugar en el universo.
                        </p>
                        <p>
                            ¿Qué géneros prefieren ustedes? ¿Hay algún libro en particular que los haya marcado o que los haya hecho enamorarse
                            de un género específico?
                        </p>
                    </Card.Body>
                </Card>

                {/* Sección de Respuestas */}
                <h3 className="my-4 fw-bold">Respuestas ({forumResponses.length})</h3>

                {/* Formulario para Escribir una Respuesta */}
                <Form className="mb-4 p-4 shadow-sm bg-custom-yellow rounded">
                    {/* El Form.Group ya no tiene d-flex */}
                    <Form.Group className="mb-3">
                        <Form.Control
                            as="textarea"
                            placeholder="Escribe tu respuesta..."
                            className="rounded-3 forum-textarea form-control-login"
                        />
                    </Form.Group>
                    {/* Un div para alinear el botón a la derecha */}
                    <div className="text-end">
                        <Button variant="primary" className="btn-send-response">
                            Enviar respuesta »
                        </Button>
                    </div>
                </Form>

                {/* Respuestas renderizadas dinámicamente con .map() */}
                {forumResponses.map((response) => (
                    <Card key={response.id} className="mb-3 shadow-sm response-card bg-custom-yellow title-color-section">
                        <Card.Body>
                            <div className="d-flex align-items-center mb-2">
                                <div className={`user-avatar ${response.avatarClass} me-2`}></div>
                                <div className="user-info">
                                    <span className="fw-bold">{response.author}</span>
                                    <br />
                                    <span className="text-muted small">Publicado {response.time}</span>
                                </div>
                            </div>
                            <p className="mb-0">{response.text}</p>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        </div>
    );
};

export default Forums;