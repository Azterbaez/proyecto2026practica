import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";


// bla bla bla //


import { supabase } from "../database/supabaseconfig";
import NotificacionOperacion from "../components/NotificacionOperacion";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import Paginacion from "../components/ordenamiento/Paginacion";
import FormularioVenta from "../components/ventas/FormularioVenta";
import TablaVentas from "../components/ventas/TablaVentas";
import TarjetaVenta from "../components/ventas/TarjetaVenta";

const Ventas = () => {
  const [toast, setToast] = useState({ mostrar: false, mensaje: "", tipo: "" });
  const [ventas, setVentas] = useState([]);
  const [ventasFiltradas, setVentasFiltradas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [ventaAEditar, setVentaAEditar] = useState(null);

  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [productos, setProductos] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [detalles, setDetalles] = useState([]);
  const [totalGeneral, setTotalGeneral] = useState(0);

  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [registrosPorPagina, establecerRegistrosPorPagina] = useState(8);
  const [paginaActual, establecerPaginaActual] = useState(1);

  const ventasPaginadas = ventasFiltradas.slice(
    (paginaActual - 1) * registrosPorPagina,
    paginaActual * registrosPorPagina
  );

  const mostrarToast = (mensaje, tipo) => {
    setToast({ mostrar: true, mensaje, tipo });
  };

  const cargarDatosAuxiliares = async () => {
    try {
      const [clientesRes, empleadosRes, productosRes] = await Promise.all([
        supabase.from("clientes").select("*"),
        supabase.from("empleados").select("*"),
        supabase.from("productos").select("*"),
      ]);

      if (clientesRes.error) throw clientesRes.error;
      if (empleadosRes.error) throw empleadosRes.error;
      if (productosRes.error) throw productosRes.error;

      setClientes(clientesRes.data || []);
      setEmpleados(empleadosRes.data || []);
      setProductos(productosRes.data || []);
    } catch (err) {
      console.error("Error cargando datos auxiliares:", err);
      mostrarToast("Error al cargar datos auxiliares", "error");
    }
  };

  const cargarVentas = async () => {
    try {
      setCargando(true);

      const { data, error } = await supabase
        .from("ventas")
        .select(`
          *,
          clientes (
            nombre_cliente,
            apellido_cliente
          ),
          empleados (
            nombre_empleado,
            apellido_empleado
          ),
          detalles_ventas (
            *,
            productos (
              nombre_producto
            )
          )
        `)
        .order("fecha_venta", { ascending: false });

      if (error) throw error;

      setVentas(data || []);
    } catch (err) {
      console.error("Error al cargar ventas:", err);
      mostrarToast("Error al cargar ventas", "error");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarVentas();
    cargarDatosAuxiliares();
  }, []);

  useEffect(() => {
    if (!ventaAEditar) return;

    const cliente = clientes.find((c) => c.id_cliente === ventaAEditar.id_cliente);
    const empleado = empleados.find((e) => e.id_empleado === ventaAEditar.id_empleado);

    setClienteSeleccionado(cliente || null);
    setEmpleadoSeleccionado(empleado || null);
    setMetodoPago(ventaAEditar.metodo_pago || "efectivo");
    setDetalles(
      ventaAEditar.detalles_ventas?.map((detalle) => ({
        id_producto: detalle.id_producto,
        nombre_producto: detalle.productos?.nombre_producto || "Producto",
        precio: detalle.precio_unitario,
        cantidad: detalle.cantidad,
      })) || []
    );
  }, [ventaAEditar, clientes, empleados]);

  useEffect(() => {
    const total = detalles.reduce(
      (sum, detalle) => sum + detalle.cantidad * detalle.precio,
      0
    );

    setTotalGeneral(total);
  }, [detalles]);

  useEffect(() => {
    const texto = textoBusqueda.trim().toLowerCase();

    if (!texto) {
      setVentasFiltradas(ventas);
      establecerPaginaActual(1);
      return;
    }

    const filtradas = ventas.filter((venta) => {
      const cliente = `${venta.clientes?.nombre_cliente || ""} ${
        venta.clientes?.apellido_cliente || ""
      }`.toLowerCase();
      const empleado = `${venta.empleados?.nombre_empleado || ""} ${
        venta.empleados?.apellido_empleado || ""
      }`.toLowerCase();

      return cliente.includes(texto) || empleado.includes(texto);
    });

    setVentasFiltradas(filtradas);
    establecerPaginaActual(1);
  }, [textoBusqueda, ventas]);

  const resetFormulario = () => {
    setClienteSeleccionado(null);
    setEmpleadoSeleccionado(null);
    setMetodoPago("efectivo");
    setDetalles([]);
    setVentaAEditar(null);
  };

  const abrirNuevaVenta = () => {
    resetFormulario();
    setMostrarFormulario(true);
  };

  const abrirEdicion = (venta) => {
    setVentaAEditar(venta);
    setMostrarFormulario(true);
  };

  const agregarDetalle = (producto, cantidad) => {
    if (!producto || !cantidad) return;

    setDetalles((prev) => {
      const existe = prev.find((d) => d.id_producto === producto.id_producto);

      if (existe) {
        return prev.map((d) =>
          d.id_producto === producto.id_producto
            ? { ...d, cantidad: d.cantidad + cantidad }
            : d
        );
      }

      return [
        ...prev,
        {
          id_producto: producto.id_producto,
          nombre_producto: producto.nombre_producto,
          precio: producto.precio_venta,
          cantidad,
        },
      ];
    });
  };

  const eliminarDetalle = (idProducto) => {
    setDetalles((prev) => prev.filter((d) => d.id_producto !== idProducto));
  };

  const actualizarCantidad = (idProducto, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    setDetalles((prev) =>
      prev.map((d) =>
        d.id_producto === idProducto ? { ...d, cantidad: nuevaCantidad } : d
      )
    );
  };

  const crearDetallesInsert = (idVenta) =>
    detalles.map((detalle) => ({
      id_venta: idVenta,
      id_producto: detalle.id_producto,
      cantidad: detalle.cantidad,
      precio_unitario: detalle.precio,
      subtotal: detalle.cantidad * detalle.precio,
    }));

  const guardarVenta = async () => {
    if (!clienteSeleccionado || !empleadoSeleccionado || detalles.length === 0) {
      mostrarToast("Faltan datos obligatorios", "advertencia");
      return;
    }

    try {
      const ventaPayload = {
        id_cliente: clienteSeleccionado.id_cliente,
        id_empleado: empleadoSeleccionado.id_empleado,
        metodo_pago: metodoPago,
        total: totalGeneral,
      };

      if (ventaAEditar) {
        const { error: ventaError } = await supabase
          .from("ventas")
          .update(ventaPayload)
          .eq("id_venta", ventaAEditar.id_venta);

        if (ventaError) throw ventaError;

        const { error: borrarError } = await supabase
          .from("detalles_ventas")
          .delete()
          .eq("id_venta", ventaAEditar.id_venta);

        if (borrarError) throw borrarError;

        const { error: detallesError } = await supabase
          .from("detalles_ventas")
          .insert(crearDetallesInsert(ventaAEditar.id_venta));

        if (detallesError) throw detallesError;

        mostrarToast("Venta actualizada exitosamente", "exito");
      } else {
        const fechaVenta = new Date()
          .toLocaleString("sv", { timeZone: "America/Managua" })
          .replace(" ", "T");

        const { data: ventaData, error: ventaError } = await supabase
          .from("ventas")
          .insert([{ ...ventaPayload, fecha_venta: fechaVenta }])
          .select()
          .single();

        if (ventaError) throw ventaError;

        const { error: detallesError } = await supabase
          .from("detalles_ventas")
          .insert(crearDetallesInsert(ventaData.id_venta));

        if (detallesError) throw detallesError;

        mostrarToast("Venta registrada exitosamente", "exito");
      }

      resetFormulario();
      setMostrarFormulario(false);
      await cargarVentas();
    } catch (err) {
      console.error("Error al guardar venta:", err);
      mostrarToast("Error al guardar la venta", "error");
    }
  };

  const manejarBusqueda = (e) => {
    setTextoBusqueda(e.target.value);
  };

  return (
    <Container className="vista-contenedor mt-3">
      <div className="vista-panel">
        <header className="vista-encabezado">
          <div className="vista-encabezado__titulo-grupo">
            <div className="vista-encabezado__icono" aria-hidden="true">
              <i className="bi bi-receipt-cutoff"></i>
            </div>
            <div>
              <h2>Ventas</h2>
              <p className="vista-encabezado__subtitulo">
                Registro y seguimiento de transacciones
              </p>
            </div>
          </div>
          <div className="vista-encabezado__acciones">
            <Button variant="primary" onClick={abrirNuevaVenta}>
              <i className="bi bi-plus-lg"></i>
              <span className="d-none d-sm-inline ms-2">Nueva venta</span>
            </Button>
          </div>
        </header>

        <Row className="mb-4">
          <Col md={6} lg={5}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarBusqueda}
              placeholder="Buscar por cliente o empleado..."
            />
          </Col>
        </Row>

        {cargando ? (
          <Row className="text-center my-5">
            <Spinner animation="border" variant="primary" size="lg" />
            <p className="mt-3 text-muted fw-medium">Cargando ventas...</p>
          </Row>
        ) : (
          <Row>
            <Col xs={12} className="d-lg-none">
              <TarjetaVenta ventas={ventasPaginadas} abrirEdicion={abrirEdicion} />
            </Col>

            <Col lg={12} className="d-none d-lg-block">
              <TablaVentas ventas={ventasPaginadas} abrirEdicion={abrirEdicion} />
            </Col>
          </Row>
        )}

        {ventasFiltradas.length > 0 && (
          <Paginacion
            registrosPorPagina={registrosPorPagina}
            totalRegistros={ventasFiltradas.length}
            paginaActual={paginaActual}
            establecerPaginaActual={establecerPaginaActual}
            establecerRegistrosPorPagina={establecerRegistrosPorPagina}
          />
        )}
      </div>

      <FormularioVenta
        mostrar={mostrarFormulario}
        setMostrar={setMostrarFormulario}
        clientes={clientes}
        empleados={empleados}
        productos={productos}
        clienteSeleccionado={clienteSeleccionado}
        setClienteSeleccionado={setClienteSeleccionado}
        empleadoSeleccionado={empleadoSeleccionado}
        setEmpleadoSeleccionado={setEmpleadoSeleccionado}
        metodoPago={metodoPago}
        setMetodoPago={setMetodoPago}
        detalles={detalles}
        totalGeneral={totalGeneral}
        agregarDetalle={agregarDetalle}
        eliminarDetalle={eliminarDetalle}
        actualizarCantidad={actualizarCantidad}
        guardarVenta={guardarVenta}
        ventaAEditar={ventaAEditar}
      />

      <NotificacionOperacion
        mostrar={toast.mostrar}
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        onCerrar={() => setToast((prev) => ({ ...prev, mostrar: false }))}
      />
    </Container>
  );
};

export default Ventas;
