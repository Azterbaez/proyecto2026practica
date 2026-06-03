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
import TarjetaCategoria from "../components/categorias/TarjetaCategoria";
import ModalEnvioCorreoCategorias from "../components/categorias/ModalEnvioCorreoCategorias";
import emailjs from "@emailjs/browser";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Categorias = () => {
  // 🔔 Notificaciones
  const [toast, setToast] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });


  // email
  const [mostrarModalCorreo, setMostrarModalCorreo] = useState(false);
const [emailDestino, setEmailDestino] = useState("");
const [enviandoCorreo, setEnviandoCorreo] = useState(false);

  // 📦 Datos
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 🪟 Modales
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);

  const manejarCambioBusqueda = (e) => {
    setTextoBusqueda(e.target.value);
  };

  const generarPDFCategoria = (categoria) => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text("Reporte de Categoría", 14, 20);

    // Línea decorativa
    doc.line(14, 25, 195, 25);

    // Información de la categoría
    doc.setFontSize(12);

    autoTable(doc, {
      startY: 35,
      head: [["Campo", "Valor"]],
      body: [
        ["ID", categoria.id_categoria],
        ["Nombre", categoria.nombre_categoria],
        ["Descripción", categoria.descripcion_categoria],
      ],
    });

    // Descargar PDF
    doc.save(`categoria_${categoria.id_categoria}.pdf`);
  };

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
    paginaActual * registrosPorPagina,
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

      const filtradas = categorias.filter(
        (cat) =>
          cat.nombre_categoria.toLowerCase().includes(texto) ||
          (cat.descripcion_categoria &&
            cat.descripcion_categoria.toLowerCase().includes(texto)),
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

  useEffect(() => {
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
}, []);
 const abrirModalCorreo = () => {
    setEmailDestino("");
    setMostrarModalCorreo(true);
  };

  const formatearCategoriasParaCorreo = () => {
    if (categorias.length === 0) return "No hay categorías registradas.";

    let texto = ' LISTADO DE CATEGORÍAS\n\n';
    texto += `Fecha: ${new Date().toLocaleDateString("es-NI")}\n`;
    texto += `Total de categorías: ${categorias.length}\n\n`;

    categorias.forEach((cat, index) => {
      texto += `${index + 1}. ${cat.nombre_categoria}\n`;
      if (cat.descripcion_categoria) {
        texto += `   Descripción: ${cat.descripcion_categoria}\n`;
      }
      texto += '\n';
    });

    return texto;
  };

  const enviarCorreoCategorias = () => {
    if (!emailDestino.trim()) {
      setToast({
        mostrar: true,
        mensaje: "Por favor ingresa un correo destino.",
        tipo: "advertencia",
      });
      return;
    }

    setEnviandoCorreo(true);

    const mensaje = formatearCategoriasParaCorreo();

    const templateParams = {
      to_name: "Administrador",
      user_email: emailDestino,
      message: mensaje,
      fecha_envio: new Date().toLocaleDateString("es-NI")
    };

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams
    )
.then(() => {
        setToast({
          mostrar: true,
          mensaje: "Correo enviado correctamente.",
          tipo: "exito",
        });
        setMostrarModalCorreo(false);
        setEmailDestino("");
      })
      .catch((error) => {
        console.error("Error EmailJS:", error);
        setToast({
          mostrar: true,
          mensaje: "Error al enviar el correo.",
          tipo: "error",
        });
      })
      .finally(() => {
        setEnviandoCorreo(false);
      });
  };

  return (
    <Container className="mt-4 px-3 px-md-4">
      {/* Header */}
      <Row className="align-items-center mb-4">
        <Col>
          <h3>Categorías</h3>
        </Col>
        <Row className="align-items-center mb-3">
  <Col xs={8} sm={8} md={8} lg={8} className="d-flex align-items-center">
    <h3 className="mb-0">
      <i className="bi-bookmark-plus-fill me-2"></i> Categorías
    </h3>
  </Col>
  <Col xs={2} sm={2} md={2} lg={2} className="text-end">
    <Button variant="primary" onClick={abrirModalCorreo} size="md">
      <i className="bi bi-envelope"></i>
      <span className="d-none d-lg-inline ms-2">Enviar por Correo</span>
    </Button>
  </Col>
  <Col xs={2} sm={2} md={2} lg={2} className="text-end">
    <Button
      onClick={() => setMostrarModal(true)}
      size="md"
 >
      <i className="bi-plus-lg"></i>
      <span className="d-none d-lg-inline ms-2">Nueva Categoría</span>
    </Button>
  </Col>
</Row>


        <Col className="text-end">
          <Button onClick={() => setMostrarModal(true)}>Nueva Categoría</Button>
        </Col>
      </Row>

      <hr className="my-4" />

      {/* Loading */}
      {cargando && (
        <Row className="text-center my-4">
          <Spinner animation="border" />
        </Row>
      )}

      {/* Buscador */}
      <Row className="mb-3 align-items-center">
        {/* 🔎 BUSCADOR */}
        <Col md={8}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={(e) => setTextoBusqueda(e.target.value)}
            placeholder="Buscar por nombre o descripción..."
          />
        </Col>

        {/* ➕ BOTÓN */}
        <Col md={4} className="text-md-end mt-2 mt-md-0">
          <Button onClick={() => setMostrarModal(true)}>Nueva Categoría</Button>
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
              generarPDFCategoria={generarPDFCategoria}
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
   <ModalEnvioCorreoCategorias
  mostrarModalCorreo={mostrarModalCorreo}
  setMostrarModalCorreo={setMostrarModalCorreo}
  emailDestino={emailDestino}
  setEmailDestino={setEmailDestino}
  enviandoCorreo={enviandoCorreo}
  enviarCorreoCategorias={enviarCorreoCategorias}
  totalCategorias={categorias.length}
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
