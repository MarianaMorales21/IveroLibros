import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { helpHttp } from '../helpHttp';

const Forums = ({ setCurrentPage, pageProps }) => {
  const { id } = pageProps;
  const [discussion, setDiscussion] = useState(null);
  const [responses, setResponses] = useState([]);
  const [newResponseText, setNewResponseText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingResponse, setSendingResponse] = useState(false);
  const [error, setError] = useState(null);
  const api = helpHttp();

  const fetchDiscussionData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`http://localhost:8080/discusiones/${id}`);

      if (response && !response.err) {
        setDiscussion(response.discussion);
        setResponses(response.responses);
        setError(null);
      } else {
        const errorMessage = response.statusText || 'Error al cargar la discusión.';
        setError(errorMessage);
      }
    } catch (err) {
      console.error("Error de red:", err);
      setError('Ocurrió un error de red. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [id, api]); // Las dependencias de useCallback son 'id' y 'api'

  useEffect(() => {
    if (!id) {
      setError("No se encontró la discusión. Por favor, regresa al foro.");
      setLoading(false);
      return;
    }
    fetchDiscussionData();
  }, [id, api, fetchDiscussionData]); // El efecto ahora depende de la versión memorizada de la función

  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    if (!newResponseText.trim()) return;

    try {
      setSendingResponse(true);
      const response = await api.post('http://localhost:8080/respuestas', {
        body: {
          discusion_id: id,
          usuario_id: 1,
          respuesta: newResponseText,
          hora: new Date().toISOString()
        }
      });

      if (!response.err) {
        setNewResponseText('');
        await fetchDiscussionData();
      } else {
        setError(response.statusText || 'Error al enviar la respuesta.');
      }
    } catch (err) {
      console.error('Error al enviar la respuesta:', err);
      setError('Ocurrió un error inesperado al enviar la respuesta.');
    } finally {
      setSendingResponse(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p className="mt-2">Cargando discusión...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-5 text-danger">
        <p>{error}</p>
        <Button variant="primary" onClick={() => setCurrentPage('forumsPage')}>Volver al foro</Button>
      </div>
    );
  }

  if (!discussion) {
    return (
      <div className="text-center my-5">
        <p>Discusión no encontrada.</p>
        <Button variant="primary" onClick={() => setCurrentPage('forumsPage')}>Volver al foro</Button>
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
              <div className="user-avatar user-avatar-maria me-2"></div>
              <div className="user-info">
                <span className="fw-bold">{discussion.autor}</span>
                <br />
                <span className="text-muted small">Publicado hace {discussion.tiempo || 'un momento'}</span>
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
              disabled={sendingResponse}
            />
          </Form.Group>
          <div className="text-end">
            <Button variant="primary" type="submit" className="btn-send-response" disabled={sendingResponse}>
              {sendingResponse ? 'Enviando...' : 'Enviar respuesta »'}
            </Button>
          </div>
        </Form>
        {responses.map((response) => (
          <Card key={response.id} className="mb-3 shadow-sm response-card bg-custom-yellow title-color-section">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <div className={`user-avatar user-avatar-default me-2`}></div>
                <div className="user-info">
                  <span className="fw-bold">{response.autor}</span>
                  <br />
                  <span className="text-muted small">Publicado {response.tiempo}</span>
                </div>
              </div>
              <p className="mb-0">{response.contenido}</p>
            </Card.Body>
          </Card>
        ))}
        {responses.length === 0 && (
          <div className="text-center my-5">
            <p>Aún no hay respuestas. ¡Sé el primero en responder!</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Forums;