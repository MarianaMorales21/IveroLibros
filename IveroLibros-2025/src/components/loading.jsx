import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p className="mt-2">Cargando...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;