<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { supabase } from "../database/supabaseconfig";
=======
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { supabase } from "../../src/assets/database/supabaseconfig";
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe

import ModalRegistroCategoria from "../components/categorias/ModalRegistroCategoria";
import ModalEdicionCategoria from "../components/categorias/ModalEdicionCategoria";
import ModalEliminacionCategoria from "../components/categorias/ModalEliminacionCategoria";
import NotificacionOperacion from "../components/NotificacionOperacion";
import TablaCategorias from "../components/categorias/TablaCategorias";
<<<<<<< HEAD
import TarjetaCategoria from "../components/categorias/TarjetaCategoria";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import Paginacion from "../components/ordenamiento/Paginacion";
import ModalEnvioCorreoCategorias from "../components/categorias/ModalEnvioCorreoCategorias";
import emailjs from "@emailjs/browser";
=======
import CuadroBusquedas from "../components/busquedas/Cuadrobusquedas";
import Paginacion from "../components/ordenamiento/Paginacion";
import TarjetaCategoria from "../components/categorias/TarjetaCategoria";
import ModalEnvioCorreoCategorias from "../components/categorias/ModalEnvioCorreoCategorias";
import emailjs from "@emailjs/browser";

>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Categorias = () => {
<<<<<<< HEAD
=======
  // 🔔 Notificaciones
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
  const [toast, setToast] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });

<<<<<<< HEAD
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);

=======



  // email
  const [mostrarModalCorreo, setMostrarModalCorreo] = useState(false);
const [emailDestino, setEmailDestino] = useState("");
const [enviandoCorreo, setEnviandoCorreo] = useState(false);

  // 📦 Datos
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 🪟 Modales
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);

