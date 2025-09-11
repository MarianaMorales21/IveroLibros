// AdminDashboard.jsx
import React, { useState, useMemo } from 'react';
import { Container, Nav, Card } from 'react-bootstrap';
import UserManagement from './userDashboard';
import BookManagement from './bookDashboard';
import QuoteManagement from './quoteDashboard';
import DiscussionManagement from './discussionDashboard';

const AdminDashboard = ({ user }) => {
    const [activeAdminTab, setActiveAdminTab] = useState('usuarios');

    const renderAdminSection = useMemo(() => {
        switch (activeAdminTab) {
            case 'usuarios':
                return <UserManagement user={user}/>;
            case 'libros':
                return <BookManagement user={user}/>;
            case 'frase':
                return <QuoteManagement user={user}/>;
            case 'discusiones':
                return <DiscussionManagement user={user}/>;
            default:
                return <div>Selecciona una opción del menú de administración.</div>;
        }
    }, [activeAdminTab, user]);

    return (
        <div className="admin-dashboard py-4">
            <Container>
                <h2 className="mb-3 fw-bold title-color">Panel de Administración</h2>
                <Nav variant="tabs" defaultActiveKey="usuarios" className="mb-3">
                    <Nav.Item>
                        <Nav.Link eventKey="usuarios" onClick={() => setActiveAdminTab('usuarios')} className={activeAdminTab === 'usuarios' ? 'tab-active' : ''}>Usuarios</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="libros" onClick={() => setActiveAdminTab('libros')} className={activeAdminTab === 'libros' ? 'tab-active' : ''}>Libros</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="frase" onClick={() => setActiveAdminTab('frase')} className={activeAdminTab === 'frase' ? 'tab-active' : ''}>Frase</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="discusiones" onClick={() => setActiveAdminTab('discusiones')} className={activeAdminTab === 'discusiones' ? 'tab-active' : ''}>Discusiones</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Card.Body>
                    {renderAdminSection}
                </Card.Body>
            </Container>
        </div>
    );
};

export default AdminDashboard;
