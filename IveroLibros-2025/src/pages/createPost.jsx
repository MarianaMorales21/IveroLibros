import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { helpHttp } from '../helpHttp';

const CreatePostPage = ({ setCurrentPage, user }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // ✅ nuevo estado
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const api = helpHttp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!user || !user.id) {
      setError('Debes iniciar sesión para crear una discusión.');
      return;
    }

    if (!title.trim() || !category.trim() || !content.trim()) {
      setError('Por favor, llena todos los campos.');
      return;
    }

    try {
      setIsCreatingPost(true);

      const newDiscussion = {
        titulo: title,
        categoria: category,
        contenido: content,
        usuario_id: user.id,
      };

      const response = await api.post('http://localhost:8000/discusiones', {
        body: newDiscussion,
      });

      if (response.err) {
        setError(response.statusText || 'Error al crear la discusión. Inténtalo de nuevo.');
      } else {
        setSuccessMessage('Discusión creada con éxito'); // ✅ mensaje
        // esperar 2 segundos antes de redirigir
        setTimeout(() => {
          setCurrentPage('forums');
        }, 2000);
      }
    } catch (err) {
      console.error('Error de red al crear el post:', err);
      setError('Ocurrió un error inesperado. Inténtalo de nuevo.');
    } finally {
      setIsCreatingPost(false);
    }
  };

  return (
    <div className="create-post-page py-5">
      <Container>
        <div className="text-center mb-5 forum-header">
          <h1 className="display-4 fw-bold title-color-2">Crea una</h1>
          <h1 className="display-4 fw-bold title-color">Discusión</h1>
          <p className="lead mt-3">
            Comparte tus ideas con la comunidad.
          </p>
        </div>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="p-4 shadow-sm bg-custom-yellow">
              <Form onSubmit={handleSubmit}>
                {/* ✅ Alerta de error */}
                {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                {/* ✅ Alerta de éxito */}
                {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>}

                <Form.Group className="mb-3">
                  <Form.Label className="title-color-2 fw-bold">Título</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Escribe un título descriptivo"
                    className="form-control-login"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isCreatingPost}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="title-color-2 fw-bold">Categoría</Form.Label>
                  <Form.Control
                    as="select"
                    className="form-control-login"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={isCreatingPost}
                    required
                  >
                    <option value="">Selecciona una categoría</option>
                    <option value="Libros">Libros</option>
                    <option value="Autores">Autores</option>
                    <option value="Poesía">Poesía</option>
                    <option value="Cuentos">Cuentos</option>
                    <option value="Otros">Otros</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="title-color-2 fw-bold">Contenido</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Escribe el contenido de tu discusión..."
                    className="form-control-login"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={isCreatingPost}
                    required
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={isCreatingPost}
                  >
                    {isCreatingPost ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="ms-2">Creando...</span>
                      </>
                    ) : (
                      'Publicar Discusión »'
                    )}
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreatePostPage;
