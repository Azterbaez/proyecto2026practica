import React, { useState, useEffect } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaCategoria = ({
  categorias = [],
  abrirModalEdicion,
  abrirModalEliminacion
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
    <Table striped borderless hover responsive size="sm">
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
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaCategoria;