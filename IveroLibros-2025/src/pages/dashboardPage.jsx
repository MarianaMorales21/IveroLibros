import React, { useState } from 'react';
import { Container, Nav, Card, Table, Button, Modal, Form } from 'react-bootstrap';

const AdminDashboard = () => {
    const [activeAdminTab, setActiveAdminTab] = useState('usuarios');

    // Estados para las modales de Libros
    const [showBookAddModal, setShowBookAddModal] = useState(false);
    const [showBookEditModal, setShowBookEditModal] = useState(false);
    const [showBookDeleteModal, setShowBookDeleteModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    // Estados para las modales de Usuarios
    const [showUserEditModal, setShowUserEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [usersData] = useState([
        { id: 1, nombre: 'Ana', apellido: 'Pérez', suscripcion: 'Premium', email: 'ana.perez@example.com' },
        { id: 2, nombre: 'Carlos', apellido: 'López', suscripcion: 'Básica', email: 'carlos.lopez@example.com' },
        { id: 3, nombre: 'Sofía', apellido: 'Martínez', suscripcion: 'Premium', email: 'sofia.martinez@example.com' },
        { id: 4, nombre: 'Javier', apellido: 'Gómez', suscripcion: 'Gratuita', email: 'javier.gomez@example.com' },
    ]);

    // **Datos de libros actualizados con los nuevos campos**
    const [booksData] = useState([
        {
            id: 101,
            titulo: 'El Susurro de las Páginas',
            autores: 'María Pérez',
            genero: 'Poesía',
            creacion: 2022,
            editorial: 'Editorial UCR',
            paginas: 164,
            sinopsis: 'Un cautivador libro de poesía que transporta al lector a través de un viaje emocional.'
        },
        {
            id: 102,
            titulo: 'Sombras en la Noche',
            autores: 'Juan Rodríguez',
            genero: 'Novela',
            creacion: 2020,
            editorial: 'Lumen',
            paginas: 350,
            sinopsis: 'Un thriller psicológico que te mantendrá al borde del asiento. Cada sombra esconde un secreto.'
        },
        {
            id: 103,
            titulo: 'Aventuras en el Bosque',
            autores: 'Laura Vargas',
            genero: 'Infantil',
            creacion: 2023,
            editorial: 'Santillana',
            paginas: 80,
            sinopsis: 'Una historia encantadora para niños sobre un grupo de amigos que exploran un bosque mágico.'
        },
    ]);

    const handleClose = () => {
        setShowBookAddModal(false);
        setShowBookEditModal(false);
        setShowBookDeleteModal(false);
        setShowUserEditModal(false);
        setSelectedBook(null);
        setSelectedUser(null);
    };

    const handleShowBookAdd = () => setShowBookAddModal(true);
    const handleShowBookEdit = (book) => {
        setSelectedBook(book);
        setShowBookEditModal(true);
    };
    const handleShowBookDelete = (book) => {
        setSelectedBook(book);
        setShowBookDeleteModal(true);
    };
    const handleShowUserEdit = (user) => {
        setSelectedUser(user);
        setShowUserEditModal(true);
    };

    const renderAdminSection = () => {
        switch (activeAdminTab) {
            case 'usuarios':
                return (
                    <Card className="shadow-sm mt-3 ">
                        <Card.Header className="fw-bold title-color-2">Listado de Usuarios</Card.Header>
                        <Card.Body>
                            <Table className="admin-table" responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Suscripción</th>
                                        <th>Email</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersData.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.nombre}</td>
                                            <td>{user.apellido}</td>
                                            <td>{user.suscripcion}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    onClick={() => handleShowUserEdit(user)}
                                                >
                                                    Editar Suscripción
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                );
            case 'libros':
                return (
                    <Card className="shadow-sm mt-3">
                        <Card.Header className="d-flex justify-content-between align-items-center fw-bold title-color-2">
                            Listado de Libros
                            <Button variant="outline-primary" size="sm" onClick={handleShowBookAdd}>Agregar Libro</Button>
                        </Card.Header>
                        <Card.Body>
                            <Table className="admin-table" responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Título</th>
                                        <th>Autor</th>
                                        <th>Género</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {booksData.map(book => (
                                        <tr key={book.id}>
                                            <td>{book.id}</td>
                                            <td>{book.titulo}</td>
                                            <td>{book.autores}</td>
                                            <td>{book.genero}</td>
                                            <td>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="me-1"
                                                    onClick={() => handleShowBookEdit(book)}
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    variant="danger-primary"
                                                    size="sm"
                                                    onClick={() => handleShowBookDelete(book)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                );
            default:
                return <div>Selecciona una opción del menú de administración.</div>;
        }
    };

    return (
        <div className="admin-dashboard py-4">
            <Container>
                <h2 className="mb-3 fw-bold title-color">Panel de Administración</h2>
                <Nav variant="tabs" defaultActiveKey="usuarios" className="mb-3">
                    <Nav.Item>
                        <Nav.Link eventKey="usuarios" onClick={() => setActiveAdminTab('usuarios')}
                            className={activeAdminTab === 'usuarios' ? 'tab-active' : ''}
                        >Usuarios
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="libros" onClick={() => setActiveAdminTab('libros')}
                            className={activeAdminTab === 'libros' ? 'tab-active' : ''}
                        >Libros</Nav.Link>
                    </Nav.Item>
                </Nav>
                {renderAdminSection()}
            </Container>

            {/* Modal para Agregar Libro */}
            <Modal show={showBookAddModal} onHide={handleClose}>
                <Modal.Header className='card-color' closeButton >
                    <Modal.Title className="fw-bold title-color">Agregar Nuevo Libro</Modal.Title>
                </Modal.Header>
                <Modal.Body className='card-color'>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="title-color-2">Título</Form.Label>
                            <Form.Control className="form-control-login" type="text" placeholder="Ingresa el título del libro" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Autores</Form.Label>
                            <Form.Control className="form-control-login" type="text" placeholder="Ingresa el o los autores" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Año de Creación</Form.Label>
                            <Form.Control className="form-control-login" type="text" placeholder="Ej: 2024" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Género</Form.Label>
                            <Form.Control className="form-control-login" type="text" placeholder="Ingresa el género" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Editorial</Form.Label>
                            <Form.Control className="form-control-login" type="text" placeholder="Ingresa la editorial" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Páginas</Form.Label>
                            <Form.Control className="form-control-login" type="text" placeholder="Ej: 300" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Sinopsis</Form.Label>
                            <Form.Control className="form-control-login" as="textarea" rows={3} placeholder="Ingresa la sinopsis del libro" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='card-color'>
                    <Button variant="danger-primary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Guardar Libro
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Editar Libro */}
            <Modal show={showBookEditModal} onHide={handleClose}>
                <Modal.Header className='card-color' closeButton>
                    <Modal.Title className="fw-bold title-color">Editar Libro</Modal.Title>
                </Modal.Header>
                <Modal.Body className='card-color'>
                    {selectedBook && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Título</Form.Label>
                                <Form.Control className="form-control-login" type="text" defaultValue={selectedBook.titulo} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Autores</Form.Label>
                                <Form.Control className="form-control-login" type="text" defaultValue={selectedBook.autores} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Año de Creación</Form.Label>
                                <Form.Control className="form-control-login" type="text" defaultValue={selectedBook.creacion} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Género</Form.Label>
                                <Form.Control className="form-control-login" type="text" defaultValue={selectedBook.genero} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Editorial</Form.Label>
                                <Form.Control className="form-control-login" type="text" defaultValue={selectedBook.editorial} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Páginas</Form.Label>
                                <Form.Control className="form-control-login" type="text" defaultValue={selectedBook.paginas} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Sinopsis</Form.Label>
                                <Form.Control className="form-control-login" as="textarea" rows={3} defaultValue={selectedBook.sinopsis} />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer className='card-color'>
                    <Button variant="danger-primary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Eliminar Libro */}
            <Modal show={showBookDeleteModal} onHide={handleClose}>
                <Modal.Header className='card-color' closeButton>
                    <Modal.Title className="fw-bold title-color">Eliminar Libro</Modal.Title>
                </Modal.Header>
                <Modal.Body className='card-color'>
                    {selectedBook && (
                        <p className='title-color-2'>¿Estás seguro de que deseas eliminar el libro **"{selectedBook.titulo}"**?</p>
                    )}
                </Modal.Body>
                <Modal.Footer className='card-color'>
                    <Button variant="primary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger-primary" onClick={handleClose}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Editar Suscripción de Usuario */}
            <Modal show={showUserEditModal} onHide={handleClose}>
                <Modal.Header className='card-color' closeButton>
                    <Modal.Title className="fw-bold title-color">Editar Suscripción de Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body className='card-color'>
                    {selectedUser && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Usuario</Form.Label>
                                <Form.Control className='form-control-login' type="text" value={`${selectedUser.nombre} ${selectedUser.apellido}`} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Estado de Suscripción</Form.Label>
                                <Form.Select className='form-control-login' defaultValue={selectedUser.suscripcion}>
                                    <option value="Gratuita">Gratuita</option>
                                    <option value="Premium">Premium</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer className='card-color'>
                    <Button variant="danger-primary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminDashboard;