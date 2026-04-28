import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, NavbarBrand, Offcanvas } from "react-bootstrap";
import logo from "../../assets/logo_tienda.png";
import { supabase } from "../../assets/database/supabaseconfig"


const Encabezado = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const manejarToggle = () => setMostrarMenu(!mostrarMenu);
  const [usuario, setUsuario] = useState(null);

useEffect(() => {
  const obtenerUsuario = async () => {
    const { data } = await supabase.auth.getUser();
    setUsuario(data?.user);
  };

  obtenerUsuario();
}, []);
  const manejarNavegacion = (ruta) => {
    navigate(ruta);
    setMostrarMenu(false);
  };

  const cerrarSesion = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      localStorage.removeItem("usuario-supabase");
      setMostrarMenu(false);
      navigate("/login");
    } catch (err) {
      console.error("Error cerrando sesión:", err.message);
    }
  };

  const esLogin = location.pathname === "/login";

  return (
    <Navbar expand="md" fixed="top" className="color-navbar shadow" variant="dark">
      <Container>

        {/* 🔹 LOGO */}
        <Navbar.Brand
          onClick={() => manejarNavegacion("/")}
          className="d-flex align-items-center gap-2 fw-semibold"
          style={{ cursor: "pointer" }}
        >
          <img
            alt="Logo tienda"
            src={logo}
            width="50"
            height="50"
            className="rounded"
          />
          <span className="fs-5">Tienda</span>
        </Navbar.Brand>

        {!esLogin && (
          <Navbar.Toggle onClick={manejarToggle} />
        )}

        {/* 🔹 MENÚ LATERAL */}
        <Navbar.Offcanvas
          placement="end"
          show={mostrarMenu}
          onHide={() => setMostrarMenu(false)}
        >
          <Offcanvas.Header closeButton className="border-bottom">
            <Offcanvas.Title className="fw-semibold">
              Menú principal
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body className="d-flex flex-column justify-content-between">

            {/* 🔹 LINKS */}
           <Nav className="flex-row justify-content-start align-items-center gap-3">

              <Nav.Link onClick={() => manejarNavegacion("/")}>
                <i className="bi bi-house-door me-2"></i>
                Inicio
              </Nav.Link>

              <Nav.Link onClick={() => manejarNavegacion("/categorias")}>
                <i className="bi bi-bookmark me-2"></i>
                Categorías
              </Nav.Link>

              <Nav.Link onClick={() => manejarNavegacion("/productos")}>
                <i className="bi bi-bag me-2"></i>
                Productos
              </Nav.Link>

              <Nav.Link onClick={() => manejarNavegacion("/catalogo")}>
                <i className="bi bi-images me-2"></i>
                Catálogo
              </Nav.Link>

              <hr />

              <Nav.Link onClick={cerrarSesion} className="text-danger">
                <i className="bi bi-box-arrow-right me-2"></i>
                Cerrar sesión
              </Nav.Link>
            </Nav>

            {/* 🔹 USUARIO */}
            <div className="mt-4 p-3 rounded bg-body-secondary small">
              <div className="fw-semibold mb-1">
                <i className="bi bi-person-circle me-2"></i>
                Usuario
              </div>
              <div className="text-muted">
              {usuario?.email || "Sin sesión"}
          </div>
            </div>

          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Encabezado;