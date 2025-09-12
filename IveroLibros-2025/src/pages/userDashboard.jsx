import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, Form, Alert } from 'react-bootstrap';
import { helpHttp } from '../helpHttp';
import AdminTable from '../components/table';
import ReusableModal from '../components/modal';

const UserManagement = () => {
    // Declaraciones de estado
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [errorUsers, setErrorUsers] = useState(null);

    const [showUserEditModal, setShowUserEditModal] = useState(false);
    const [showUserDeleteModal, setShowUserDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editUserForm, setEditUserForm] = useState(null);

    const api = useMemo(() => helpHttp(), []);

    const fetchUsers = useCallback(async () => {
        setLoadingUsers(true);
        try {
            const response = await api.get('https://www.iverolibros.xyz/api/usuarios');
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

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Lógica para cerrar modales y restablecer el estado
    const handleClose = useCallback(() => {
        setShowUserEditModal(false);
        setShowUserDeleteModal(false);
        setSelectedUser(null);
        setEditUserForm(null);
    }, []);

    const handleEditUser = useCallback(async (e) => {
        e.preventDefault();
        try {
            const bodyData = { ...selectedUser, ...editUserForm };

            if (bodyData.fechaSuscripcion === '') {
                bodyData.fechaSuscripcion = null;
            }

            const response = await api.put(`https://www.iverolibros.xyz/api/usuarios/${selectedUser.id}`, { body: bodyData });
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
    }, [api, selectedUser, editUserForm, handleClose, fetchUsers]);

    const handleDeleteUser = useCallback(async (e) => {
        e.preventDefault();
        try {
            const response = await api.del(`https://www.iverolibros.xyz/api/usuarios/${selectedUser.id}`);
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
    }, [api, selectedUser, handleClose, fetchUsers]);

    const handleShowUserEdit = useCallback((user) => {
        setSelectedUser(user);
        const fecha = user.fechaSuscripcion;
        let formattedDate = '';
        if (fecha && typeof fecha === 'string' && fecha.trim() !== '') {
            const dateObj = new Date(fecha);
            if (!isNaN(dateObj.getTime())) {
                formattedDate = dateObj.toISOString().split('T')[0];
            }
        }
        setEditUserForm({
            suscripcion: user.suscripcion, rol: user.rol, fechaSuscripcion: formattedDate
        });
        setShowUserEditModal(true);
    }, []);

    const handleShowUserDelete = useCallback((user) => {
        setSelectedUser(user);
        setShowUserDeleteModal(true);
    }, []);

    const userColumns = [
        { key: 'id', header: 'ID' },
        { key: 'nombre', header: 'Nombre' },
        { key: 'apellido', header: 'Apellido' },
        { key: 'rol', header: 'Rol' },
        { key: 'suscripcion', header: 'Suscripción' },
        { key: 'fechaSuscripcion', header: 'Fecha Suscripción' },
        { key: 'email', header: 'Email' },
    ];

    const userActions = [
        { label: 'Editar', handler: handleShowUserEdit },
        { label: 'Eliminar', handler: handleShowUserDelete, variant: 'danger' },
    ];

    return (
        <>
            <Card className="shadow-sm mt-3 ">
                <Card.Header className="fw-bold title-color-2">Listado de Usuarios</Card.Header>
                <Card.Body>
                    <AdminTable
                        data={users}
                        columns={userColumns}
                        actions={userActions}
                        loading={loadingUsers}
                        error={errorUsers}
                        onRetry={fetchUsers}
                        title="usuarios"
                    />
                </Card.Body>
            </Card>

            {/* Modals for User Management */}
            {selectedUser && (
                <>
                    <ReusableModal
                        show={showUserEditModal}
                        onHide={handleClose}
                        title={`Editar Usuario: ${selectedUser.nombre} ${selectedUser.apellido}`}
                        onSubmit={handleEditUser}
                        submitLabel="Guardar Cambios"
                    >
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Usuario</Form.Label>
                            <Form.Control className='form-control-login' type="text" value={`${selectedUser.nombre} ${selectedUser.apellido}`} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Rol</Form.Label>
                            <Form.Select className='form-control-login' value={editUserForm?.rol || ''} onChange={(e) => setEditUserForm({ ...editUserForm, rol: e.target.value })}>
                                <option value="Usuario">Usuario</option>
                                <option value="Administrador">Administrador</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Estado de Suscripción</Form.Label>
                            <Form.Select className='form-control-login' value={editUserForm?.suscripcion || ''} onChange={(e) => setEditUserForm({ ...editUserForm, suscripcion: e.target.value })}>
                                <option value="Gratuita">Gratuita</option>
                                <option value="Premium">Premium</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='title-color-2'>Fecha de Suscripción</Form.Label>
                            <Form.Control
                                className='form-control-login'
                                type="date"
                                value={editUserForm?.fechaSuscripcion || ''}
                                onChange={(e) => setEditUserForm({ ...editUserForm, fechaSuscripcion: e.target.value })}
                            />
                        </Form.Group>
                    </ReusableModal>
                    <ReusableModal
                        show={showUserDeleteModal}
                        onHide={handleClose}
                        title="Eliminar Usuario"
                        onSubmit={handleDeleteUser}
                        submitLabel="Eliminar"
                        submitVariant="danger"
                    >
                        <p className='title-color-2'>¿Estás seguro de que deseas eliminar al usuario "{selectedUser.nombre} {selectedUser.apellido}"?</p>
                    </ReusableModal>
                </>
            )}
        </>
    );
};

export default UserManagement;