import React, { useState, useEffect } from "react";
import { Table, Spinner, Button, Image } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaProductos = ({
  productos = [],
  abrirModalEdicion,
  abrirModalEliminacion
}) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [productos]);

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="success" />
        <p className="mt-2">Cargando productos...</p>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="text-center text-muted my-4">
        <i className="bi bi-inbox" style={{ fontSize: "2rem" }}></i>
        <p className="mt-2">No hay productos registrados</p>
      </div>
    );
  }

  return (
    <div className="p-3 bg-white rounded shadow-sm">
      <Table striped bordered hover responsive className="mb-0 text-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id_producto}>
              <td>{producto.id_producto}</td>

              <td>
                {producto.url_imagen ? (
                  <Image
                    src={producto.url_imagen}
                    alt="producto"
                    width={50}
                    height={50}
                    rounded
                  />
                ) : (
                  <span className="text-muted">Sin imagen</span>
                )}
              </td>

              <td>{producto.nombre_producto}</td>
              <td>{producto.descripcion_producto}</td>
              <td>{producto.categoria_producto}</td>
              <td>${producto.precio_venta}</td>

              <td className="text-center">
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="m-1"
                  onClick={() => abrirModalEdicion(producto)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>

                <Button
                  variant="outline-danger"
                  size="sm"
                  className="m-1"
                  onClick={() => abrirModalEliminacion(producto)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TablaProductos;