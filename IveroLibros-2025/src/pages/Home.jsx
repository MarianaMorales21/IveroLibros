import React from 'react';
import '../styles/Home.css';

function Home() {
    return (
        <>

            <div className="row g-4 mb-5">
                <div className="col-md-6">
                    <div className="row g-3 justify-content-center">
                        <div className="container text-center text-lg-start separacion">
                            <div className="mb-6">
                                <div className="d-inline-flex align-items-center mb-4 ">
                                    <i class="bi bi-book title-color"></i>
                                    <span className="ms-2 title-color">Comunidad Literaria</span>
                                </div>
                                <h1 className="display-4 fw-bold mb-4 title-color-2">
                                    Conecta con la <br />
                                    <span className="d-block title-color">Comunidad Literaria</span>
                                    más Vibrante
                                </h1>
                                <p className="lead text-muted mb-4 max-w-2xl mx-auto text-size">
                                    Únete a IveroLibros, donde autores y lectores se encuentran para compartir pasiones,
                                    descubrir nuevos títulos y promocionar obras literarias en un ambiente acogedor y profesional.
                                </p>
                            </div>
                        </div>
                        {/* Primera fila */}
                        <div className="col-6 d-flex align-items-center gap-2 justify-content-center">
                            <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary bg-opacity-10 ">
                                <i className=" bi-people icon-sm icon-color"></i>
                            </div>
                            <span className="small fw-medium text-body text-center">Comunidad activa de lectores</span>
                        </div>
                        <div className="col-6 d-flex align-items-center gap-2 justify-content-center">
                            <div className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-circle bg-primary bg-opacity-10">
                                <i className="bi bi-star icon-sm icon-color"></i>
                            </div>
                            <span className="small fw-medium text-body text-center">Promoción de libros desde $2/mes</span>
                        </div>
                        {/* Segunda fila */}
                        <div className="col-6 d-flex align-items-center gap-2 justify-content-center">
                            <div className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-circle bg-primary bg-opacity-10">
                                <i className="bi bi-chat-dots icon-sm icon-color"></i>
                            </div>
                            <span className="small fw-medium text-body text-center">Foros de discusión literaria</span>
                        </div>
                        <div className="col-6 d-flex align-items-center gap-2 justify-content-center">
                            <div className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-circle bg-primary bg-opacity-10 ">
                                <i className="bi bi-newspaper icon-sm icon-color"></i>
                            </div>
                            <span className="small fw-medium text-body text-center">Noticias y eventos literarios</span>
                        </div>
                    </div>
                    <div className="text-center text-lg-start mt-4 bottom-space">
                        <a href="#" className="btn btn-lg px-4 me-sm-3 bottom-color1">Explora el foro</a>
                        <a href="#" className="btn btn-outline-primary btn-lg px-4 bottom-color2">Promociona tu libro</a>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="position-relative img-separation">
                        <div className="position-absolute top-0 start-0 d-flex align-items-center justify-content-center">
                            <img src="https://media.istockphoto.com/id/912611506/es/foto/libros.jpg?s=612x612&w=0&k=20&c=eP0DcwcyAs-0Ow6M7IqtN_4vhyYzvBaaJ8yhrl9Ehek=" alt="Imagen de ejemplo" className="img-fluid rounded" />
                        </div>
                    </div>
                </div>
            </div>






        </>
    );
}

export default Home;
