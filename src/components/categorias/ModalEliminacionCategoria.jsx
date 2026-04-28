import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalEliminacionCategoria = ({
  mostrarModalEliminacion,
  setMostrarModalEliminacion,
  categoriaEliminar,
  eliminarCategoria
}) => {

  const [cargando, setCargando] = useState(false);

  const handleEliminar = async () => {
    if (cargando) return;

    try {
      setCargando(true);
      await eliminarCategoria();
    } catch (err) {
      console.error("Error al eliminar:", err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Modal
      show={mostrarModalEliminacion}
      onHide={() => setMostrarModalEliminacion(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Categoría</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        <i className="bi bi-exclamation-triangle text-danger" style={{ fontSize: "3rem" }}></i>

        <p className="mt-3">
          ¿Estás seguro que deseas eliminar la categoría:
        </p>

        <strong>{categoriaEliminar?.nombre_categoria}</strong>

        <p className="text-muted mt-2">
          Esta acción no se puede deshacer.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setMostrarModalEliminacion(false)}
        >
          Cancelar
        </Button>

        <Button
          variant="danger"
          onClick={handleEliminar}
          disabled={cargando}
        >
          {cargando ? "Eliminando..." : "Eliminar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionCategoria;