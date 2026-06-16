import React, { useState } from "react";
<<<<<<< HEAD
import { Modal, Form, Button } from "react-bootstrap";
=======
import { Modal, Button, Form } from "react-bootstrap";
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe

const ModalRegistroCategoria = ({
  mostrarModal,
  setMostrarModal,
  nuevaCategoria,
  manejoCambioInput,
  agregarCategoria,
}) => {
  const [deshabilitado, setDeshabilitado] = useState(false);

<<<<<<< HEAD
  const heandRegistrar = async () => {
=======
  const handleRegistrar = async () => {
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
    if (deshabilitado) return;

    setDeshabilitado(true);
    await agregarCategoria();
    setDeshabilitado(false);
  };

  return (
    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      backdrop="static"
      keyboard={false}
      centered
<<<<<<< HEAD
      contentClassName="modal-app"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-plus-circle-fill"></i>
          Agregar Categoría
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
=======
    >
      <Modal.Header closeButton>
        <Modal.Title>Agregar Categoría</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Nombre de la categoría */}
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre_categoria"
              value={nuevaCategoria.nombre_categoria}
              onChange={manejoCambioInput}
<<<<<<< HEAD
              placeholder="Ingresa el nombre"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
=======
              placeholder="Ingresa el nombre de la categoría"
            />
          </Form.Group>

          {/* Descripción */}
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
              name="descripcion_categoria"
              value={nuevaCategoria.descripcion_categoria}
              onChange={manejoCambioInput}
              placeholder="Ingresa la descripción"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
<<<<<<< HEAD
=======

>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
<<<<<<< HEAD
        <Button
          variant="primary"
          onClick={heandRegistrar}
          disabled={nuevaCategoria.nombre_categoria.trim() === "" || deshabilitado}
=======

        <Button
          variant="primary"
          onClick={handleRegistrar}
          disabled={
            nuevaCategoria.nombre_categoria.trim() === "" ||
            nuevaCategoria.descripcion_categoria.trim() === "" ||
            deshabilitado
          }
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCategoria;