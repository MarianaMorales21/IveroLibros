// src/components/AdminTable.jsx
import React from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';

const AdminTable = ({ data, columns, actions, loading, error, onRetry, title }) => {
    return (
        <Table className="admin-table" responsive>
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col.header}</th>
                    ))}
                    {actions.length > 0 && <th>Acciones</th>}
                </tr>
            </thead>
            <tbody>
                {loading && (
                    <tr>
                        <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)} className="text-center">
                            <Spinner animation="border" className="mt-5" />
                            <p>Cargando {title}...</p>
                        </td>
                    </tr>
                )}
                {error && (
                    <tr>
                        <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)} className="text-center text-danger">
                            <Alert variant="danger" className="my-3">{error}</Alert>
                            {onRetry && <Button onClick={onRetry}>Reintentar</Button>}
                        </td>
                    </tr>
                )}
                {!loading && !error && data && data.length > 0 && data.map((item, itemIndex) => (
                    <tr key={item.id || itemIndex}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex}>{item[col.key]}</td>
                        ))}
                        {actions.length > 0 && (
                            <td>
                                {actions.map((action, actionIndex) => (
                                    <Button
                                        key={actionIndex}
                                        size="sm"
                                        className="me-2 margin-button"
                                        variant={action.variant || "primary"}
                                        onClick={() => action.handler(item)}
                                    >
                                        {action.label}
                                    </Button>
                                ))}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default AdminTable;