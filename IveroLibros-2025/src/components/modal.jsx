// src/components/ReusableModal.jsx

import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ReusableModal = ({
    show,
    onHide,
    title,
    children,
    onSubmit,
    submitLabel,
    cancelLabel = "Cancelar",
    variantSubmit = "primary",
    variantCancel = "danger",
    showSubmitButton = true
}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header className='card-color' closeButton>
                <Modal.Title className="fw-bold title-color">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='card-color'>
                <Form onSubmit={onSubmit}>
                    {children}
                    <Modal.Footer className='card-color'>
                        <Button variant={variantCancel} onClick={onHide}>
                            {cancelLabel}
                        </Button>
                        {showSubmitButton && (
                            <Button variant={variantSubmit} type="submit">
                                {submitLabel}
                            </Button>
                        )}
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ReusableModal;