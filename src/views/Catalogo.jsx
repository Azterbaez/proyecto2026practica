import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Spinner, Alert, Form } from "react-bootstrap";
import { supabase } from "../assets/database/supabaseconfig";
import TarjetaCatalogo from "../components/catalogo/TarjetaCatalogo";
import CuadroBusqueda from "../components/busquedas/Cuadrobusquedas";

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarDatos = async () => {
    try {
      setCargando(true);

      const [resProductos, resCategorias] = await Promise.all([
        supabase.from("productos").select("*"),
        supabase.from("categorias").select("*"),
      ]);

      if (resProductos.error) throw resProductos.error;
      if (resCategorias.error) throw resCategorias.error;

      setProductos(resProductos.data || []);
      setCategorias(resCategorias.data || []);
    } catch (err) {
      console.error(err);
      setError("Error al cargar datos");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // 🔥 FILTRO CORRECTO
  const productosFiltrados = useMemo(() => {
    let filtrados = [...productos];

    if (categoriaSeleccionada !== "todas") {
      filtrados = filtrados.filter(
        (p) => p.id_categoria == categoriaSeleccionada
      );
    }

    if (textoBusqueda.trim()) {
      const texto = textoBusqueda.toLowerCase();

      filtrados = filtrados.filter((p) =>
        p.nombre?.toLowerCase().includes(texto)
      );
    }

    return filtrados;
  }, [productos, categoriaSeleccionada, textoBusqueda]);

  const manejarCambioCategoria = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };

  const manejarCambioBusqueda = (e) => {
    setTextoBusqueda(e.target.value);
  };

  const obtenerNombreCategoria = (id) => {
    const cat = categorias.find((c) => c.id_categoria === id);
    return cat ? cat.nombre : "Sin categoría";
  };

  return (
    <div className="mt-3 px-1">
      <Row className="mb-2">
        <Col md={4}>
          <Form.Select
            value={categoriaSeleccionada}
            onChange={manejarCambioCategoria}
          >
            <option value="todas">Todas</option>
            {categorias.map((c) => (
              <option key={c.id_categoria} value={c.id_categoria}>
                {c.nombre}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={6}>
          <CuadroBusqueda
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
      </Row>

      {cargando && <Spinner />}

      {!cargando && productosFiltrados.length === 0 && (
        <Alert>No hay productos</Alert>
      )}

      <Row>
        {productosFiltrados.map((p) => (
          <Col key={p.id_producto} md={3}>
            <TarjetaCatalogo
              producto={p}
              categoriaNombre={obtenerNombreCategoria(p.id_categoria)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Catalogo;