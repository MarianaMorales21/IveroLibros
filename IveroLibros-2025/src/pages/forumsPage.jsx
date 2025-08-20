import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';


const ForumsPage = ({ setCurrentPage }) => {
  const forumThreads = [
    {
      title: '¿Cuál es tu género literario favorito y por qué?',
      description: 'Me encantaría conocer las preferencias de la comunidad. Personalmente, soy fanático de la ciencia ficción porque...',
      author: 'María González',
      responses: 24
    },
    {
      title: 'Libros que cambiaron mi forma de pensar.',
      description: 'He estado reflexionando sobre cómo la lectura puede influir en nuestra perspectiva. ¿Qué libro te ha impactado más?',
      author: 'Juan Pérez',
      responses: 15
    },
    {
      title: 'Recomendaciones de novelas de misterio.',
      description: 'Estoy buscando mi próxima lectura y me inclino por el misterio. ¿Qué joyas ocultas me pueden recomendar?',
      author: 'Ana Rivera',
      responses: 12
    }
  ];

  return (
    <>
      <div className="text-center title-color-section">
        <h1 className="display-5 fw-bold title-color-2 title-forums-margin">Conversa y Conecta en </h1>
        <h1 className="display-5 fw-bold title-color "> Nuestra Comunidad Literaria</h1>
        <p className="lead mt-3">Únete a nuestra comunidad de lectores apasionados. <br /> Participa en debates, comparte tus descubrimientos y conecta con amantes de la literatura independiente.</p>
        <Button variant="primary" className="mt-3 button-forums-margin" onClick={() => setCurrentPage('create-post')}>Crear nueva discusion</Button>
      </div>
      <h2 className="fw-bold mb-4 title-forums-2">Discusiones Generales</h2>
      <Container className="forums-page mb-5">
        {forumThreads.map((thread, index) => (
          <Card className="mb-3" key={index}>
            <Card.Body>
              <h5 className="fw-bold">{thread.title}</h5>
              <p className="mb-1">{thread.description}</p>
              <div className="text-muted small">
                Por {thread.author} • {thread.responses} Respuestas
              </div>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default ForumsPage;