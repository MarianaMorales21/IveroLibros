import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { helpHttp } from '../helpHttp';
import ReusableModal from '../components/modal';

const QuoteManagement = () => {
    const api = useMemo(() => helpHttp(), []);

    // Estados para la Cita
    const [quoteData, setQuoteData] = useState({ frase: '', autor: '' });
    const [loadingQuote, setLoadingQuote] = useState(false);
    const [errorQuote, setErrorQuote] = useState(null);
    const [showQuoteEditModal, setShowQuoteEditModal] = useState(false);

    const fetchQuote = useCallback(async () => {
        setLoadingQuote(true);
        try {
            const response = await api.get('https://www.iverolibros.xyz/api/frase');
            if (response.err) {
                setErrorQuote(response.err.statusText || 'Error al cargar la cita');
            } else {
                setQuoteData(response);
                setErrorQuote(null);
            }
        } catch (error) {
            console.error("Error en la petición de la cita:", error);
            setErrorQuote('Error de red al conectar con la API.');
        } finally {
            setLoadingQuote(false);
        }
    }, [api]);

    useEffect(() => {
        fetchQuote();
    }, [fetchQuote]);

    const handleClose = useCallback(() => {
        setShowQuoteEditModal(false);
    }, []);

    const handleEditQuote = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('https://www.iverolibros.xyz/api/frase/update', {
                body: quoteData
            });
            if (response.err) {
                alert(`Error al editar la cita: ${response.err.statusText}`);
            } else {
                handleClose();
                fetchQuote();
            }
        } catch (error) {
            console.error("Error al editar la cita:", error);
            alert('Error de red al editar la cita.');
        }
    };

    return (
        <>
            <Card className="shadow-sm mt-3">
                <Card.Header className="d-flex justify-content-between align-items-center fw-bold title-color-2">
                    Gestión de la Frase Principal
                    <Button variant="outline-primary" size="sm" onClick={() => setShowQuoteEditModal(true)}>Editar Frase</Button>
                </Card.Header>
                <Card.Body>
                    {loadingQuote && <div className="text-center my-5"><Spinner animation="border" /><p>Cargando frase...</p></div>}
                    {errorQuote && <Alert variant="danger">{errorQuote}</Alert>}
                    {!loadingQuote && !errorQuote && (
                        <div className="text-center">
                            <blockquote className="blockquote">
                                <p className="mb-0 fs-4 fw-bold">{quoteData.frase}</p>
                                <footer className="blockquote-footer mt-2">{quoteData.autor}</footer>
                            </blockquote>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* Modal para Editar Frase */}
            <ReusableModal
                show={showQuoteEditModal}
                onHide={handleClose}
                title="Editar Frase Principal"
                onSubmit={handleEditQuote}
                submitLabel="Guardar Cambios"
            >
                <Form.Group className="mb-3">
                    <Form.Label className='title-color-2'>Frase</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={quoteData.frase}
                        className="form-control-login"
                        onChange={(e) => setQuoteData({ ...quoteData, frase: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className='title-color-2'>Autor</Form.Label>
                    <Form.Control
                        type="text"
                        className="form-control-login"
                        value={quoteData.autor}
                        onChange={(e) => setQuoteData({ ...quoteData, autor: e.target.value })}
                        required
                    />
                </Form.Group>
            </ReusableModal>
        </>
    );
};

export default QuoteManagement;