import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap';
import { helpHttp } from '../helpHttp';

const ForumsPage = ({ setCurrentPage }) => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = helpHttp();

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        setLoading(true);
        const response = await api.get('http://localhost:8080/discusiones');

        if (response && !response.err && Array.isArray(response)) {
          setDiscussions(response);
          setError(null);
        } else {
          const errorMessage = response.statusText || 'Error al cargar las discusiones.';
          setError(errorMessage);
        }
      } catch (err) {
        console.error("Error de red:", err);
        setError('Ocurrió un error de red. Por favor, inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, [api]); // <-- Se agregó 'api' como dependencia

  const truncateContent = (text) => {
    if (!text) return '';
    return text.length > 100 ? text.substring(0, 100) + '...' : text;
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p className="mt-2">Cargando discusiones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-5 text-danger">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="forums-page py-5">
      <Container>
        <div className="text-center mb-5 ">
          <h1 className="display-5 fw-bold title-color-2">Conversa y Conecta en </h1>
          <h1 className="display-5 fw-bold title-color "> Nuestra Comunidad Literaria</h1>
          <p className="lead mt-3">Únete a nuestra comunidad de lectores apasionados. <br /> Participa en debates, comparte tus descubrimientos y conecta con amantes de la literatura independiente.</p>
          <Button variant="primary" className="mt-3 button-forums-margin" onClick={() => setCurrentPage('create-post')}>Crear nueva discusion</Button>
        </div>
        <h2 className="fw-bold mb-4 title-forums-2">Discusiones Generales</h2>

        {discussions.map((thread) => (
          <Card className="mb-3 title-color-section" key={thread.id}>
            <Card.Body>
              <h5 className="fw-bold" style={{ cursor: 'pointer' }} onClick={() => setCurrentPage("forumsPage", { id: thread.id })}>{thread.titulo}</h5>
              <p className="mb-1">{truncateContent(thread.contenido)}</p>
              <div className="text-muted small">
                Por {thread.autor} • {thread.respuestas_count} Respuestas
              </div>
            </Card.Body>
          </Card>
        ))}

        {discussions.length === 0 && (
          <div className="text-center my-5">
            <p>Aún no hay discusiones. ¡Sé el primero en crear una!</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ForumsPage;