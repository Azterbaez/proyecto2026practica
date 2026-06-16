import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Spinner
} from "react-bootstrap";

import { supabase } from "../database/supabaseconfig";

import ModalRegistroProducto from "../components/productos/ModalRegistroProducto";
import ModalEliminacionProducto from "../components/productos/ModalEliminacionProducto";
import ModalEdicionProducto from "../components/productos/ModalEdicionProducto";

import NotificacionOperacion from "../components/NotificacionOperacion";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import TablaProductos from "../components/productos/TablaProducto";
import Paginacion from "../components/ordenamiento/Paginacion";
import TarjetaProducto from "../components/productos/TarjetaProducto";
import ModalQRProducto from "../components/productos/ModalQRProducto";
=======
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import { supabase } from "../assets/database/supabaseconfig";

import ModalEliminacionProducto from "../components/productos/ModalEliminacionProducto";
import ModalEdicionProducto from "../components/productos/ModalEdicionProducto";
import ModalRegistroProducto from "../components/productos/ModalRegistroProducto";
import TablaProductos from "../components/productos/TablaProductos";
import TarjetasProductos from "../components/productos/TarjetasProductos";
import Paginacion from "../components/ordenamiento/Paginacion";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import NotificacionOperacion from "../components/NotificacionOperacion";



>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe

const Productos = () => {

  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);
<<<<<<< HEAD

  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [cargando, setCargando] = useState(true);

  const [mostrarModal, setMostrarModal] =
    useState(false);

  const [mostrarModalQR, setMostrarModalQR] =
    useState(false);
  const [productoQR, setProductoQR] = useState(null);

  

  const [
    mostrarModalEliminacion,
    setMostrarModalEliminacion
  ] = useState(false);

  const [
    mostrarModalEdicion,
    setMostrarModalEdicion
  ] = useState(false);

  const [
    registrosPorPagina,
    establecerRegistrosPorPagina
  ] = useState(5);

  const [
    paginaActual,
    establecerPaginaActual
  ] = useState(1);

  const [nuevoProducto, setNuevoProducto] =
    useState({
      nombre_producto: "",
      descripcion_producto: "",
      categoria_producto: "",
      precio_venta: "",
      archivo: null,
    });

    const generarQRImagen = (producto) => {
      if (!producto.url_imagen) {
        setToast({
          mostrar: true,
          mensaje: "Este producto no tiene imagen para generar el QR",
          tipo: "advertencia",
        });
        return;
      }
      setProductoQR(producto);
      setMostrarModalQR(true);
    };

  const productosPaginadas =
    productosFiltrados.slice(
      (paginaActual - 1) * registrosPorPagina,
      paginaActual * registrosPorPagina
    );

  const [productoEditar, setProductoEditar] =
    useState({
      id_producto: "",
      nombre_producto: "",
      descripcion_producto: "",
      categoria_producto: "",
      precio_venta: "",
      url_imagen: "",
      archivo: null,
    });

  const [productoAEliminar, setProductoAEliminar] =
    useState(null);
=======
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);

  const [registrosPorPagina, establecerRegistrosPorPagina] = useState(5);
  const [paginaActual, establecerPaginaActual] = useState(1);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: "",
    descripcion_producto: "",
    categoria_producto: "",
    precio_venta: "",
    archivo: null,
  });

  const productosPaginadas = productosFiltrados.slice(
    (paginaActual - 1) * registrosPorPagina,
    paginaActual * registrosPorPagina
  );

  const [productoEditar, setProductoEditar] = useState({
    id_producto: "",
    nombre_producto: "",
    descripcion_producto: "",
    categoria_producto: "",
    precio_venta: "",
    url_imagen: "",
    archivo: null,
  });

  const [productoAEliminar, setProductoAEliminar] = useState(null);
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe

  const [toast, setToast] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });

