<<<<<<< HEAD
import React from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaCategorias = ({
  categorias,
  abrirModalEdicion,
  abrirModalEliminacion,
  generarPDFCategoria,
  copiarCategoria,
}) => {
  return (
    <div className="tabla-contenedor">
      <Table hover responsive className="tabla-app mb-0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th className="d-none d-md-table-cell">Descripcion</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id_categoria}>
              <td className="fw-semibold">#{categoria.id_categoria}</td>
              <td className="fw-semibold">{categoria.nombre_categoria}</td>
              <td className="d-none d-md-table-cell text-secondary">
                {categoria.descripcion_categoria || "-"}
              </td>
              <td className="text-center">
                <Button
                  size="sm"
                  className="btn-accion-tabla btn-accion-tabla--editar me-1"
                  onClick={() => abrirModalEdicion(categoria)}
                  aria-label="Editar"
                >
                  <i className="bi bi-pencil"></i>
                </Button>

                <Button
                  size="sm"
                  className="btn-accion-tabla btn-accion-tabla--eliminar me-1"
                  onClick={() => abrirModalEliminacion(categoria)}
                  aria-label="Eliminar"
                >
                  <i className="bi bi-trash"></i>
                </Button>

                <Button
                  variant="outline-primary"
                  size="sm"
                  className="btn-accion-tabla"
                  onClick={() => generarPDFCategoria(categoria)}
                  aria-label="Generar PDF"
                >
                  <i className="bi bi-file-earmark-pdf"></i>
                </Button>

                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="btn-accion-tabla ms-1"
                  onClick={() => copiarCategoria(categoria)}
                  aria-label="Copiar"
                >
                  <i className="bi bi-clipboard"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TablaCategorias;
=======
import React, { useState, useEffect } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaCategoria = ({
  categorias = [],
  abrirModalEdicion,
  abrirModalEliminacion,
  generarPDFCategoria,
  copiarCategoria
  
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Siempre deja de cargar cuando llegan datos (aunque sea array vacío)
    setLoading(false);
    
  }, [categorias]);

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="success" />
        <p className="mt-2">Cargando categorías...</p>
      </div>
    );
  }
  // QR


  // 🟡 Caso sin datos
  if (categorias.length === 0) {
    return (
      <div className="text-center text-muted my-4">
        <i className="bi bi-inbox" style={{ fontSize: "2rem" }}></i>
        <p className="mt-2">No hay categorías registradas</p>
      </div>
    );
  }

  return (
    <Table
      striped
      bordered
      hover
      className="bg-white text-dark shadow-sm rounded"
    >
      <div className="p-3 bg-white rounded shadow-sm">
        <Table striped hover responsive className="mb-0 text-dark">
          ...
        </Table>
      </div>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map((categoria) => (
          <tr key={categoria.id_categoria}>
            <td>{categoria.id_categoria}</td>
            <td>{categoria.nombre_categoria}</td>
            <td>{categoria.descripcion_categoria}</td>
            <td className="text-center">
              <Button
                variant="outline-warning"
                size="sm"
                className="m-1"
                onClick={() => abrirModalEdicion(categoria)}
              >
                <i className="bi bi-pencil"></i>
              </Button>

              <Button
                variant="outline-danger"
                size="sm"
                className="m-1"
                onClick={() => abrirModalEliminacion(categoria)}
              >
                <i className="bi bi-trash"></i>
              </Button>

               <Button
    variant="outline-success"
    size="sm"
    className="m-1"
    onClick={() => copiarCategoria(categoria)}
    title="Copiar al portapapeles"
>
    <i className="bi bi-clipboard"></i>
</Button>
              <Button
                variant="outline-primary"
                size="sm"
                className="m-1"
                onClick={() => generarPDFCategoria(categoria)}
              >
                <i className="bi bi-file-earmark-pdf"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaCategoria;
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
