// components/BookManagement.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { helpHttp } from '../helpHttp';
import AdminTable from '../components/table';
import ReusableModal from '../components/modal';

const BookManagement = ({ user }) => {
    const api = useMemo(() => helpHttp(), []);

    // Estados para Libros y Géneros
    const [books, setBooks] = useState([]);
    const [loadingBooks, setLoadingBooks] = useState(false);
    const [errorBooks, setErrorBooks] = useState(null);
    const [genres, setGenres] = useState([]);
    const [genreMap, setGenreMap] = useState({});

    // Estados para Modales
    const [showBookAddModal, setShowBookAddModal] = useState(false);
    const [showBookEditModal, setShowBookEditModal] = useState(false);
    const [showBookDeleteModal, setShowBookDeleteModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [newBookForm, setNewBookForm] = useState({
        titulo: '', autor: '', año: '', genero_id: '', editorial: '', paginas: '',
        sinopsis: '', linkCompra: '', portada: '', descripcion: '', usuario_id: user.id,
        estado: 'En revision',
    });
    const [editBookForm, setEditBookForm] = useState(null);
    // Nuevo estado para manejar el envío y mensajes de alerta
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const fetchBooks = useCallback(async () => {
        setLoadingBooks(true);
        try {
            const response = await api.get('https://www.iverolibros.xyz/api/libros');
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

    const fetchGenres = useCallback(async () => {
        try {
            const response = await api.get('https://www.iverolibros.xyz/api/genero');
            if (!response.err) {
                setGenres(response);
            }
        } catch (error) {
            console.error("Error al cargar los géneros:", error);
        }
    }, [api]);

    useEffect(() => {
        fetchBooks();
        fetchGenres();
    }, [fetchBooks, fetchGenres]);

    useEffect(() => {
        if (genres.length > 0) {
            const map = genres.reduce((acc, genre) => {
                acc[genre.id] = genre.nombre;
                return acc;
            }, {});
            setGenreMap(map);
        }
    }, [genres]);

    const handleClose = useCallback(() => {
        setShowBookAddModal(false);
        setShowBookEditModal(false);
        setShowBookDeleteModal(false);
        setSelectedBook(null);
        setNewBookForm({
            titulo: '', autor: '', año: '', genero_id: '', editorial: '', paginas: '',
            sinopsis: '', linkCompra: '', portada: '', descripcion: '', usuario_id: user.id, estado: 'En revision'
        });
        setEditBookForm(null);
        setMessage(null); // Resetear el mensaje de alerta
        setIsSubmitting(false); // Resetear el estado de envío
    }, [user]);

    // Lógica para manejar la creación de un nuevo libro
    const handleCreateBook = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        const url = 'https://www.iverolibros.xyz/api/libros';

        // Estructura los datos para que coincidan con lo que el backend espera
        const dataToSend = {
            ...newBookForm
        };

        try {
            const response = await api.post(url, { body: dataToSend });

            if (!response.err) {
                setMessage({ type: 'success', text: 'Libro agregado exitosamente.' });
                // Resetea el formulario y cierra el modal
                setNewBookForm({
                    titulo: '', autor: '', año: '', genero_id: '', editorial: '', paginas: '',
                    sinopsis: '', linkCompra: '', portada: '', descripcion: '', usuario_id: user.id, estado: 'En revision'
                });
                setShowBookAddModal(false);
                fetchBooks(); // Vuelve a cargar la lista de libros
            } else {
                setMessage({ type: 'danger', text: response.statusText || 'Ocurrió un error al agregar el libro.' });
            }
        } catch (error) {
            console.error("Error al crear libro:", error);
            setMessage({ type: 'danger', text: 'Error de conexión. Inténtalo de nuevo.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditBook = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`https://www.iverolibros.xyz/api/libros/${editBookForm.id}`, { body: editBookForm });
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

    const handleDeleteBook = async (e) => {
        e.preventDefault();
        try {
            const response = await api.del(`https://www.iverolibros.xyz/api/libros/${selectedBook.id}`);
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

    const bookColumns = [
        { key: 'id', header: 'ID' },
        { key: 'titulo', header: 'Título' },
        { key: 'autor', header: 'Autor' },
        { key: 'año', header: 'Año' },
        { key: 'genero_id', header: 'Género' },
        { key: 'editorial', header: 'Editorial' },
        { key: 'paginas', header: 'Páginas' },
        { key: 'estado', header: 'Estado' },
    ];
    const bookActions = [
        {
            label: 'Editar', handler: (book) => {
                setSelectedBook(book);
                setEditBookForm({ ...book });
                setShowBookEditModal(true);
                const originalBook = books.find(b => b.id === book.id);
                if (originalBook) {
                    setSelectedBook(originalBook);
                    setEditBookForm({
                        ...originalBook,
                        genero_id: originalBook.genero_id
                    });
                    setShowBookEditModal(true);
                }
            }
        },
        {
            label: 'Eliminar', handler: (book) => {
                setSelectedBook(book);
                setShowBookDeleteModal(true);
            }, variant: 'danger'
        },
    ];
    console.log(editBookForm)
    return (
        <>
            <Card className="shadow-sm mt-3">
                <Card.Header className="d-flex justify-content-between align-items-center fw-bold title-color-2">
                    Listado de Libros
                    <Button variant="outline-primary" size="sm" onClick={() => setShowBookAddModal(true)}>Agregar Libro</Button>
                </Card.Header>
                <Card.Body>
                    <AdminTable
                        data={books.map(book => ({
                            ...book,
                            genero_id: genreMap[book.genero_id] || 'Desconocido'
                        }))}
                        columns={bookColumns}
                        actions={bookActions}
                        loading={loadingBooks}
                        error={errorBooks}
                        onRetry={fetchBooks}
                        title="libros"
                    />
                </Card.Body>
            </Card>

            {/* Modal para Agregar Libro */}
            <ReusableModal
                show={showBookAddModal}
                onHide={handleClose}
                title="Agregar Nuevo Libro"
                onSubmit={handleCreateBook}
                submitLabel={isSubmitting ? 'Guardando...' : 'Guardar Libro'}
                isSubmitting={isSubmitting}
            >
                {message && <Alert variant={message.type}>{message.text}</Alert>}
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
            </ReusableModal>

            {/* Modal para Editar Libro */}
            <ReusableModal
                show={showBookEditModal}
                onHide={handleClose}
                title="Editar Libro"
                onSubmit={handleEditBook}
                submitLabel="Guardar Cambios"
            >
                {selectedBook && (
                    <>
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
                            <Form.Select className="form-control-login" value={editBookForm?.genero_id || ''} onChange={(e) => setEditBookForm({ ...editBookForm, genero_id: parseInt(e.target.value) })} required>
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
                                <option value="En revision">En revisión</option>
                                <option value="Aprobado">Aprobado</option>
                                <option value="Rechazado">Rechazado</option>
                            </Form.Select>
                        </Form.Group>
                    </>
                )}
            </ReusableModal>

            {/* Modal de Confirmación para Eliminar */}
            <ReusableModal
                show={showBookDeleteModal}
                onHide={handleClose}
                title="Confirmar Eliminación"
                onSubmit={handleDeleteBook}
                submitLabel="Eliminar Libro"
                variant="danger"
            >
                <p>¿Estás seguro de que quieres eliminar el libro {selectedBook?.titulo}?</p>
            </ReusableModal>
        </>
    );
};

export default BookManagement;