import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert
} from "react-bootstrap";

import { supabase } from "../database/supabaseconfig";

import TarjetaCliente from "../components/cliente/TarjetaCliente";
import ModalRegistroCliente from "../components/cliente/ModalRegistroCliente";
import ModalEliminacionCliente from "../components/cliente/ModalEliminacionCliente";
import ModalEdicionCliente from "../components/cliente/ModalEdicionCliente";
import TablaClientes from "../components/cliente/TablaCliente";

=======
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { supabase } from "../assets/database/supabaseconfig";
import TarjetaCliente from "../components/clientes/TarjetaCliente";
import ModalRegistroCliente from "../components/clientes/ModalRegistroCliente";
import ModalEliminacionCliente from "../components/clientes/ModalEliminacionCliente";
import ModalEdicionCliente from "../components/clientes/ModalEdicionCliente";
import TablaClientes from "../components/clientes/TablaClientes";
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
import NotificacionOperacion from "../components/NotificacionOperacion";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import Paginacion from "../components/ordenamiento/Paginacion";

<<<<<<< HEAD
const Clientes = () => {

  const [toast, setToast] = useState({
    mostrar: false,
    mensaje: "",
    tipo: ""
  });

  const [mostrarModal, setMostrarModal] =
    useState(false);

  const [nuevoCliente, setNuevoCliente] =
    useState({
      nombre_cliente: "",
      apellido_cliente: "",
      celular: "",
    });

  const [clientes, setClientes] =
    useState([]);

  const [
    clientesFiltrados,
    setClientesFiltrados
  ] = useState([]);

  const [cargando, setCargando] =
    useState(true);

  const [
    mostrarModalEliminacion,
    setMostrarModalEliminacion
  ] = useState(false);

  const [
    clienteAEliminar,
    setClienteAEliminar
  ] = useState(null);

  const [
    mostrarModalEdicion,
    setMostrarModalEdicion
  ] = useState(false);

  const [
    textoBusqueda,
    setTextoBusqueda
  ] = useState("");

  const [
    registrosPorPagina,
    establecerRegistrosPorPagina
  ] = useState(5);

  const [
    paginaActual,
    establecerPaginaActual
  ] = useState(1);

  const [clienteEditar, setClienteEditar] =
    useState({
      id_cliente: "",
      nombre_cliente: "",
      apellido_cliente: "",
      celular: "",
    });

  const clientesPaginados =
    clientesFiltrados.slice(
      (paginaActual - 1) * registrosPorPagina,
      paginaActual * registrosPorPagina
    );

  // =========================
  // BUSQUEDA
  // =========================

  const manejarBusqueda = (e) => {

    setTextoBusqueda(e.target.value);

  };

  useEffect(() => {

    if (!textoBusqueda.trim()) {

      setClientesFiltrados(clientes);

    } else {

      const textoLower =
        textoBusqueda.toLowerCase().trim();

      const filtrados = clientes.filter(
        (cli) =>
          cli.nombre_cliente
            ?.toLowerCase()
            .includes(textoLower) ||

          cli.apellido_cliente
            ?.toLowerCase()
            .includes(textoLower) ||

          cli.celular
            ?.toLowerCase()
            .includes(textoLower)
      );

      setClientesFiltrados(filtrados);

    }

  }, [textoBusqueda, clientes]);

  // =========================
  // MODALES
  // =========================

  const abrirModalEdicion = (cliente) => {

=======

const Clientes = () => {
  const [toast, setToast] = useState({ mostrar: false, mensaje: "", tipo: "" });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre_cliente: "",
    apellido_cliente: "",
    celular: "",
  });
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [clienteAEliminar, setClienteAEliminar] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [registrosPorPagina, establecerRegistrosPorPagina] = useState(5);
  const [paginaActual, establecerPaginaActual] = useState(1);
  const [clienteEditar, setClienteEditar] = useState({
    id_cliente: "",
    nombre_cliente: "",
    apellido_cliente: "",
    celular: "",
  });

  const clientesPaginados = clientesFiltrados.slice(
    (paginaActual - 1) * registrosPorPagina,
    paginaActual * registrosPorPagina
  );

  const manejarBusqueda = (e) => {
    setTextoBusqueda(e.target.value);
  };

  useEffect(() => {
    if (!textoBusqueda.trim()) {
      setClientesFiltrados(clientes);
    } else {
      const textoLower = textoBusqueda.toLowerCase().trim();
      const filtrados = clientes.filter(
        (cli) =>
          cli.nombre_cliente?.toLowerCase().includes(textoLower) ||
          cli.apellido_cliente?.toLowerCase().includes(textoLower) ||
          cli.celular?.toLowerCase().includes(textoLower)
      );
      setClientesFiltrados(filtrados);
    }
  }, [textoBusqueda, clientes]);

  const abrirModalEdicion = (cliente) => {
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
    setClienteEditar({
      id_cliente: cliente.id_cliente,
      nombre_cliente: cliente.nombre_cliente,
      apellido_cliente: cliente.apellido_cliente,
      celular: cliente.celular,
    });
<<<<<<< HEAD

    setMostrarModalEdicion(true);

  };

  const abrirModalEliminacion = (cliente) => {

    setClienteAEliminar(cliente);
    setMostrarModalEliminacion(true);

  };

  // =========================
  // INPUTS
  // =========================

  const manejoCambioInput = (e) => {

    const { name, value } = e.target;

=======
    setMostrarModalEdicion(true);
  };

  const abrirModalEliminacion = (cliente) => {
    setClienteAEliminar(cliente);
    setMostrarModalEliminacion(true);
  };

  const manejoCambioInput = (e) => {
    const { name, value } = e.target;
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
    setNuevoCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
<<<<<<< HEAD

  };

  const manejoCambioInputEdicion = (e) => {

    const { name, value } = e.target;

=======
  };

  const manejoCambioInputEdicion = (e) => {
    const { name, value } = e.target;
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
    setClienteEditar((prev) => ({
      ...prev,
      [name]: value,
    }));
<<<<<<< HEAD

  };

  // =========================
  // AGREGAR CLIENTE
  // =========================

  const agregarCliente = async () => {

    try {

      if (
        !nuevoCliente.nombre_cliente.trim() ||
        !nuevoCliente.celular.trim()
      ) {

        setToast({
          mostrar: true,
          mensaje:
            "Debe llenar nombre y celular.",
          tipo: "advertencia",
        });

        return;
      }

      const { error } =
        await supabase
          .from("clientes")
          .insert([
            {
              nombre_cliente:
                nuevoCliente.nombre_cliente,

              apellido_cliente:
                nuevoCliente.apellido_cliente,

              celular:
                nuevoCliente.celular,
            },
          ]);

      if (error) {

        setToast({
          mostrar: true,
          mensaje:
            "Error al registrar cliente.",
          tipo: "error",
        });

=======
  };

  const agregarCliente = async () => {
    try {
      if (!nuevoCliente.nombre_cliente.trim() || !nuevoCliente.celular.trim()) {
        setToast({
          mostrar: true,
          mensaje: "Debe llenar nombre y celular.",
          tipo: "advertencia",
        });
        return;
      }

      const { error } = await supabase.from("clientes").insert([
        {
          nombre_cliente: nuevoCliente.nombre_cliente,
          apellido_cliente: nuevoCliente.apellido_cliente,
          celular: nuevoCliente.celular,
        },
      ]);

      if (error) {
        console.error("Error al agregar cliente:", error.message);
        setToast({
          mostrar: true,
          mensaje: "Error al registrar cliente.",
          tipo: "error",
        });
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
        return;
      }

      setToast({
        mostrar: true,
<<<<<<< HEAD
        mensaje:
          "Cliente registrado exitosamente.",
        tipo: "exito",
      });

      setNuevoCliente({
        nombre_cliente: "",
        apellido_cliente: "",
        celular: "",
      });

      setMostrarModal(false);

      await cargarClientes();

    } catch (err) {
      console.error("Error al registrar cliente:", err);

      setToast({
        mostrar: true,
        mensaje:
          "Error inesperado al registrar cliente.",
        tipo: "error",
      });

    }
  };

  // =========================
  // CARGAR CLIENTES
  // =========================

  const cargarClientes = async () => {

    try {

      setCargando(true);

      const { data, error } =
        await supabase
          .from("clientes")
          .select("*")
          .order("id_cliente", {
            ascending: true,
          });

      if (error) {

        setToast({
          mostrar: true,
          mensaje:
            "Error al cargar clientes.",
          tipo: "error",
        });

        return;
      }

      setClientes(data || []);

    } catch (err) {
      console.error("Error al cargar clientes:", err);

      setToast({
        mostrar: true,
        mensaje:
          "Error inesperado al cargar clientes.",
        tipo: "error",
      });

    } finally {

      setCargando(false);

=======
        mensaje: `Cliente "${nuevoCliente.nombre_cliente} ${nuevoCliente.apellido_cliente}" registrado exitosamente.`,
        tipo: "exito",
      });

      setNuevoCliente({ nombre_cliente: "", apellido_cliente: "", celular: "" });
      setMostrarModal(false);
      await cargarClientes();
    } catch (err) {
      console.error("Excepción al agregar cliente:", err.message);
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al registrar cliente.",
        tipo: "error",
      });
    }
  };

  const cargarClientes = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase
        .from("clientes")
        .select("*")
        .order("id_cliente", { ascending: true });

      if (error) {
        console.error("Error al cargar clientes:", error.message);
        setToast({
          mostrar: true,
          mensaje: "Error al cargar clientes.",
          tipo: "error",
        });
        return;
      }
      setClientes(data || []);
    } catch (err) {
      console.error("Excepción al cargar clientes:", err.message);
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al cargar clientes.",
        tipo: "error",
      });
    } finally {
      setCargando(false);
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
    }
  };

  useEffect(() => {
<<<<<<< HEAD

    cargarClientes();

  }, []);

  // =========================
  // ELIMINAR
  // =========================

  const eliminarCliente = async () => {

    if (!clienteAEliminar) return;

    try {

      setMostrarModalEliminacion(false);

      const { error } =
        await supabase
          .from("clientes")
          .delete()
          .eq(
            "id_cliente",
            clienteAEliminar.id_cliente
          );

      if (error) {

        setToast({
          mostrar: true,
          mensaje:
            "Error al eliminar cliente.",
          tipo: "error",
        });

=======
    cargarClientes();
  }, []);

  const eliminarCliente = async () => {
    if (!clienteAEliminar) return;
    try {
      setMostrarModalEliminacion(false);
      const { error } = await supabase
        .from("clientes")
        .delete()
        .eq("id_cliente", clienteAEliminar.id_cliente);

      if (error) {
        setToast({
          mostrar: true,
          mensaje: `Error al eliminar el cliente.`,
          tipo: "error",
        });
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
        return;
      }

      await cargarClientes();
<<<<<<< HEAD

      setToast({
        mostrar: true,
        mensaje:
          "Cliente eliminado exitosamente.",
        tipo: "exito",
      });

    } catch (err) {
      console.error("Error al eliminar cliente:", err);

      setToast({
        mostrar: true,
        mensaje:
          "Error inesperado al eliminar cliente.",
        tipo: "error",
      });

    }
  };

  // =========================
  // ACTUALIZAR
  // =========================

  const actualizarCliente = async () => {

    try {

      if (
        !clienteEditar.nombre_cliente.trim() ||
        !clienteEditar.celular.trim()
      ) {

        setToast({
          mostrar: true,
          mensaje:
            "Debe llenar nombre y celular.",
          tipo: "advertencia",
        });

=======
      setToast({
        mostrar: true,
        mensaje: `Cliente eliminado exitosamente.`,
        tipo: "exito",
      });
    } catch (err) {
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al eliminar cliente.",
        tipo: "error",
      });
    }
  };

  const actualizarCliente = async () => {
    try {
      if (!clienteEditar.nombre_cliente.trim() || !clienteEditar.celular.trim()) {
        setToast({
          mostrar: true,
          mensaje: "Debe llenar nombre y celular.",
          tipo: "advertencia",
        });
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
        return;
      }

      setMostrarModalEdicion(false);
<<<<<<< HEAD

      const { error } =
        await supabase
          .from("clientes")
          .update({
            nombre_cliente:
              clienteEditar.nombre_cliente,

            apellido_cliente:
              clienteEditar.apellido_cliente,

            celular:
              clienteEditar.celular,
          })

          .eq(
            "id_cliente",
            clienteEditar.id_cliente
          );

      if (error) {

        setToast({
          mostrar: true,
          mensaje:
            "Error al actualizar cliente.",
          tipo: "error",
        });

=======
      const { error } = await supabase
        .from("clientes")
        .update({
          nombre_cliente: clienteEditar.nombre_cliente,
          apellido_cliente: clienteEditar.apellido_cliente,
          celular: clienteEditar.celular,
        })
        .eq("id_cliente", clienteEditar.id_cliente);

      if (error) {
        setToast({
          mostrar: true,
          mensaje: "Error al actualizar cliente.",
          tipo: "error",
        });
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
        return;
      }

      await cargarClientes();
<<<<<<< HEAD

      setToast({
        mostrar: true,
        mensaje:
          "Cliente actualizado exitosamente.",
        tipo: "exito",
      });

    } catch (err) {
      console.error("Error al actualizar cliente:", err);

      setToast({
        mostrar: true,
        mensaje:
          "Error inesperado al actualizar cliente.",
        tipo: "error",
      });

    }
  };

  // =========================
  // RETURN
  // =========================

  return (
    <Container fluid className="vista-contenedor px-0">
      <div className="vista-panel">
          <header className="vista-encabezado">
            <div className="vista-encabezado__titulo-grupo">
              <div className="vista-encabezado__icono" aria-hidden="true">
                <i className="bi bi-people-fill"></i>
              </div>
              <div>
                <h2>Clientes</h2>
                <p className="vista-encabezado__subtitulo">
                  Gestión y administración de clientes
                </p>
              </div>
            </div>
            <div className="vista-encabezado__acciones">
              <Button
                variant="primary"
                onClick={() => setMostrarModal(true)}
              >
                <i className="bi bi-plus-lg me-2"></i>
                Nuevo cliente
              </Button>
            </div>
          </header>

          {/* BUSQUEDA */}

          <Row className="mb-4">

            <Col lg={5} md={7}>

              <CuadroBusquedas
                textoBusqueda={textoBusqueda}
                manejarCambioBusqueda={manejarBusqueda}
                placeholder="Buscar por nombre, apellido o celular..."
              />

            </Col>

          </Row>

          {/* ALERTA */}

          {!cargando &&
            textoBusqueda.trim() &&
            clientesFiltrados.length === 0 && (

            <Alert
              variant="light"
              className="border-0 shadow-sm rounded-4 text-center py-4"
            >

              <i className="bi bi-search text-primary fs-1"></i>

              <h5 className="mt-3 fw-semibold">

                No se encontraron clientes

              </h5>

              <p className="text-muted mb-0">

                Intenta con otro nombre o número.

              </p>

            </Alert>

          )}

          {/* LOADING */}

          {cargando && (

            <Row className="text-center py-5">

              <Col>

                <Spinner
                  animation="border"
                  variant="primary"
                  style={{
                    width: "3rem",
                    height: "3rem"
                  }}
                />

                <p className="mt-3 text-muted fw-medium">

                  Cargando clientes...

                </p>

              </Col>

            </Row>

          )}

          {/* TABLAS */}

          {!cargando &&
            clientesFiltrados.length > 0 && (

            <Row>

              <Col
                xs={12}
                className="d-lg-none"
              >

                <TarjetaCliente
                  clientes={clientesPaginados}
                  abrirModalEdicion={abrirModalEdicion}
                  abrirModalEliminacion={abrirModalEliminacion}
                />

              </Col>

              <Col
                lg={12}
                className="d-none d-lg-block"
              >

                <TablaClientes
                  clientes={clientesPaginados}
                  abrirModalEdicion={abrirModalEdicion}
                  abrirModalEliminacion={abrirModalEliminacion}
                />

              </Col>

            </Row>

          )}

          {/* PAGINACION */}

          {clientesFiltrados.length > 0 && (

            <div className="mt-4">

              <Paginacion
                registrosPorPagina={registrosPorPagina}
                totalRegistros={clientesFiltrados.length}
                paginaActual={paginaActual}
                establecerPaginaActual={establecerPaginaActual}
                establecerRegistrosPorPagina={establecerRegistrosPorPagina}
              />

            </div>

          )}

      </div>

      {/* MODALES */}

=======
      setToast({
        mostrar: true,
        mensaje: `Cliente actualizado exitosamente.`,
        tipo: "exito",
      });
    } catch (err) {
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al actualizar cliente.",
        tipo: "error",
      });
    }
  };

  return (
    <Container className="mt-3">
      {/* Título y botón Nuevo Cliente */}
      <Row className="align-items-center mb-3">
        <Col xs={9} sm={7} md={7} lg={7} className="d-flex align-items-center">
          <h3 className="mb-0">
            <i className="bi-people-fill me-2"></i> Clientes
          </h3>
        </Col>
        <Col xs={3} sm={5} md={5} lg={5} className="text-end">
          <Button onClick={() => setMostrarModal(true)} size="md">
            <i className="bi-plus-lg"></i>
            <span className="d-none d-sm-inline ms-2">Nuevo Cliente</span>
          </Button>
        </Col>
      </Row>
      <hr />

      {/* Búsqueda */}
      <Row className="mb-4">
        <Col md={6} lg={5}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarBusqueda}
            placeholder="Buscar por nombre, apellido o celular..."
          />
        </Col>
      </Row>

      {/* Mensaje sin resultados */}
      {!cargando && textoBusqueda.trim() && clientesFiltrados.length === 0 && (
        <Row className="mb-4">
          <Col>
            <Alert variant="info" className="text-center">
              <i className="bi bi-info-circle me-2"></i>
              No se encontraron clientes que coincidan con "{textoBusqueda}".
            </Alert>
          </Col>
        </Row>
      )}

      {/* Cargando */}
      {cargando && (
        <Row className="text-center my-5">
          <Col>
            <Spinner animation="border" variant="success" size="lg" />
            <p className="mt-3 text-muted">Cargando clientes...</p>
          </Col>
        </Row>
      )}

      {/* Lista */}
      {!cargando && clientesFiltrados.length > 0 && (
        <Row>
          <Col xs={12} sm={12} md={12} className="d-lg-none">
            <TarjetaCliente
              clientes={clientesPaginados}
              abrirModalEdicion={abrirModalEdicion}
              abrirModalEliminacion={abrirModalEliminacion}
            />
          </Col>
          <Col lg={12} className="d-none d-lg-block">
            <TablaClientes
              clientes={clientesPaginados}
              abrirModalEdicion={abrirModalEdicion}
              abrirModalEliminacion={abrirModalEliminacion}
            />
          </Col>
        </Row>
      )}

      {/* Paginación */}
      {clientesFiltrados.length > 0 && (
        <Paginacion
          registrosPorPagina={registrosPorPagina}
          totalRegistros={clientesFiltrados.length}
          paginaActual={paginaActual}
          establecerPaginaActual={establecerPaginaActual}
          establecerRegistrosPorPagina={establecerRegistrosPorPagina}
        />
      )}

      {/* Modales */}
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
      <ModalRegistroCliente
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoCliente={nuevoCliente}
        manejoCambioInput={manejoCambioInput}
        agregarCliente={agregarCliente}
      />

      <ModalEliminacionCliente
        mostrarModalEliminacion={mostrarModalEliminacion}
        setMostrarModalEliminacion={setMostrarModalEliminacion}
        eliminarCliente={eliminarCliente}
        cliente={clienteAEliminar}
      />

      <ModalEdicionCliente
        mostrarModalEdicion={mostrarModalEdicion}
        setMostrarModalEdicion={setMostrarModalEdicion}
        clienteEditar={clienteEditar}
        manejoCambioInputEdicion={manejoCambioInputEdicion}
        actualizarCliente={actualizarCliente}
      />

      <NotificacionOperacion
        mostrar={toast.mostrar}
        mensaje={toast.mensaje}
        tipo={toast.tipo}
<<<<<<< HEAD
        onCerrar={() =>
          setToast({
            ...toast,
            mostrar: false
          })
        }
      />

=======
        onCerrar={() => setToast({ ...toast, mostrar: false })}
      />
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
    </Container>
  );
};

<<<<<<< HEAD
export default Clientes;
=======
export default Clientes;
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
