import React, { useEffect, useState } from 'react';
import { Container, Card, Form, Button, Spinner } from 'react-bootstrap';
import { helpHttp } from '../helpHttp';

const Forums = ({ setCurrentPage, pageProps, user }) => {
  const { id } = pageProps; // id de la discusión seleccionada
  const [discussion, setDiscussion] = useState(null);
  const [responses, setResponses] = useState([]);
  const [newResponseText, setNewResponseText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingResponse, setSendingResponse] = useState(false);
  const [error, setError] = useState(null);

  const api = helpHttp();
  const urlDiscussion = `https://www.iverolibros.xyz/api/discusiones/${id}`;
  const urlResponses = `https://www.iverolibros.xyz/api/respuestas/${id}`;

  useEffect(() => {
    fetchDiscussion();
    fetchResponses();
  }, [id]);

  const fetchDiscussion = async () => {
    try {
      setLoading(true);
      setError(null);
      const discResponse = await api.get(urlDiscussion);
      if (!discResponse.err) {
        // obtener autor
        const user = await api.get(`https://www.iverolibros.xyz/api/usuarios/${discResponse.usuario_id}`);
        const autor = user && !user.err ? `${user.nombre} ${user.apellido}` : 'Desconocido';
        setDiscussion({ ...discResponse, autor });
      } else {
        setError(discResponse.statusText || 'Error al cargar la discusión.');
      }
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error de red. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const fetchResponses = async () => {
    try {
      const resResponse = await api.get(urlResponses);
      if (resResponse && Array.isArray(resResponse)) {
        // Enriquecer las respuestas con el autor
        const enrichedResponses = await Promise.all(
          resResponse.map(async (resp) => {
            const respUser = await api.get(`https://www.iverolibros.xyz/api/usuarios/${resp.usuario_id}`);
            const respAutor = respUser && !respUser.err ? `${respUser.nombre} ${respUser.apellido}` : 'Desconocido';
            return {
              ...resp,
              autor: respAutor,
              tiempo: resp.hora || 'un momento',
              contenido: resp.respuesta,
            };
          })
        );

        // Ordenar las respuestas por fecha de forma descendente (más recientes primero)
        const sortedResponses = enrichedResponses.sort((a, b) => {
          const dateA = new Date(a.hora);
          const dateB = new Date(b.hora);
          return dateB - dateA;
        });

        setResponses(sortedResponses);
      } else {
        setResponses([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    if (!newResponseText.trim()) return;

    // Verificar si el usuario está logueado
    if (!user || !user.id) {
      setError('Debes iniciar sesión para enviar una respuesta.');
      return;
    }

    try {
      setSendingResponse(true);
      const response = await api.post('https://www.iverolibros.xyz/api/respuestas', {
        body: {
          discusion_id: id,
          usuario_id: user.id, // ✅ Usamos el ID del usuario logueado
          respuesta: newResponseText,
          hora: new Date().toISOString(),
        },
      });

      if (!response.err) {
        setNewResponseText('');
        fetchResponses();
      } else {
        setError(response.statusText || 'Error al enviar la respuesta.');
      }
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error inesperado al enviar la respuesta.');
    } finally {
      setSendingResponse(false);
    }
  };

  if (loading) {
    return (
      <div className="forums-page py-5 d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando discusion...</span>
          </Spinner>
          <p className="mt-2">Cargando discusion...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="forums-page py-5 d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <p>{error}</p>
          <Button variant="primary" onClick={() => setCurrentPage('forums')}>Volver al foro</Button>
        </div>
      </div>
    );
  }

  if (!discussion) {
    return (
      <div className="text-center my-5">
        <p>Discusión no encontrada.</p>
        <Button variant="primary" onClick={() => setCurrentPage('forums')}>Volver al foro</Button>
      </div>
    );
  }

  return (
    <div className="forums-page py-5">
      <Container>
        <div className="text-center mb-5 forum-header">
          <h1 className="display-4 fw-bold title-color-2">Participa en la</h1>
          <h1 className="display-4 fw-bold title-color">Conversación</h1>
          <p className="lead mt-3">
            Aporta tu opinión, comparte tu perspectiva y enriquece el debate con tu voz.
          </p>
        </div>
        <Card className="mb-4 shadow-sm main-post-card bg-custom-yellow title-color-section">
          <Card.Body>
            <div className="d-flex align-items-center mb-3">
              {/* No se tienen imágenes de avatar en los datos de la API, se mantiene el estilo base */}
              <div className="user-avatar user-avatar-default me-2"></div>
              <div className="user-info">
                <span className="fw-bold">{discussion.autor}</span>
                <br />
                <span className="text-muted small">Publicado {discussion.tiempo || 'un momento'}</span>
              </div>
            </div>
            <h4 className="fw-bold mb-3 title-color">{discussion.titulo}</h4>
            <p>{discussion.contenido}</p>
          </Card.Body>
        </Card>
        <h3 className="my-4 fw-bold">Respuestas ({responses.length})</h3>
        <Form onSubmit={handleSubmitResponse} className="mb-4 p-4 shadow-sm bg-custom-yellow rounded">
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Escribe tu respuesta..."
              className="rounded-3 forum-textarea form-control-login"
              value={newResponseText}
              onChange={(e) => setNewResponseText(e.target.value)}
              disabled={sendingResponse || !user}
            />
          </Form.Group>
          <div className="text-end">
            <Button variant="primary" type="submit" className="btn-send-response" disabled={sendingResponse || !user}>
              {sendingResponse ? 'Enviando...' : 'Enviar respuesta »'}
            </Button>
          </div>
          {!user && (
            <p className="text-danger mt-2">Debes iniciar sesión para poder responder.</p>
          )}
        </Form>
        {responses.length > 0 ? responses.map((resp) => (
          <Card key={resp.id} className="mb-3 shadow-sm response-card bg-custom-yellow title-color-section">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <div className="user-avatar user-avatar-default me-2"></div>
                <div className="user-info">
                  <span className="fw-bold">{resp.autor}</span>
                  <br />
                  <span className="text-muted small">Publicado {resp.tiempo}</span>
                </div>
              </div>
              <p className="mb-0">{resp.contenido}</p>
            </Card.Body>
          </Card>
        )) : (
          <div className="text-center my-5">
            <p>Aún no hay respuestas. ¡Sé el primero en responder!</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Forums;