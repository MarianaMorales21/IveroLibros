import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, Spinner, Alert, ListGroup, Button } from 'react-bootstrap';
import { helpHttp } from '../helpHttp';
import AdminTable from '../components/table';
import ReusableModal from '../components/modal';
import { FaTrashAlt } from 'react-icons/fa';

const DiscussionManagement = () => {
    const api = useMemo(() => helpHttp(), []);

    // Estados para Discusiones y Respuestas
    const [discusiones, setDiscusiones] = useState([]);
    const [loadingDiscusiones, setLoadingDiscusiones] = useState(false);
    const [errorDiscusiones, setErrorDiscusiones] = useState(null);
    const [replies, setReplies] = useState([]);
    const [loadingReplies, setLoadingReplies] = useState(false);
    const [errorReplies, setErrorReplies] = useState(null);

    // Estados para Modales
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showRepliesModal, setShowRepliesModal] = useState(false);
    const [selectedDiscusion, setSelectedDiscusion] = useState(null);
    const [deleteModalMessage, setDeleteModalMessage] = useState('');

    // Estado para mensajes de éxito
    const [successMessage, setSuccessMessage] = useState(null);

    const fetchDiscusiones = useCallback(async () => {
        setLoadingDiscusiones(true);
        try {
            const response = await api.get('http://localhost:8000/discusiones');
            if (response.err) {
                setErrorDiscusiones(response.err.statusText || 'Error al cargar discusiones');
            } else {
                setDiscusiones(response);
                setErrorDiscusiones(null);
            }
        } catch (error) {
            console.error("Error en la petición de discusiones:", error);
            setErrorDiscusiones('Error de red al conectar con la API.');
        } finally {
            setLoadingDiscusiones(false);
        }
    }, [api]);

    const fetchRepliesByDiscussion = useCallback(async (discussionId) => {
        setLoadingReplies(true);
        setReplies([]); // Limpia las respuestas anteriores
        try {
            const response = await api.get(`http://localhost:8000/respuestas/${discussionId}`);
            if (response.err) {
                setErrorReplies(response.err.statusText || 'Error al cargar respuestas');
            } else {
                setReplies(response);
                setErrorReplies(null);
            }
        } catch (error) {
            console.error("Error fetching replies:", error);
            setErrorReplies('Error de red al conectar con la API.');
        } finally {
            setLoadingReplies(false);
        }
    }, [api]);

    useEffect(() => {
        fetchDiscusiones();
    }, [fetchDiscusiones]);

    const handleClose = useCallback(() => {
        setShowDeleteModal(false);
        setShowRepliesModal(false);
        setSelectedDiscusion(null);
        setReplies([]);
        setErrorReplies(null);
        setSuccessMessage(null); // limpiamos mensajes al cerrar modal
    }, []);

    const handleDeleteDiscusion = async (e) => {
        e.preventDefault();
        if (!selectedDiscusion) return;
        try {
            // Check for replies first
            const repliesResponse = await api.get(`http://localhost:8000/respuestas/${selectedDiscusion.id}`);
            if (repliesResponse && repliesResponse.length > 0) {
                setDeleteModalMessage('No puedes eliminar esta discusión porque tiene respuestas asociadas. Por favor, borra las respuestas primero.');
                return;
            }

            const deleteResponse = await api.del(`http://localhost:8000/discusiones/${selectedDiscusion.id}`);
            if (deleteResponse.err) {
                alert(`Error al eliminar discusión: ${deleteResponse.err.statusText}`);
            } else {
                handleClose();
                fetchDiscusiones();
            }
        } catch (error) {
            console.error("Error al eliminar discusión:", error);
            alert('Error de red al eliminar discusión.');
        }
    };

    const handleDeleteReply = useCallback(async (replyId, discussionId, e) => {
        e.preventDefault();
        try {
            const response = await api.del(`http://localhost:8000/respuestas/${replyId}`);

            if (response && response.err) {
                alert(`Error al eliminar respuesta: ${response.err.statusText}`);
            } else {
                fetchRepliesByDiscussion(discussionId);
                setSuccessMessage("✅ Respuesta eliminada con éxito");
            }
        } catch (error) {
            console.error("Error al eliminar respuesta:", error);
            alert('Error de red al eliminar respuesta.');
        }
    }, [api, fetchRepliesByDiscussion]);

    const handleDeleteAllReplies = async (e) => {
        e.preventDefault();
        if (!selectedDiscusion) return;
        try {
            const response = await api.del(`http://localhost:8000/respuestas/all/${selectedDiscusion.id}`);

            if (response && response.err) {
                alert(`Error al eliminar todas las respuestas: ${response.err.statusText}`);
            } else {
                setReplies([]); // vaciamos las respuestas en frontend
                setSuccessMessage("Todas las respuestas fueron eliminadas con éxito");
            }
        } catch (error) {
            console.error("Error al eliminar todas las respuestas:", error);
            alert('Error de red al eliminar todas las respuestas.');
        }
    };

    const discusionColumns = [
        { key: 'id', header: 'ID' },
        { key: 'titulo', header: 'Título' },
        { key: 'categoria', header: 'Categoria' },
        { key: 'usuario_id', header: 'Usuario' },
    ];

    const discusionActions = [
        {
            label: 'Respuestas',
            handler: (discusion) => {
                setSelectedDiscusion(discusion);
                fetchRepliesByDiscussion(discusion.id);
                setShowRepliesModal(true);
            },
        },
        {
            label: 'Eliminar',
            handler: (discusion) => {
                setSelectedDiscusion(discusion);
                setDeleteModalMessage('¿Estás seguro de que deseas eliminar esta discusión?');
                setShowDeleteModal(true);
            },
            variant: 'danger'
        },
    ];

    return (
        <>
            <Card className="shadow-sm mt-3">
                <Card.Header className="d-flex justify-content-between align-items-center fw-bold title-color-2">
                    Listado de Discusiones
                </Card.Header>
                <Card.Body>
                    <AdminTable
                        data={discusiones}
                        columns={discusionColumns}
                        actions={discusionActions}
                        loading={loadingDiscusiones}
                        error={errorDiscusiones}
                        onRetry={fetchDiscusiones}
                        title="Discusiones"
                    />
                </Card.Body>
            </Card>

            {/* Modal para eliminar discusion */}
            <ReusableModal
                show={showDeleteModal}
                onHide={handleClose}
                title="Confirmar Eliminación"
                onSubmit={handleDeleteDiscusion}
                submitLabel="Eliminar"
                cancelLabel="Cancelar"
            >
                {selectedDiscusion && (
                    <p>{deleteModalMessage}</p>
                )}
            </ReusableModal>

            {/* Modal para mostrar y gestionar respuestas */}
            <ReusableModal
                show={showRepliesModal}
                onHide={handleClose}
                title={`"${selectedDiscusion?.titulo}"`}
                submitLabel="Eliminar Todas las Respuestas"
                onSubmit={handleDeleteAllReplies}
                cancelLabel="Cerrar"
                size="lg"
                centered={true}
            >
                {successMessage && (
                    <Alert
                        variant="success"
                        dismissible
                        onClose={() => setSuccessMessage(null)}
                        className="mb-3"
                    >
                        {successMessage}
                    </Alert>
                )}

                {loadingReplies && <Spinner animation="border" />}
                {errorReplies && <Alert variant="danger">{errorReplies}</Alert>}

                {!loadingReplies && !errorReplies && (
                    <ListGroup>
                        {replies.length === 0 ? (
                            <ListGroup.Item className="discusion-none margin-response text-center text-muted">
                                Esta discusión no tiene respuestas.
                            </ListGroup.Item>
                        ) : (
                            replies.map(reply => (
                                <ListGroup.Item
                                    key={reply.id}
                                    className="lista-discusion margin-response d-flex justify-content-between align-items-center"
                                >
                                    {reply.respuesta}
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={(e) => handleDeleteReply(reply.id, reply.discusion_id, e)}
                                    >
                                        <FaTrashAlt />
                                    </Button>
                                </ListGroup.Item>
                            ))
                        )}
                    </ListGroup>
                )}
            </ReusableModal>
        </>
    );
};

export default DiscussionManagement;
