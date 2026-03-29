import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, NavbarBrand, Offcanvas } from "react-bootstrap";
import logo from "../../assets/logo_tienda.png";
import { supabase } from "../../assets/database/supabaseconfig"


const Encabezado = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const manejarToggle = () => setMostrarMenu(!mostrarMenu);

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
    <Navbar expand="md" fixed="top" className="color-navbar shadow-lg" variant="dark">
      <Container>
        <Navbar.Brand
          onClick={() => manejarNavegacion("/")}
          className="text-white fw-bold d-flex align-items-center"
          style={{ cursor: "pointer" }}
        >
          <img
            alt="Logo tienda"
            src={logo}
            width="70"
            height="70"
            className="d-inline-block me-2"
          />
          <h4 className="ms-2 fw-bold mb-0">Tienda</h4>
        </Navbar.Brand>

        {!esLogin && (
          <Navbar.Toggle
            aria-controls="menu-offcanvas"
            onClick={manejarToggle}
          />
        )}

        <Navbar.Offcanvas
          id="menu-offcanvas"
          placement="end"
          show={mostrarMenu}
          onHide={() => setMostrarMenu(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title> Menú </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body className="bg-light">
            {!esLogin && (
              <>
                <Nav className="ms-auto pe-2 gap-2">

                  <Nav.Link onClick={() => manejarNavegacion("/")}>
                    <i className="bi-house-door-fill me-2"></i>
                    <strong>Inicio</strong>
                  </Nav.Link>

                  <Nav.Link onClick={() => manejarNavegacion("/categorias")}>
                    <i className="bi-bookmark-fill me-2"></i>
                    <strong>  Categorías  </strong>
                  </Nav.Link>

                  <Nav.Link onClick={() => manejarNavegacion("/productos")}>
                    <i className="bi-bag-heart-fill me-2"></i>
                    <strong>  Productos  </strong>
                  </Nav.Link>

                  <Nav.Link onClick={() => manejarNavegacion("/catalogo")}>
                    <i className="bi-image me-2"></i>
                    <strong>  Catálogo  </strong>
                  </Nav.Link>

                  <hr />

                  <Nav.Link onClick={cerrarSesion}>
                    <i className="bi-box-arrow-right me-2"></i>
                    Cerrar sesión
                  </Nav.Link>

                </Nav>

                <div className="mt-3 p-3 rounded bg-light text-dark">
                  <p className="mb-2">
                    <i className="bi-envelope-fill me-2"></i>
                    {localStorage.getItem("usuario-supabase")?.toLowerCase() || "Usuario"}
                  </p>
                </div>
              </>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Encabezado;