<<<<<<< HEAD
  const [mostrarModalCorreo, setMostrarModalCorreo] = useState(false);
  const [emailDestino, setEmailDestino] = useState("");
  const [enviandoCorreo, setEnviandoCorreo] = useState(false);


  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);

  const [registrosPorPagina, establecerRegistrosPorPagina] = useState(5);
  const [paginaActual, establecerPaginaActual] = useState(1);

  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

  const copiarCategoria = async (categoria) => {
=======
  const manejarCambioBusqueda = (e) => {
    setTextoBusqueda(e.target.value);
  };

const copiarCategoria = async (categoria) => {
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
    if (!categoria) return;

    const texto = `
ID: ${categoria.id_categoria}
Categoría: ${categoria.nombre_categoria}
<<<<<<< HEAD
Descripción: ${categoria.descripcion_categoria}
`;

    try {
      await navigator.clipboard.writeText(texto);

      setToast({
        mostrar: true,
        mensaje: `Categoría "${categoria.nombre_categoria}" copiada al portapapeles.`,
        tipo: "exito",
      });
    } catch (err) {
      console.error("Error al copiar categoría:", err);

      setToast({
        mostrar: true,
        mensaje: "No se puede copiar al portapapeles",
        tipo: "error",
      });
    }
  };

  const [categoriaEditar, setCategoriaEditar] = useState({
    id_categoria: "",
    nombre_categoria: "",
    descripcion_categoria: "",
  });

  const generarPDFCategoria = (categoria) => {

=======
Descripción: ${categoria.descripcion_categoria || 'Sin descripción'}`;

    try {
        await navigator.clipboard.writeText(texto);
        setToast({
            mostrar: true,
            mensaje: `Categoría "${categoria.nombre_categoria}" copiada al portapapeles.`,
            tipo: "exito",
        });
    } catch (err) {
        console.error("Error al copiar: ", err);
        setToast({
            mostrar: true,
            mensaje: "No se pudo copiar al portapapeles.",
            tipo: "error",
        });
    }
};

  const generarPDFCategoria = (categoria) => {
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
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

<<<<<<< HEAD

  const manejarBusqueda = (e) => {
    setTextoBusqueda(e.target.value);
  };

  useEffect(() => {
    if (!textoBusqueda.trim()) {
      setCategoriasFiltradas(categorias);
    } else {
      const textoLower = textoBusqueda.toLowerCase().trim();
      const filtradas = categorias.filter(
        (cat) =>
          cat.nombre_categoria.toLowerCase().includes(textoLower) ||
          (cat.descripcion_categoria &&
            cat.descripcion_categoria.toLowerCase().includes(textoLower))
      );
      setCategoriasFiltradas(filtradas);
    }
  }, [textoBusqueda, categorias]);

=======
  // 🗑 Eliminar
  const [categoriaEliminar, setCategoriaEliminar] = useState(null);

  // 🆕 Crear
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre_categoria: "",
    descripcion_categoria: "",
  });

<<<<<<< HEAD
  const categoriaPaginadas = categoriasFiltradas.slice(
    (paginaActual - 1) * registrosPorPagina,
    paginaActual * registrosPorPagina
  );

  const abrirModalEdicion = (categoria) => {
    setCategoriaEditar({
      id_categoria: categoria.id_categoria,
      nombre_categoria: categoria.nombre_categoria,
      descripcion_categoria: categoria.descripcion_categoria,
    });
    setMostrarModalEdicion(true);
  };

  const abrirModalEliminacion = (categoria) => {
    setCategoriaAEliminar(categoria);
    setMostrarModalEliminacion(true);
  };

  const manejoCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const manejoCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setCategoriaEditar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

=======
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

  // codigo QR



  // 📥 Cargar datos
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
  const cargarCategorias = async () => {
    try {
      setCargando(true);

      const { data, error } = await supabase
<<<<<<< HEAD
        .from("categorias")
        .select("*")
        .order("id_categoria", { ascending: true });

      if (error) {
        console.error("Error al cargar categorías:", error.message);
        setToast({
          mostrar: true,
          mensaje: "Error al cargar categorías.",
          tipo: "error",
        });
        return;
      }

      setCategorias(data || []);
    } catch (err) {
      console.error("Excepción al cargar categorías:", err.message);
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al cargar categorías.",
=======
        .from("Categorias")
        .select("*")
        .order("id_categoria", { ascending: true });

      if (error) throw error;

      setCategorias(data || []);
    } catch (err) {
      setToast({
        mostrar: true,
        mensaje: "Error al cargar categorías.",
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
        tipo: "error",
      });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

<<<<<<< HEAD
=======
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
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
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

<<<<<<< HEAD
      const { error } = await supabase.from("categorias").insert([
        {
          nombre_categoria: nuevaCategoria.nombre_categoria,
          descripcion_categoria: nuevaCategoria.descripcion_categoria,
        },
      ]);

      if (error) {
        console.error("Error al agregar categoria:", error.message);
        setToast({
          mostrar: true,
          mensaje: "Error al registrar categoria.",
          tipo: "error",
        });
        return;
      }

      await cargarCategorias();

      setToast({
        mostrar: true,
        mensaje: `Categoría "${nuevaCategoria.nombre_categoria}" registrada exitosamente.`,
        tipo: "exito",
      });

      setNuevaCategoria({
        nombre_categoria: "",
        descripcion_categoria: "",
      });

      setMostrarModal(false);
    } catch (err) {
      console.error("Excepción al agregar categoría:", err.message);
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al registrar categoría.",
        tipo: "error",
      });
    }
  };

  const eliminarCategoria = async () => {
    if (!categoriaAEliminar) return;

    try {
      setMostrarModalEliminacion(false);

      const { error } = await supabase
        .from("categorias")
        .delete()
        .eq("id_categoria", categoriaAEliminar.id_categoria);

      if (error) {
        console.error("Error al eliminar categoría:", error.message);
        setToast({
          mostrar: true,
          mensaje: `Error al eliminar la categoría ${categoriaAEliminar.nombre_categoria}.`,
          tipo: "error",
        });
        return;
      }

      await cargarCategorias();
      setToast({
        mostrar: true,
        mensaje: `Categoría ${categoriaAEliminar.nombre_categoria} eliminada exitosamente.`,
        tipo: "exito",
      });
    } catch (err) {
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al eliminar categoría.",
        tipo: "error",
      });
      console.error("Excepción al eliminar categoría:", err.message);
    }
  };

  const actualizarCategoria = async () => {
    try {
      if (
        !categoriaEditar.nombre_categoria.trim() ||
        !categoriaEditar.descripcion_categoria.trim()
      ) {
        setToast({
          mostrar: true,
          mensaje: "Debe llenar todos los campos.",
          tipo: "advertencia",
        });
        return;
      }

      setMostrarModalEdicion(false);

      const { error } = await supabase
        .from("categorias")
=======
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
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
        .update({
          nombre_categoria: categoriaEditar.nombre_categoria,
          descripcion_categoria: categoriaEditar.descripcion_categoria,
        })
        .eq("id_categoria", categoriaEditar.id_categoria);

<<<<<<< HEAD
      if (error) {
        console.error("Error al actualizar categoría:", error.message);
        setToast({
          mostrar: true,
          mensaje: `Error al actualizar la categoría ${categoriaEditar.nombre_categoria}.`,
          tipo: "error",
        });
        return;
      }

      await cargarCategorias();

      setToast({
        mostrar: true,
        mensaje: `Categoría ${categoriaEditar.nombre_categoria} actualizada exitosamente.`,
        tipo: "exito",
      });
    } catch (err) {
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al actualizar categoría.",
        tipo: "error",
      });
      console.error("Excepción al actualizar categoría:", err.message);
    }
  };

  const abrirModalCorreo = () => {
=======
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
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
    setEmailDestino("");
    setMostrarModalCorreo(true);
  };

  const formatearCategoriasParaCorreo = () => {
    if (categorias.length === 0) return "No hay categorías registradas.";

<<<<<<< HEAD
    let texto = `LISTADO DE CATEGORÍAS\n\n`;
=======
    let texto = ' LISTADO DE CATEGORÍAS\n\n';
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
    texto += `Fecha: ${new Date().toLocaleDateString("es-NI")}\n`;
    texto += `Total de categorías: ${categorias.length}\n\n`;

    categorias.forEach((cat, index) => {
      texto += `${index + 1}. ${cat.nombre_categoria}\n`;
      if (cat.descripcion_categoria) {
        texto += `   Descripción: ${cat.descripcion_categoria}\n`;
      }
<<<<<<< HEAD
      texto += `\n`;
=======
      texto += '\n';
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
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
<<<<<<< HEAD
=======

>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams
    )
<<<<<<< HEAD
      .then(() => {
=======
.then(() => {
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
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

<<<<<<< HEAD
  // Inicializar EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  return (
    <Container className="vista-contenedor mt-3">
      <div className="vista-panel">
        <header className="vista-encabezado">
          <div className="vista-encabezado__titulo-grupo">
            <div className="vista-encabezado__icono" aria-hidden="true">
              <i className="bi bi-bookmarks"></i>
            </div>
            <div>
              <h2>Categorías</h2>
              <p className="vista-encabezado__subtitulo">
                Clasificación de productos del inventario
              </p>
            </div>
          </div>
          <div className="vista-encabezado__acciones">
            <Button variant="outline-primary" onClick={abrirModalCorreo}>
              <i className="bi bi-envelope"></i>
              <span className="d-none d-lg-inline ms-2">Enviar por correo</span>
            </Button>
            <Button variant="primary" onClick={() => setMostrarModal(true)}>
              <i className="bi bi-plus-lg"></i>
              <span className="d-none d-lg-inline ms-2">Nueva categoría</span>
            </Button>
          </div>
        </header>

        <Row className="mb-4">
          <Col md={6} lg={5}>
            <CuadroBusquedas
              textBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarBusqueda}
              placeholder="Buscar por nombre o descripcion..."
            />
          </Col>
        </Row>

        {!cargando &&
          textoBusqueda.trim() &&
          categoriasFiltradas.length === 0 && (
            <Row className="mb-4">
              <Col>
                <Alert variant="info" className="text-center">
                  <i className="bi bi-info-circle me-2"></i>
                  No se encontraron categorias que coincidan con "{textoBusqueda}".
                </Alert>
              </Col>
            </Row>
          )}

        <Row>
          <Col xs={12} sm={12} md={12} className="d-lg-none">
            <TarjetaCategoria
              categorias={categoriaPaginadas}
=======
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
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
              abrirModalEdicion={abrirModalEdicion}
              abrirModalEliminacion={abrirModalEliminacion}
              generarPDFCategoria={generarPDFCategoria}
              copiarCategoria={copiarCategoria}
            />
          </Col>
<<<<<<< HEAD
        </Row>

        {!cargando && categoriasFiltradas.length > 0 && (
          <Row>
            <Col lg={12} className="d-none d-lg-block">
              <TablaCategorias
                categorias={categoriaPaginadas}
                abrirModalEdicion={abrirModalEdicion}
                generarPDFCategoria={generarPDFCategoria}
                abrirModalEliminacion={abrirModalEliminacion}
                copiarCategoria={copiarCategoria}
              />
            </Col>
          </Row>
        )}

        <hr />

        {categoriasFiltradas.length > 0 && (
          <Paginacion
            registrosPorPagina={registrosPorPagina}
            totalRegistros={categoriasFiltradas.length}
            paginaActual={paginaActual}
            establecerPaginaActual={establecerPaginaActual}
            establecerRegistrosPorPagina={establecerRegistrosPorPagina}
          />
        )}

      </div>

=======

          <Col xs={12} className="d-lg-none">
            <TarjetaCategoria
              categorias={categoriasPaginadas}
              abrirModalEdicion={abrirModalEdicion}
              abrirModalEliminacion={abrirModalEliminacion}
              copiarCategoria={copiarCategoria}
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
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
      <ModalRegistroCategoria
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevaCategoria={nuevaCategoria}
        manejoCambioInput={manejoCambioInput}
        agregarCategoria={agregarCategoria}
      />
<<<<<<< HEAD

      <NotificacionOperacion
        {...toast}
        onCerrar={() =>
          setToast({ ...toast, mostrar: false })
        }
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
=======
   <ModalEnvioCorreoCategorias
  mostrarModalCorreo={mostrarModalCorreo}
  setMostrarModalCorreo={setMostrarModalCorreo}
  emailDestino={emailDestino}
  setEmailDestino={setEmailDestino}
  enviandoCorreo={enviandoCorreo}
  enviarCorreoCategorias={enviarCorreoCategorias}
  totalCategorias={categorias.length}
/>

>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe

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
<<<<<<< HEAD
        eliminarCategoria={eliminarCategoria}
        categoria={categoriaAEliminar}
=======
        categoriaEliminar={categoriaEliminar}
        eliminarCategoria={eliminarCategoria}
      />

      {/* Toast */}
      <NotificacionOperacion
        mostrar={toast.mostrar}
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        onCerrar={() => setToast({ ...toast, mostrar: false })}
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
      />
    </Container>
  );
};

export default Categorias;