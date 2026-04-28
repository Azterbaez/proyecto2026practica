
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { supabase } from "../../src/assets/database/supabaseconfig";

import ModalRegistroCategoria from "../components/categorias/ModalRegistroCategoria";
import ModalEdicionCategoria from "../components/categorias/ModalEdicionCategoria";
import ModalEliminacionCategoria from "../components/categorias/ModalEliminacionCategoria";
import NotificacionOperacion from "../components/NotificacionOperacion";
import TablaCategorias from "../components/categorias/TablaCategorias";
import CuadroBusquedas from "../components/busquedas/Cuadrobusquedas";
import Paginacion from "../components/ordenamiento/Paginacion";


const Categorias = () => {
  // 🔔 Notificaciones
  const [toast, setToast] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });

  // 📦 Datos
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 🪟 Modales
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);

  // 🗑 Eliminar
  const [categoriaEliminar, setCategoriaEliminar] = useState(null);

  // 🆕 Crear
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre_categoria: "",
    descripcion_categoria: "",
  });

  // ✏️ Editar
  const [categoriaEditar, setCategoriaEditar] = useState({
    id_categoria: null,
    nombre_categoria: "",
    descripcion_categoria: "",
  });

  // 🔎 Búsqueda
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);

  // 📄 Paginación
  const [registrosPorPagina, setRegistrosPorPagina] = useState(5);
  const [paginaActual, setPaginaActual] = useState(1);

  const categoriasPaginadas = categoriasFiltradas.slice(
    (paginaActual - 1) * registrosPorPagina,
    paginaActual * registrosPorPagina
  );

  // 📥 Cargar datos
  const cargarCategorias = async () => {
    try {
      setCargando(true);

      const { data, error } = await supabase
        .from("Categorias")
        .select("*")
        .order("id_categoria", { ascending: true });

      if (error) throw error;

      setCategorias(data || []);
    } catch (err) {
      setToast({
        mostrar: true,
        mensaje: "Error al cargar categorías.",
        tipo: "error",
      });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  // 🔎 Búsqueda
  useEffect(() => {
    if (!textoBusqueda.trim()) {
      setCategoriasFiltradas(categorias);
    } else {
      const texto = textoBusqueda.toLowerCase().trim();

      const filtradas = categorias.filter((cat) =>
        cat.nombre_categoria.toLowerCase().includes(texto) ||
        (cat.descripcion_categoria &&
          cat.descripcion_categoria.toLowerCase().includes(texto))
      );

      setCategoriasFiltradas(filtradas);
      setPaginaActual(1);
    }
  }, [textoBusqueda, categorias]);

  // ✏️ Inputs crear
  const manejoCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria((prev) => ({ ...prev, [name]: value }));
  };

  // ✏️ Inputs editar
  const manejoCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setCategoriaEditar((prev) => ({ ...prev, [name]: value }));
  };

  // ➕ Crear
  const agregarCategoria = async () => {
    try {
      if (
        !nuevaCategoria.nombre_categoria.trim() ||
        !nuevaCategoria.descripcion_categoria.trim()
      ) {
        setToast({
          mostrar: true,
          mensaje: "Debe llenar todos los campos.",
          tipo: "advertencia",
        });
        return;
      }

      const { error } = await supabase
        .from("Categorias")
        .insert([nuevaCategoria]);

      if (error) throw error;

      setToast({
        mostrar: true,
        mensaje: "Categoría creada correctamente.",
        tipo: "exito",
      });

      setNuevaCategoria({ nombre_categoria: "", descripcion_categoria: "" });
      setMostrarModal(false);
      cargarCategorias();
    } catch {
      setToast({
        mostrar: true,
        mensaje: "Error al crear categoría.",
        tipo: "error",
      });
    }
  };

  // ✏️ Abrir edición
  const abrirModalEdicion = (categoria) => {
    setCategoriaEditar(categoria);
    setMostrarModalEdicion(true);
  };

  // 🗑 Abrir eliminación
  const abrirModalEliminacion = (categoria) => {
    setCategoriaEliminar(categoria);
    setMostrarModalEliminacion(true);
  };

  // ❌ Eliminar
  const eliminarCategoria = async () => {
    try {
      const { error } = await supabase
        .from("Categorias")
        .delete()
        .eq("id_categoria", categoriaEliminar.id_categoria);

      if (error) throw error;

      setToast({
        mostrar: true,
        mensaje: "Categoría eliminada.",
        tipo: "exito",
      });

      setMostrarModalEliminacion(false);
      cargarCategorias();
    } catch {
      setToast({
        mostrar: true,
        mensaje: "Error al eliminar.",
        tipo: "error",
      });
    }
  };

  // ✏️ Actualizar
  const actualizarCategoria = async () => {
    try {
      const { error } = await supabase
        .from("Categorias")
        .update({
          nombre_categoria: categoriaEditar.nombre_categoria,
          descripcion_categoria: categoriaEditar.descripcion_categoria,
        })
        .eq("id_categoria", categoriaEditar.id_categoria);

      if (error) throw error;

      setToast({
        mostrar: true,
        mensaje: "Categoría actualizada.",
        tipo: "exito",
      });

      setMostrarModalEdicion(false);
      cargarCategorias();
    } catch {
      setToast({
        mostrar: true,
        mensaje: "Error al actualizar.",
        tipo: "error",
      });
    }
  };

  return (
    <Container className="mt-3">

      {/* Header */}
      <Row className="align-items-center mb-3">
        <Col>
          <h3>Categorías</h3>
        </Col>

        <Col className="text-end">
          <Button onClick={() => setMostrarModal(true)}>
            Nueva Categoría
          </Button>
        </Col>
      </Row>

      <hr />

      {/* Loading */}
      {cargando && (
        <Row className="text-center my-4">
          <Spinner animation="border" />
        </Row>
      )}

      {/* Buscador */}
      <Row className="mb-3">
        <Col md={6}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={(e) => setTextoBusqueda(e.target.value)}
            placeholder="Buscar por nombre o descripción..."
          />
        </Col>
      </Row>

      {/* Sin resultados */}
      {!cargando && categoriasFiltradas.length === 0 && (
        <Alert variant="info" className="text-center">
          No se encontraron categorías con "{textoBusqueda}"
        </Alert>
      )}

      {/* Tabla / Tarjetas */}
      {!cargando && categoriasFiltradas.length > 0 && (
        <Row>

          <Col lg={12} className="d-none d-lg-block">
            <TablaCategorias
              categorias={categoriasPaginadas}
              abrirModalEdicion={abrirModalEdicion}
              abrirModalEliminacion={abrirModalEliminacion}
            />
          </Col>

          <Col xs={12} className="d-lg-none">
            <TarjetaCategoria
              categorias={categoriasPaginadas}
              abrirModalEdicion={abrirModalEdicion}
              abrirModalEliminacion={abrirModalEliminacion}
            />
          </Col>

        </Row>
      )}

      {/* Paginación */}
      {categoriasFiltradas.length > 0 && (
        <Paginacion
          registrosporPagina={registrosPorPagina}
          totalRegistros={categoriasFiltradas.length}
          paginaActual={paginaActual}
          establecerPaginaActual={setPaginaActual}
          establecerRegistrosPorPagina={setRegistrosPorPagina}
        />
      )}

      {/* Modales */}
      <ModalRegistroCategoria
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevaCategoria={nuevaCategoria}
        manejoCambioInput={manejoCambioInput}
        agregarCategoria={agregarCategoria}
      />

      <ModalEdicionCategoria
        mostrarModalEdicion={mostrarModalEdicion}
        setMostrarModalEdicion={setMostrarModalEdicion}
        categoriaEditar={categoriaEditar}
        manejoCambioInputEdicion={manejoCambioInputEdicion}
        actualizarCategoria={actualizarCategoria}
      />

      <ModalEliminacionCategoria
        mostrarModalEliminacion={mostrarModalEliminacion}
        setMostrarModalEliminacion={setMostrarModalEliminacion}
        categoriaEliminar={categoriaEliminar}
        eliminarCategoria={eliminarCategoria}
      />

      {/* Toast */}
      <NotificacionOperacion
        mostrar={toast.mostrar}
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        onCerrar={() => setToast({ ...toast, mostrar: false })}
      />

    </Container>
  );
};

export default Categorias;