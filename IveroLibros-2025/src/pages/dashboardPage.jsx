import React, { useState, useEffect, useCallback } from 'react';
import { Container, Nav, Card, Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { helpHttp } from '../helpHttp';

const AdminDashboard = () => {
    const [activeAdminTab, setActiveAdminTab] = useState('usuarios');
    const api = helpHttp();

    // Estados para datos de usuarios
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [errorUsers, setErrorUsers] = useState(null);

    // Estados para datos de libros
    const [books, setBooks] = useState([]);
    const [loadingBooks, setLoadingBooks] = useState(false);
    const [errorBooks, setErrorBooks] = useState(null);

    // Estados para las modales y formularios de Libros
    const [showBookAddModal, setShowBookAddModal] = useState(false);
    const [showBookEditModal, setShowBookEditModal] = useState(false);
    const [showBookDeleteModal, setShowBookDeleteModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [newBookForm, setNewBookForm] = useState({
        title: '',
        authors: '',
        year: '',
        genre: '',
        publisher: '',
        pages: '',
        synopsis: '',
        image: ''
    });
    const [editBookForm, setEditBookForm] = useState(null);

    // Estados para las modales y formularios de Usuarios
    const [showUserEditModal, setShowUserEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editUserSubscriptionForm, setEditUserSubscriptionForm] = useState('');

    const fetchUsers = useCallback(async () => {
        setLoadingUsers(true);
        try {
            const { data, err } = await api.get('http://localhost:8080/api/users/read.php');
            if (!err) {
                setUsers(data);
                setErrorUsers(null);
            } else {
                setErrorUsers(err.statusText || 'Error al cargar usuarios');
            }
        } catch (error) {
            console.error("Error en la petición de usuarios:", error);
            setErrorUsers('Error de red al conectar con la API.');
        } finally {
            setLoadingUsers(false);
        }
    }, [api]);

    const fetchBooks = useCallback(async () => {
        setLoadingBooks(true);
        try {
            const { data, err } = await api.get('http://localhost:8080/api/libros/read.php');
            if (!err) {
                setBooks(data);
                setErrorBooks(null);
            } else {
                setErrorBooks(err.statusText || 'Error al cargar libros');
            }
        } catch (error) {
            console.error("Error en la petición de libros:", error);
            setErrorBooks('Error de red al conectar con la API.');
        } finally {
            setLoadingBooks(false);
        }
    }, [api]);

    useEffect(() => {
        if (activeAdminTab === 'usuarios') {
            fetchUsers();
        } else if (activeAdminTab === 'libros') {
            fetchBooks();
        }
    }, [activeAdminTab, fetchUsers, fetchBooks]);

    const handleClose = () => {
        setShowBookAddModal(false);
        setShowBookEditModal(false);
        setShowBookDeleteModal(false);
        setShowUserEditModal(false);
        setSelectedBook(null);
        setSelectedUser(null);
        setNewBookForm({
            title: '', authors: '', year: '', genre: '', publisher: '', pages: '', synopsis: '', image: ''
        });
        setEditBookForm(null);
        setEditUserSubscriptionForm('');
    };

    const handleShowBookAdd = () => setShowBookAddModal(true);
    const handleShowBookEdit = (book) => {
        setSelectedBook(book);
        setEditBookForm(book);
        setShowBookEditModal(true);
    };
    const handleShowBookDelete = (book) => {
        setSelectedBook(book);
        setShowBookDeleteModal(true);
    };
    const handleShowUserEdit = (user) => {
        setSelectedUser(user);
        setEditUserSubscriptionForm(user.suscripcion);
        setShowUserEditModal(true);
    };

    // Funciones para manejar los envíos de las modales
    const handleCreateBook = async (e) => {
        e.preventDefault();
        try {
            const { err } = await api.post('http://localhost:8080/api/libros/create.php', { body: newBookForm });
            if (!err) {
                handleClose();
                fetchBooks();
            } else {
                alert(`Error al crear libro: ${err.statusText}`);
            }
        } catch (error) {
            console.error("Error al crear libro:", error);
            alert('Error de red al crear libro.');
        }
    };

    const handleEditBook = async (e) => {
        e.preventDefault();
        try {
            const { err } = await api.put(`http://localhost:8080/api/libros/update.php`, { body: editBookForm });
            if (!err) {
                handleClose();
                fetchBooks();
            } else {
                alert(`Error al editar libro: ${err.statusText}`);
            }
        } catch (error) {
            console.error("Error al editar libro:", error);
            alert('Error de red al editar libro.');
        }
    };

    const handleDeleteBook = async () => {
        try {
            const { err } = await api.del(`http://localhost:8080/api/libros/delete.php`);
            if (!err) {
                handleClose();
                fetchBooks();
            } else {
                alert(`Error al eliminar libro: ${err.statusText}`);
            }
        } catch (error) {
            console.error("Error al eliminar libro:", error);
            alert('Error de red al eliminar libro.');
        }
    };

    const handleEditUserSubscription = async (e) => {
        e.preventDefault();
        try {
            const { err } = await api.put(`http://localhost:8080/api/users/update.php`, {
                body: { ...selectedUser, suscripcion: editUserSubscriptionForm }
            });
            if (!err) {
                handleClose();
                fetchUsers();
            } else {
                alert(`Error al editar suscripción: ${err.statusText}`);
            }
        } catch (error) {
            console.error("Error al editar suscripción:", error);
            alert('Error de red al editar suscripción.');
        }
    };

    const renderAdminSection = () => {
        switch (activeAdminTab) {
            case 'usuarios':
                return (
                    <Card className="shadow-sm mt-3 ">
                        <Card.Header className="fw-bold title-color-2">Listado de Usuarios</Card.Header>
                        <Card.Body>
                            {loadingUsers && <div className="text-center my-5"><Spinner animation="border" /><p>Cargando usuarios...</p></div>}
                            {errorUsers && <div className="text-center my-5 text-danger"><p>{errorUsers}</p><Button onClick={fetchUsers}>Reintentar</Button></div>}
                            {!loadingUsers && !errorUsers && (
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
                                        {users.map(user => (
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
                            )}
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
                            {loadingBooks && <div className="text-center my-5"><Spinner animation="border" /><p>Cargando libros...</p></div>}
                            {errorBooks && <div className="text-center my-5 text-danger"><p>{errorBooks}</p><Button onClick={fetchBooks}>Reintentar</Button></div>}
                            {!loadingBooks && !errorBooks && (
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
                                        {books.map(book => (
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
                            )}
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
                    <Form onSubmit={handleCreateBook}>
                        <Form.Group className="mb-3">
                            <Form.Label className="title-color-2">Título</Form.Label>
                            <Form.Control className="form-control-login" type="text" placeholder="Ingresa el título del libro" value={newBookForm.title} onChange={(e) => setNewBookForm({ ...newBookForm, title: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Autores</Form.Label>
                            <Form.Control className="form-control-login" type="text" placeholder="Ingresa el o los autores" value={newBookForm.authors} onChange={(e) => setNewBookForm({ ...newBookForm, authors: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Año de Creación</Form.Label>
                            <Form.Control className="form-control-login" type="number" placeholder="Ej: 2024" value={newBookForm.year} onChange={(e) => setNewBookForm({ ...newBookForm, year: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Género</Form.Label>
                            <Form.Control className="form-control-login" type="text" placeholder="Ingresa el género" value={newBookForm.genre} onChange={(e) => setNewBookForm({ ...newBookForm, genre: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Editorial</Form.Label>
                            <Form.Control className="form-control-login" type="text" placeholder="Ingresa la editorial" value={newBookForm.publisher} onChange={(e) => setNewBookForm({ ...newBookForm, publisher: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Páginas</Form.Label>
                            <Form.Control className="form-control-login" type="number" placeholder="Ej: 300" value={newBookForm.pages} onChange={(e) => setNewBookForm({ ...newBookForm, pages: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Sinopsis</Form.Label>
                            <Form.Control className="form-control-login" as="textarea" rows={3} placeholder="Ingresa la sinopsis del libro" value={newBookForm.synopsis} onChange={(e) => setNewBookForm({ ...newBookForm, synopsis: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Imagen URL</Form.Label>
                            <Form.Control className="form-control-login" type="text" placeholder="https://ejemplo.com/imagen.jpg" value={newBookForm.image} onChange={(e) => setNewBookForm({ ...newBookForm, image: e.target.value })} />
                        </Form.Group>
                        <Modal.Footer className='card-color'>
                            <Button variant="danger-primary" onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                Guardar Libro
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal para Editar Libro */}
            <Modal show={showBookEditModal} onHide={handleClose}>
                <Modal.Header className='card-color' closeButton>
                    <Modal.Title className="fw-bold title-color">Editar Libro</Modal.Title>
                </Modal.Header>
                <Modal.Body className='card-color'>
                    {selectedBook && (
                        <Form onSubmit={handleEditBook}>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Título</Form.Label>
                                <Form.Control className="form-control-login" type="text" value={editBookForm?.title || ''} onChange={(e) => setEditBookForm({ ...editBookForm, title: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Autores</Form.Label>
                                <Form.Control className="form-control-login" type="text" value={editBookForm?.authors || ''} onChange={(e) => setEditBookForm({ ...editBookForm, authors: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Año de Creación</Form.Label>
                                <Form.Control className="form-control-login" type="number" value={editBookForm?.year || ''} onChange={(e) => setEditBookForm({ ...editBookForm, year: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Género</Form.Label>
                                <Form.Control className="form-control-login" type="text" value={editBookForm?.genre || ''} onChange={(e) => setEditBookForm({ ...editBookForm, genre: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Editorial</Form.Label>
                                <Form.Control className="form-control-login" type="text" value={editBookForm?.publisher || ''} onChange={(e) => setEditBookForm({ ...editBookForm, publisher: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Páginas</Form.Label>
                                <Form.Control className="form-control-login" type="number" value={editBookForm?.pages || ''} onChange={(e) => setEditBookForm({ ...editBookForm, pages: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Sinopsis</Form.Label>
                                <Form.Control className="form-control-login" as="textarea" rows={3} value={editBookForm?.synopsis || ''} onChange={(e) => setEditBookForm({ ...editBookForm, synopsis: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Imagen URL</Form.Label>
                                <Form.Control className="form-control-login" type="text" value={editBookForm?.image || ''} onChange={(e) => setEditBookForm({ ...editBookForm, image: e.target.value })} />
                            </Form.Group>
                            <Modal.Footer className='card-color'>
                                <Button variant="danger-primary" onClick={handleClose}>
                                    Cancelar
                                </Button>
                                <Button variant="primary" type="submit">
                                    Guardar Cambios
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Modal.Body>
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
                    <Button variant="danger-primary" onClick={handleDeleteBook}>
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
                        <Form onSubmit={handleEditUserSubscription}>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Usuario</Form.Label>
                                <Form.Control className='form-control-login' type="text" value={`${selectedUser.nombre} ${selectedUser.apellido}`} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Estado de Suscripción</Form.Label>
                                <Form.Select className='form-control-login' value={editUserSubscriptionForm} onChange={(e) => setEditUserSubscriptionForm(e.target.value)}>
                                    <option value="Gratuita">Gratuita</option>
                                    <option value="Premium">Premium</option>
                                </Form.Select>
                            </Form.Group>
                            <Modal.Footer className='card-color'>
                                <Button variant="danger-primary" onClick={handleClose}>
                                    Cancelar
                                </Button>
                                <Button variant="primary" type="submit">
                                    Guardar Cambios
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdminDashboard;