import React, { useEffect, useState } from 'react';
import { Container, Button, Card, Spinner } from 'react-bootstrap';
import { helpHttp } from '../helpHttp';

const ForumsPage = ({ setCurrentPage }) => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = helpHttp();
  const urlDiscussions = 'https://www.iverolibros.xyz/api/discusiones';
  const urlUsers = 'https://www.iverolibros.xyz/api/usuarios';
  const urlResponses = 'https://www.iverolibros.xyz/api/respuestas';

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(urlDiscussions);

      if (!response.err && Array.isArray(response)) {
        const enriched = await Promise.all(
          response.map(async (disc) => {
            const user = await api.get(`${urlUsers}/${disc.usuario_id}`);
            const autor = user && !user.err ? `${user.nombre} ${user.apellido}` : 'Desconocido';

            const respuestas = await api.get(`${urlResponses}/${disc.id}`);
            const respuestas_count = respuestas && Array.isArray(respuestas) ? respuestas.length : 0;

            return {
              ...disc,
              autor,
              respuestas_count,
            };
          })
        );

        // ⭐ AÑADE ESTA LÍNEA para ordenar las discusiones
        const sortedDiscussions = enriched.sort((a, b) => b.respuestas_count - a.respuestas_count);

        setDiscussions(sortedDiscussions); // ⭐ Y CAMBIA 'enriched' a 'sortedDiscussions' aquí
        setError(null);
      } else {
        setError(response.statusText || 'Error al cargar las discusiones.');
      }
    } catch (err) {
      console.error('Error de red:', err);
      setError('Ocurrió un error de red. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const truncateContent = (text) => {
    if (!text) return '';
    return text.length > 100 ? text.substring(0, 100) + '...' : text;
  };

  if (loading) {
    return (
      <div className="forums-page py-5 d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando discusiones...</span>
          </Spinner>
          <p className="mt-2">Cargando discusiones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="forums-page py-5 d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <p>{error}</p>
          <Button variant="primary" onClick={fetchDiscussions}>Reintentar</Button>
        </div>
      </div>
    );
  }

  if (discussions.length === 0) {
    return (
      <div className="text-center my-5">
        <p>Aún no hay discusiones. ¡Sé el primero en crear una!</p>
      </div>
    );
  }

  return (
    <div className="forums-page py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold title-color-2">Conversa y Conecta en</h1>
          <h1 className="display-5 fw-bold title-color">Nuestra Comunidad Literaria</h1>
          <p className="lead mt-3">
            Únete a nuestra comunidad de lectores apasionados. <br />
            Participa en debates, comparte tus descubrimientos y conecta con amantes de la literatura independiente.
          </p>
          <Button
            variant="primary"
            className="mt-3 button-forums-margin"
            onClick={() => setCurrentPage('create-post')}
          >
            Crear nueva discusión
          </Button>
        </div>

        <h2 className="fw-bold mb-4 title-forums-2">Discusiones Generales</h2>

        {discussions.map((thread) => (
          <Card className="mb-3 title-color-section" key={thread.id}>
            <Card.Body>
              <h5
                className="fw-bold"
                style={{ cursor: 'pointer' }}
                onClick={() => setCurrentPage('forumsPage', { id: thread.id })}
              >
                {thread.titulo}
              </h5>
              <p className="mb-1">{truncateContent(thread.contenido)}</p>
              <div className="text-muted small">
                Por {thread.autor} • {thread.respuestas_count} Respuestas
              </div>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default ForumsPage;
