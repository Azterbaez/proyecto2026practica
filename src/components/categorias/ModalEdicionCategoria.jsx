import React, { useState } from "react";
<<<<<<< HEAD
import { Modal, Form, Button } from "react-bootstrap";
=======
import { Modal, Button, Form } from "react-bootstrap";
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe

const ModalEdicionCategoria = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  categoriaEditar,
  manejoCambioInputEdicion,
<<<<<<< HEAD
  actualizarCategoria,
=======
  actualizarCategoria
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
}) => {

  const [deshabilitado, setDeshabilitado] = useState(false);

  const handleActualizar = async () => {
    if (deshabilitado) return;
<<<<<<< HEAD
    setDeshabilitado(true);
    await actualizarCategoria();
    setDeshabilitado(false);
=======

    if (
      !categoriaEditar.nombre_categoria.trim() ||
      !categoriaEditar.descripcion_categoria.trim()
    ) {
      alert("Debe llenar todos los campos");
      return;
    }

    try {
      setDeshabilitado(true);
      await actualizarCategoria();
      setMostrarModalEdicion(false);
    } catch (err) {
      console.error("Error al actualizar categoría:", err.message);
    } finally {
      setDeshabilitado(false);
    }
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
  };

  return (
    <Modal
      show={mostrarModalEdicion}
      onHide={() => setMostrarModalEdicion(false)}
      backdrop="static"
      keyboard={false}
      centered
<<<<<<< HEAD
      contentClassName="modal-app"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-pencil-square"></i>
          Editar Categoría
        </Modal.Title>
=======
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Categoría</Modal.Title>
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre_categoria"
              value={categoriaEditar.nombre_categoria}
              onChange={manejoCambioInputEdicion}
<<<<<<< HEAD
              placeholder="Ingresa el nombre"
=======
              placeholder="Ingresar el nombre"
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion_categoria"
              value={categoriaEditar.descripcion_categoria}
              onChange={manejoCambioInputEdicion}
<<<<<<< HEAD
              placeholder="Ingresa la descripción"
=======
              placeholder="Ingresar la descripción"
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setMostrarModalEdicion(false)}
        >
          Cancelar
        </Button>

        <Button
          variant="primary"
          onClick={handleActualizar}
          disabled={
            categoriaEditar.nombre_categoria.trim() === "" ||
<<<<<<< HEAD
            categoriaEditar.descripcion_categoria.trim() === "" ||
=======
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
            deshabilitado
          }
        >
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionCategoria;