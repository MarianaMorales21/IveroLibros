import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Container, Nav, Card, Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { helpHttp } from '../helpHttp';

const AdminDashboard = ({ user }) => {
    const [activeAdminTab, setActiveAdminTab] = useState('usuarios');

    const api = useMemo(() => helpHttp(), []);

    // ---------------- Usuarios ----------------
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [errorUsers, setErrorUsers] = useState(null);

    const [showUserEditModal, setShowUserEditModal] = useState(false);
    const [showUserDeleteModal, setShowUserDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editUserForm, setEditUserForm] = useState(null); // Nuevo estado para el formulario completo

    // ---------------- Libros ----------------
    const [books, setBooks] = useState([]);
    const [loadingBooks, setLoadingBooks] = useState(false);
    const [errorBooks, setErrorBooks] = useState(null);

    const [showBookAddModal, setShowBookAddModal] = useState(false);
    const [showBookEditModal, setShowBookEditModal] = useState(false);
    const [showBookDeleteModal, setShowBookDeleteModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [genreMap, setGenreMap] = useState({});
    const [newBookForm, setNewBookForm] = useState({
        titulo: '',
        autor: '',
        año: '',
        genero_id: '',
        editorial: '',
        paginas: '',
        sinopsis: '',
        linkCompra: '',
        portada: '',
        descripcion: '',
        usuario_id: '',
        estado: 'En revision',
    });
    const [editBookForm, setEditBookForm] = useState(null);
    const [genres, setGenres] = useState([]);

    const fetchGenres = useCallback(async () => {
        try {
            const response = await api.get('http://localhost:8000/genero');
            if (!response.err) {
                setGenres(response);
            }
        } catch (error) {
            console.error("Error al cargar los géneros:", error);
        }
    }, [api]);

    const fetchUsers = useCallback(async () => {
        setLoadingUsers(true);
        try {
            const response = await api.get('http://localhost:8000/usuarios');
            if (response.err) {
                setErrorUsers(response.err.statusText || 'Error al cargar usuarios');
            } else {
                setUsers(response);
                setErrorUsers(null);
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
            const response = await api.get('http://localhost:8000/libros');
            if (response.err) {
                setErrorBooks(response.err.statusText || 'Error al cargar libros');
            } else {
                setBooks(response);
                setErrorBooks(null);
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
            fetchGenres();
        }
    }, [activeAdminTab, fetchUsers, fetchBooks, fetchGenres]);

    useEffect(() => {
        if (genres.length > 0) {
            const map = genres.reduce((acc, genre) => {
                acc[genre.id] = genre.nombre;
                return acc;
            }, {});
            setGenreMap(map);
        }
    }, [genres]);


    const handleClose = () => {
        setShowBookAddModal(false);
        setShowBookEditModal(false);
        setShowBookDeleteModal(false);
        setShowUserEditModal(false);
        setShowUserDeleteModal(false);
        setSelectedBook(null);
        setSelectedUser(null);
        setNewBookForm({
            titulo: '', autor: '', año: '', genero_id: '', editorial: '', paginas: '', sinopsis: '', linkCompra: '', portada: '', descripcion: '', usuario_id: '', estado: 'En revison'
        });
        setEditBookForm(null);
        setEditUserForm(null);
    };

    const handleShowBookAdd = () => setShowBookAddModal(true);
    const handleShowBookEdit = (book) => {
        setSelectedBook(book);
        setEditBookForm({
            id: book.id,
            titulo: book.titulo,
            autor: book.autor,
            año: book.año,
            genero_id: book.genero_id,
            editorial: book.editorial,
            paginas: book.paginas,
            sinopsis: book.sinopsis,
            linkCompra: book.linkCompra,
            portada: book.portada,
            descripcion: book.descripcion,
            usuario_id: book.usuario_id,
            estado: book.estado
        });
        setShowBookEditModal(true);
    };

    const handleShowBookDelete = (book) => {
        setSelectedBook(book);
        setShowBookDeleteModal(true);
    };

    const handleShowUserEdit = (user) => {
        setSelectedUser(user);
        const formattedDate = user.fechaSuscripcion ? new Date(user.fechaSuscripcion).toISOString().split('T')[0] : '';
        setEditUserForm({
            suscripcion: user.suscripcion,
            rol: user.rol,
            fechaSuscripcion: formattedDate
        });
        setShowUserEditModal(true);
    };

    const handleShowUserDelete = (user) => {
        setSelectedUser(user);
        setShowUserDeleteModal(true);
    };

    const handleCreateBook = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('http://localhost:8000/libros', { body: newBookForm });
            if (response.err) {
                alert(`Error al crear libro: ${response.err.statusText}`);
            } else {
                handleClose();
                fetchBooks();
            }
        } catch (error) {
            console.error("Error al crear libro:", error);
            alert('Error de red al crear libro.');
        }
    };

    const handleEditBook = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`http://localhost:8000/libros/${editBookForm.id}`, { body: editBookForm });
            if (response.err) {
                alert(`Error al editar libro: ${response.err.statusText}`);
            } else {
                handleClose();
                fetchBooks();
            }
        } catch (error) {
            console.error("Error al editar libro:", error);
            alert('Error de red al editar libro.');
        }
    };

    const handleDeleteBook = async () => {
        try {
            const response = await api.del(`http://localhost:8000/libros/${selectedBook.id}`);
            if (response.err) {
                alert(`Error al eliminar libro: ${response.err.statusText}`);
            } else {
                handleClose();
                fetchBooks();
            }
        } catch (error) {
            console.error("Error al eliminar libro:", error);
            alert('Error de red al eliminar libro.');
        }
    };

    const handleEditUser = async (e) => {
        e.preventDefault();
        try {
            const bodyData = { ...selectedUser, ...editUserForm };
            const response = await api.put(`http://localhost:8000/usuarios/${selectedUser.id}`, {
                body: bodyData
            });
            if (response.err) {
                alert(`Error al editar usuario: ${response.err.statusText}`);
            } else {
                handleClose();
                fetchUsers();
            }
        } catch (error) {
            console.error("Error al editar usuario:", error);
            alert('Error de red al editar usuario.');
        }
    };

    const handleDeleteUser = async () => {
        try {
            const response = await api.del(`http://localhost:8000/usuarios/${selectedUser.id}`);
            if (response.err) {
                alert(`Error al eliminar usuario: ${response.err.statusText}`);
            } else {
                handleClose();
                fetchUsers();
            }
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            alert('Error de red al eliminar usuario.');
        }
    };

    useEffect(() => {
        if (showBookAddModal && user) {
            setNewBookForm(prevForm => ({
                ...prevForm,
                usuario_id: user.id
            }));
        }
    }, [showBookAddModal, user]);

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
                                            <th>Rol</th>
                                            <th>Suscripción</th>
                                            <th>Fecha Suscripción</th>
                                            <th>Email</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users?.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.nombre}</td>
                                                <td>{user.apellido}</td>
                                                <td>{user.rol}</td>
                                                <td>{user.suscripcion}</td>
                                                <td>{user.fechaSuscripcion}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <Button size="sm" className="me-2" onClick={() => handleShowUserEdit(user)}>
                                                        Editar
                                                    </Button>
                                                    <Button size="sm" variant="danger" onClick={() => handleShowUserDelete(user)}>
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
                                            <th>Año</th>
                                            <th>Género</th>
                                            <th>Editorial</th>
                                            <th>Páginas</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {books?.map(book => (
                                            <tr key={book.id}>
                                                <td>{book.id}</td>
                                                <td>{book.titulo}</td>
                                                <td>{book.autor}</td>
                                                <td>{book.año}</td>
                                                <td>{genreMap[book.genero_id] || 'Desconocido'}</td>
                                                <td>{book.editorial}</td>
                                                <td>{book.paginas}</td>
                                                <td>{book.estado}</td>
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
                                                        variant="danger"
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
                            <Form.Control className="form-control-login" type="text" placeholder="Ingresa el título del libro" value={newBookForm.titulo} onChange={(e) => setNewBookForm({ ...newBookForm, titulo: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Autor</Form.Label>
                            <Form.Control className="form-control-login" type="text" placeholder="Ingresa el o los autores" value={newBookForm.autor} onChange={(e) => setNewBookForm({ ...newBookForm, autor: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Año de Creación</Form.Label>
                            <Form.Control className="form-control-login" type="number" placeholder="Ej: 2024" value={newBookForm.año} onChange={(e) => setNewBookForm({ ...newBookForm, año: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Género</Form.Label>
                            <Form.Select className="form-control-login" value={newBookForm.genero_id} onChange={(e) => setNewBookForm({ ...newBookForm, genero_id: parseInt(e.target.value) })} required>
                                <option value="" disabled>Selecciona un género</option>
                                {genres.map(genre => (
                                    <option key={genre.id} value={genre.id}>{genre.nombre}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Editorial</Form.Label>
                            <Form.Control className="form-control-login" type="text" placeholder="Ingresa la editorial" value={newBookForm.editorial} onChange={(e) => setNewBookForm({ ...newBookForm, editorial: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Páginas</Form.Label>
                            <Form.Control className="form-control-login" type="number" placeholder="Ej: 300" value={newBookForm.paginas} onChange={(e) => setNewBookForm({ ...newBookForm, paginas: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Sinopsis</Form.Label>
                            <Form.Control className="form-control-login" as="textarea" rows={3} placeholder="Ingresa la sinopsis del libro" value={newBookForm.sinopsis} onChange={(e) => setNewBookForm({ ...newBookForm, sinopsis: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Link de Compra</Form.Label>
                            <Form.Control className="form-control-login" type="text" placeholder="https://ejemplo.com/compra" value={newBookForm.linkCompra} onChange={(e) => setNewBookForm({ ...newBookForm, linkCompra: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Descripción</Form.Label>
                            <Form.Control className="form-control-login" as="textarea" rows={3} placeholder="Ingresa una descripción del libro" value={newBookForm.descripcion} onChange={(e) => setNewBookForm({ ...newBookForm, descripcion: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>URL de Portada</Form.Label>
                            <Form.Control className="form-control-login" type="text" placeholder="https://ejemplo.com/portada.jpg" value={newBookForm.portada} onChange={(e) => setNewBookForm({ ...newBookForm, portada: e.target.value })} />
                        </Form.Group>
                        <Modal.Footer className='card-color'>
                            <Button variant="danger" onClick={handleClose}>
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
                                <Form.Control className="form-control-login" type="text" value={editBookForm?.titulo || ''} onChange={(e) => setEditBookForm({ ...editBookForm, titulo: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Autor</Form.Label>
                                <Form.Control className="form-control-login" type="text" value={editBookForm?.autor || ''} onChange={(e) => setEditBookForm({ ...editBookForm, autor: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Año de Creación</Form.Label>
                                <Form.Control className="form-control-login" type="number" value={editBookForm?.año || ''} onChange={(e) => setEditBookForm({ ...editBookForm, año: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Género</Form.Label>
                                <Form.Select className="form-control-login" value={editBookForm?.genero_id || ''} onChange={(e) => setEditBookForm({ ...editBookForm, genero_id: parseInt(e.target.value) })}>
                                    <option value="" disabled>Selecciona un género</option>
                                    {genres.map(genre => (
                                        <option key={genre.id} value={genre.id}>{genre.nombre}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Editorial</Form.Label>
                                <Form.Control className="form-control-login" type="text" value={editBookForm?.editorial || ''} onChange={(e) => setEditBookForm({ ...editBookForm, editorial: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Páginas</Form.Label>
                                <Form.Control className="form-control-login" type="number" value={editBookForm?.paginas || ''} onChange={(e) => setEditBookForm({ ...editBookForm, paginas: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Sinopsis</Form.Label>
                                <Form.Control className="form-control-login" as="textarea" rows={3} value={editBookForm?.sinopsis || ''} onChange={(e) => setEditBookForm({ ...editBookForm, sinopsis: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Link de Compra</Form.Label>
                                <Form.Control className="form-control-login" type="text" value={editBookForm?.linkCompra || ''} onChange={(e) => setEditBookForm({ ...editBookForm, linkCompra: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Descripción</Form.Label>
                                <Form.Control className="form-control-login" as="textarea" rows={3} value={editBookForm?.descripcion || ''} onChange={(e) => setEditBookForm({ ...editBookForm, descripcion: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>URL de Portada</Form.Label>
                                <Form.Control className="form-control-login" type="text" value={editBookForm?.portada || ''} onChange={(e) => setEditBookForm({ ...editBookForm, portada: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Estado</Form.Label>
                                <Form.Select className="form-control-login" value={editBookForm?.estado || ''} onChange={(e) => setEditBookForm({ ...editBookForm, estado: e.target.value })}>
                                    <option value="" disabled>Selecciona un género</option>
                                    <option value="Aprobado">Aprobado</option>
                                    <option value="En revision">En revision</option>
                                    <option value="Denegado">Denegado</option>
                                </Form.Select>
                            </Form.Group>
                            <Modal.Footer className='card-color'>
                                <Button variant="danger" onClick={handleClose}>
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
                        <p className='title-color-2'>¿Estás seguro de que deseas eliminar el libro "{selectedBook.titulo}"?</p>
                    )}
                </Modal.Body>
                <Modal.Footer className='card-color'>
                    <Button variant="primary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDeleteBook}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Editar Usuario */}
            <Modal show={showUserEditModal} onHide={handleClose}>
                <Modal.Header className='card-color' closeButton>
                    <Modal.Title className="fw-bold title-color">Editar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body className='card-color'>
                    {selectedUser && editUserForm && (
                        <Form onSubmit={handleEditUser}>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Usuario</Form.Label>
                                <Form.Control className='form-control-login' type="text" value={`${selectedUser.nombre} ${selectedUser.apellido}`} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Rol</Form.Label>
                                <Form.Select className='form-control-login' value={editUserForm.rol} onChange={(e) => setEditUserForm({ ...editUserForm, rol: e.target.value })}>
                                    <option value="Usuario">Usuario</option>
                                    <option value="Administrador">Administrador</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Estado de Suscripción</Form.Label>
                                <Form.Select className='form-control-login' value={editUserForm.suscripcion} onChange={(e) => setEditUserForm({ ...editUserForm, suscripcion: e.target.value })}>
                                    <option value="Gratuita">Gratuita</option>
                                    <option value="Premium">Premium</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='title-color-2'>Fecha de Suscripción</Form.Label>
                                <Form.Control
                                    className='form-control-login'
                                    type="date"
                                    value={editUserForm.fechaSuscripcion}
                                    onChange={(e) => setEditUserForm({ ...editUserForm, fechaSuscripcion: e.target.value })}
                                />
                            </Form.Group>
                            <Modal.Footer className='card-color'>
                                <Button variant="danger" onClick={handleClose}>
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

            {/* Modal para Eliminar Usuario */}
            <Modal show={showUserDeleteModal} onHide={handleClose}>
                <Modal.Header className='card-color' closeButton>
                    <Modal.Title className="fw-bold title-color">Eliminar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body className='card-color'>
                    {selectedUser && (
                        <p className='title-color-2'>
                            ¿Estás seguro de que deseas eliminar al usuario "{selectedUser.nombre} {selectedUser.apellido}"?
                        </p>
                    )}
                </Modal.Body>
                <Modal.Footer className='card-color'>
                    <Button variant="primary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDeleteUser}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default AdminDashboard;