<<<<<<< HEAD
  // ==================== MODALES ====================

  const abrirModalEdicion = (prod) => {

    setProductoEditar(prod);
    setMostrarModalEdicion(true);

  };

  const abrirModalEliminacion = (prod) => {

    setProductoAEliminar(prod);
    setMostrarModalEliminacion(true);

  };

  // ==================== INPUTS ====================

  const manejoCambioInput = (e) => {

=======
  const abrirModalEdicion = (prod) => {
    setProductoEditar(prod);
    setMostrarModalEdicion(true);
  };

  const abrirModalEliminacion = (prod) => {
    setProductoAEliminar(prod);
    setMostrarModalEliminacion(true);
  };

  const manejoCambioInput = (e) => {
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
    const { name, value } = e.target;

    setNuevoProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
<<<<<<< HEAD

  };

  const manejoCambioInputEdicion = (e) => {

    const { name, value } = e.target;

    setProductoEditar((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  // ==================== ARCHIVOS ====================

  const manejoCambioArchivoActualizar = (e) => {

    const archivo = e.target.files[0];

    if (
      archivo &&
      archivo.type.startsWith("image/")
    ) {

      setProductoEditar((prev) => ({
        ...prev,
        archivo
      }));

    } else {

      alert(
        "Selecciona una imagen válida"
      );

=======
  };

  const manejoCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setProductoEditar((prev) => ({ ...prev, [name]: value }));
  };

  const manejoCambioArchivoActualizar = (e) => {
    const archivo = e.target.files[0];
    if (archivo && archivo.type.startsWith("image/")) {
      setProductoEditar((prev) => ({ ...prev, archivo }));
    } else {
      alert("Selecciona una imagen válida (JPG, PNG, etc.)");
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
    }
  };

  const manejoCambioArchivo = (e) => {
<<<<<<< HEAD

    const archivo = e.target.files[0];

    if (
      archivo &&
      archivo.type.startsWith("image/")
    ) {

=======
    const archivo = e.target.files[0];

    if (archivo && archivo.type.startsWith("image/")) {
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
      setNuevoProducto((prev) => ({
        ...prev,
        archivo,
      }));
<<<<<<< HEAD

    } else {

      alert(
        "Selecciona una imagen válida"
      );

    }
  };

  // ==================== BUSQUEDA ====================

  const manejarBusqueda = (e) => {

    setTextoBusqueda(e.target.value);

  };

  useEffect(() => {

    if (!textoBusqueda.trim()) {

      setProductosFiltrados(productos);

    } else {

      const textoLower =
        textoBusqueda.toLowerCase().trim();

      const filtrados = productos.filter(
        (prod) => {

          const nombre =
            prod.nombre_producto
              ?.toLowerCase() || "";

          const descripcion =
            prod.descripcion_producto
              ?.toLowerCase() || "";

          const precio =
            prod.precio_venta?.toString() || "";

          return (
            nombre.includes(textoLower) ||
            descripcion.includes(textoLower) ||
            precio.includes(textoLower)
          );
        }
      );

      setProductosFiltrados(filtrados);

    }

  }, [textoBusqueda, productos]);

  // ==================== CATEGORIAS ====================

  useEffect(() => {

    cargarCategorias();

  }, []);

  const cargarCategorias = async () => {

    try {

      const { data, error } =
        await supabase
          .from("categorias")
          .select("*")
          .order("id_categoria", {
            ascending: true
          });
=======
    } else {
      alert("Selecciona una imagen válida (JPG, PNG, etc.)");
    }
  };

  const manejarBusqueda = (e) => {
    setTextoBusqueda(e.target.value);
  };

  useEffect(() => {
    if (!textoBusqueda.trim()) {
      setProductosFiltrados(productos);
    } else {
      const textoLower = textoBusqueda.toLowerCase().trim();
      const filtrados = productos.filter((prod) => {
        const nombre = prod.nombre_producto?.toLowerCase() || "";
        const descripcion = prod.descripcion_producto?.toLowerCase() || "";
        const precio = prod.precio_venta?.toString() || "";

        return (
          nombre.includes(textoLower) ||
          descripcion.includes(textoLower) ||
          precio.includes(textoLower)
        );
      });

      setProductosFiltrados(filtrados);
    }
  }, [textoBusqueda, productos]);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const eliminarProducto = async () => {
    if (!productoAEliminar) return;

    try {
      setMostrarModalEliminacion(false);

      const { error } = await supabase
        .from("productos")
        .delete()
        .eq("id_producto", productoAEliminar.id_producto);

      if (error) throw error;

      setToast({
        mostrar: true,
        mensaje: `Producto ${productoAEliminar.nombre_producto} eliminado correctamente`,
        tipo: "exito",
      });

      await cargarProductos();

    } catch (err) {
      console.error("Error al eliminar producto:", err);

      setToast({
        mostrar: true,
        mensaje: "Error al eliminar producto",
        tipo: "error",
      });
    }
  };

  const actualizarProducto = async () => {
    try {
      if (
        !productoEditar.nombre_producto.trim() ||
        !productoEditar.categoria_producto ||
        !productoEditar.precio_venta
      ) {
        setToast({
          mostrar: true,
          mensaje: "Completa los campos obligatorios",
          tipo: "advertencia",
        });
        return;
      }

      setMostrarModalEdicion(false);

      let datosActualizados = {
        nombre_producto: productoEditar.nombre_producto,
        descripcion_producto: productoEditar.descripcion_producto || null,
        categoria_producto: productoEditar.categoria_producto,
        precio_venta: parseFloat(productoEditar.precio_venta),
        url_imagen: productoEditar.url_imagen,
      };

      if (productoEditar.archivo) {
        const nombreArchivo = `${Date.now()}_${productoEditar.archivo.name}`;

        const { error: uploadError } = await supabase.storage
          .from("imagenes_productos")
          .upload(nombreArchivo, productoEditar.archivo);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("imagenes_productos")
          .getPublicUrl(nombreArchivo);
        datosActualizados.url_imagen = urlData.publicUrl;

        if (productoEditar.url_imagen) {
          const nombreAnterior = productoEditar.url_imagen.split("/").pop().split("?")[0];
          await supabase.storage.from("imagenes_productos").remove([nombreAnterior]).catch(() => { });
        }
      }

      const { error } = await supabase
        .from("productos")
        .update(datosActualizados)
        .eq("id_producto", productoEditar.id_producto);

      if (error) throw error;

      await cargarProductos();

      setProductoEditar({
        id_producto: "",
        nombre_producto: "",
        descripcion_producto: "",
        categoria_producto: "",
        precio_venta: "",
        url_imagen: "",
        archivo: null,
      });

      setToast({ mostrar: true, mensaje: "Producto actualizado correctamente", tipo: "exito" });
    } catch (err) {
      console.error("Error al actualizar:", err);
      setToast({ mostrar: true, mensaje: "Error al actualizar producto", tipo: "error" });
    }
  };

  const cargarCategorias = async () => {
    try {
      const { data, error } = await supabase
        .from("categorias")
        .select("*")
        .order("id_categoria", { ascending: true });
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe

      if (error) throw error;

      setCategorias(data || []);
<<<<<<< HEAD

    } catch (err) {

      console.error(
        "Error al cargar categorías:",
        err
      );

    }
  };

  // ==================== PRODUCTOS ====================

  useEffect(() => {

    cargarProductos();

  }, []);

  const cargarProductos = async () => {

    try {

      const { data, error } =
        await supabase
          .from("productos")
          .select("*")
          .order("id_producto", {
            ascending: true
          });
=======
    } catch (err) {
      console.error("Error al cargar categorías:", err);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("id_producto", { ascending: true });
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe

      if (error) throw error;

      setProductos(data || []);
      setProductosFiltrados(data || []);
      setCargando(false);
<<<<<<< HEAD

    } catch (err) {

      console.error(
        "Error al cargar productos:",
        err
      );

    }
  };

  // ==================== AGREGAR ====================

  const agregarProducto = async () => {

    try {

=======
    } catch (err) {
      console.error("Error al cargar productos:", err);
    }
  };

  const agregarProducto = async () => {
    try {
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
      if (
        !nuevoProducto.nombre_producto.trim() ||
        !nuevoProducto.categoria_producto ||
        !nuevoProducto.precio_venta ||
        !nuevoProducto.archivo
      ) {
<<<<<<< HEAD

        setToast({
          mostrar: true,
          mensaje:
            "Completa los campos obligatorios",
=======
        setToast({
          mostrar: true,
          mensaje: "Completa los campos obligatorios (nombre, categoría, precio e imagen)",
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
          tipo: "advertencia",
        });

        return;
      }

      setMostrarModal(false);

<<<<<<< HEAD
      const nombreArchivo =
        `${Date.now()}_${nuevoProducto.archivo.name}`;

      const { error: uploadError } =
        await supabase.storage
          .from("imagenes_productos")
          .upload(
            nombreArchivo,
            nuevoProducto.archivo
          );

      if (uploadError) throw uploadError;

      const { data: urlData } =
        supabase.storage
          .from("imagenes_productos")
          .getPublicUrl(nombreArchivo);

      const urlPublica =
        urlData.publicUrl;

      const { error } =
        await supabase
          .from("productos")
          .insert([
            {
              nombre_producto:
                nuevoProducto.nombre_producto,

              descripcion_producto:
                nuevoProducto.descripcion_producto || null,

              categoria_producto:
                nuevoProducto.categoria_producto,

              precio_venta:
                parseFloat(
                  nuevoProducto.precio_venta
                ),

              url_imagen:
                urlPublica,
            },
          ]);
=======
      const nombreArchivo = `${Date.now()}_${nuevoProducto.archivo.name}`;

      const { error: uploadError } = await supabase.storage
        .from("imagenes_productos")
        .upload(nombreArchivo, nuevoProducto.archivo);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("imagenes_productos")
        .getPublicUrl(nombreArchivo);

      const urlPublica = urlData.publicUrl;

      const { error } = await supabase.from("productos").insert([
        {
          nombre_producto: nuevoProducto.nombre_producto,
          descripcion_producto: nuevoProducto.descripcion_producto || null,
          categoria_producto: nuevoProducto.categoria_producto,
          precio_venta: parseFloat(nuevoProducto.precio_venta),
          url_imagen: urlPublica,
        },
      ]);
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe

      if (error) throw error;

      setNuevoProducto({
        nombre_producto: "",
        descripcion_producto: "",
        categoria_producto: "",
        precio_venta: "",
        archivo: null,
      });

      setToast({
        mostrar: true,
<<<<<<< HEAD
        mensaje:
          "Producto registrado correctamente",
=======
        mensaje: "Producto registrado correctamente",
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
        tipo: "exito",
      });

      await cargarProductos();

    } catch (err) {
<<<<<<< HEAD

      console.error(
        "Error al agregar producto:",
        err
      );

      setToast({
        mostrar: true,
        mensaje:
          "Error al registrar producto",
        tipo: "error",
      });

    }
  };

  // ==================== ACTUALIZAR ====================

  const actualizarProducto = async () => {

    try {

      if (
        !productoEditar.nombre_producto.trim() ||
        !productoEditar.categoria_producto ||
        !productoEditar.precio_venta
      ) {

        setToast({
          mostrar: true,
          mensaje:
            "Completa los campos obligatorios",
          tipo: "advertencia",
        });

        return;
      }

      setMostrarModalEdicion(false);

      let datosActualizados = {

        nombre_producto:
          productoEditar.nombre_producto,

        descripcion_producto:
          productoEditar.descripcion_producto || null,

        categoria_producto:
          productoEditar.categoria_producto,

        precio_venta:
          parseFloat(
            productoEditar.precio_venta
          ),

        url_imagen:
          productoEditar.url_imagen,
      };

      if (productoEditar.archivo) {

        const nombreArchivo =
          `${Date.now()}_${productoEditar.archivo.name}`;

        const { error: uploadError } =
          await supabase.storage
            .from("imagenes_productos")
            .upload(
              nombreArchivo,
              productoEditar.archivo
            );

        if (uploadError)
          throw uploadError;

        const { data: urlData } =
          supabase.storage
            .from("imagenes_productos")
            .getPublicUrl(nombreArchivo);

        datosActualizados.url_imagen =
          urlData.publicUrl;

      }

      const { error } =
        await supabase
          .from("productos")
          .update(datosActualizados)
          .eq(
            "id_producto",
            productoEditar.id_producto
          );

      if (error) throw error;

      await cargarProductos();

      setToast({
        mostrar: true,
        mensaje:
          "Producto actualizado correctamente",
        tipo: "exito",
      });

    } catch (err) {

      console.error(
        "Error al actualizar:",
        err
      );

      setToast({
        mostrar: true,
        mensaje:
          "Error al actualizar producto",
        tipo: "error",
      });

    }
  };

  // ==================== ELIMINAR ====================

  const eliminarProducto = async () => {

    if (!productoAEliminar) return;

    try {

      setMostrarModalEliminacion(false);

      const { error } =
        await supabase
          .from("productos")
          .delete()
          .eq(
            "id_producto",
            productoAEliminar.id_producto
          );

      if (error) throw error;

      setToast({
        mostrar: true,
        mensaje:
          `Producto ${productoAEliminar.nombre_producto} eliminado correctamente`,
        tipo: "exito",
      });

      await cargarProductos();

    } catch (err) {

      console.error(
        "Error al eliminar producto:",
        err
      );

      setToast({
        mostrar: true,
        mensaje:
          "Error al eliminar producto",
        tipo: "error",
      });

    }
  };

  // ==================== RETURN ====================

  return (

    <Container className="vista-contenedor mt-3">
      <div className="vista-panel">
      <header className="vista-encabezado">
        <div className="vista-encabezado__titulo-grupo">
          <div className="vista-encabezado__icono" aria-hidden="true">
            <i className="bi bi-box-seam"></i>
          </div>
          <div>
            <h2>Productos</h2>
            <p className="vista-encabezado__subtitulo">
              Inventario y precios del catálogo
            </p>
          </div>
        </div>
        <div className="vista-encabezado__acciones">
          <Button variant="primary" onClick={() => setMostrarModal(true)}>
            <i className="bi bi-plus-lg"></i>
            <span className="d-none d-sm-inline ms-2">Nuevo producto</span>
          </Button>
        </div>
      </header>

      <Row className="mb-4">

        <Col md={6} lg={5}>

=======
      console.error("Error al agregar producto:", err);

      setToast({
        mostrar: true,
        mensaje: "Error al registrar producto",
        tipo: "error",
      });
    }
  };

  return (
    <Container className="mt-3">

      <Row className="align-items-center mb-3">
        <Col className="d-flex align-items-center">
          <h3 className="mb-0">
            <i className="bi-bag-heart-fill me-2"></i> Productos
          </h3>
        </Col>

        <Col xs={3} sm={5} md={5} lg={5} className="text-end">
          <Button onClick={() => setMostrarModal(true)} size="md">
            <i className="bi-plus-lg"></i>
            <span className="d-none d-sm-inline ms-2">Nuevo Producto</span>
          </Button>
        </Col>
      </Row>

      <hr />

      <Row className="mb-4">
        <Col md={6} lg={5}>
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarBusqueda}
            placeholder="Buscar por nombre, descripción o precio..."
          />
<<<<<<< HEAD

        </Col>

      </Row>

      {cargando ? (

        <Row className="text-center my-5">

          <Spinner
            animation="border"
            variant="primary"
            size="lg"
          />

          <p className="mt-3 text-muted fw-medium">

            Cargando productos...

          </p>

        </Row>

      ) : !productosFiltrados.length ? (

        <Alert
          variant="light"
          className="text-center shadow-sm border-0 rounded-4 py-4"
        >

          <i className="bi bi-box-seam fs-1 text-secondary"></i>

          <h5 className="mt-3">

            No se encontraron productos

          </h5>

        </Alert>

      ) : (

        <Row>

          <Col
            xs={12}
            className="d-none d-lg-block"
          >

=======
        </Col>
      </Row>

      {!cargando && productosFiltrados.length > 0 && (
        <Row>
          <Col xs={12} className="d-none d-lg-block">
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
            <TablaProductos
              productos={productosPaginadas}
              abrirModalEdicion={abrirModalEdicion}
              abrirModalEliminacion={abrirModalEliminacion}
<<<<<<< HEAD
              generarQRImagen={generarQRImagen}
            />

          </Col>

          <Col
            xs={12}
            className="d-lg-none"
          >

=======
            />
          </Col>

          <Col xs={12} className="d-lg-none">
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
            <TarjetaProducto
              productos={productosFiltrados}
              categorias={categorias}
              abrirModalEdicion={abrirModalEdicion}
              abrirModalEliminacion={abrirModalEliminacion}
<<<<<<< HEAD
              generarQRImagen={generarQRImagen}
            />

          </Col>

        </Row>

      )}

      <hr
        style={{
          borderColor:
            "rgba(234, 88, 12, 0.15)"
        }}
      />

      {productosFiltrados.length > 0 && (

=======
            />
          </Col>
        </Row>
      )}

      <hr />

      {productosFiltrados.length > 0 && (
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
        <Paginacion
          registrosPorPagina={registrosPorPagina}
          totalRegistros={productosFiltrados.length}
          paginaActual={paginaActual}
          establecerPaginaActual={establecerPaginaActual}
          establecerRegistrosPorPagina={establecerRegistrosPorPagina}
        />
<<<<<<< HEAD

      )}

      </div>

=======
      )}

>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
      <ModalRegistroProducto
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoProducto={nuevoProducto}
        manejoCambioInput={manejoCambioInput}
        manejoCambioArchivo={manejoCambioArchivo}
        agregarProducto={agregarProducto}
        categorias={categorias}
      />

      <ModalEdicionProducto
        mostrarModalEdicion={mostrarModalEdicion}
        setMostrarModalEdicion={setMostrarModalEdicion}
        productoEditar={productoEditar}
        manejoCambioInputEdicion={manejoCambioInputEdicion}
        manejoCambioArchivoActualizar={manejoCambioArchivoActualizar}
        actualizarProducto={actualizarProducto}
        categorias={categorias}
      />

      <ModalEliminacionProducto
        mostrarModalEliminacion={mostrarModalEliminacion}
        setMostrarModalEliminacion={setMostrarModalEliminacion}
        eliminarProducto={eliminarProducto}
        producto={productoAEliminar}
      />

<<<<<<< HEAD
      <ModalQRProducto
  mostrar={mostrarModalQR}
  onHide={() => setMostrarModalQR(false)}
  producto={productoQR}
/>

=======
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
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
=======
        onCerrar={() => setToast({ ...toast, mostrar: false })}
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
      />

    </Container>
  );
};

export default Productos;