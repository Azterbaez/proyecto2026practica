import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import logo from '../../assets/logo_tienda.png';
import { supabase } from '../../assets/database/supabaseconfig';

const Encabezado = () =>{
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
    } catch (error) {
      console.error("Error cerrando sesión:", error.message);
    }
  };

  const esLogin = location.pathname === "/login";
  const esCatalogo =
    location.pathname === "/catalogo" &&
    localStorage.getItem("usuario-supabase") === null;

// Contenido del menú
let contenidoMenu;

if (esLogin) {
  contenidoMenu = (
    <Nav className="ms-auto pe-2">
      <Nav.Link
        onClick={() => manejarNavegacion("/login")}
        className={mostrarMenu ? "color-text-marca": "text-white"}
      >
        <i className="bi-person-fill-lock me-2"></i>
        Iniciar sesión
      </Nav.Link>
    </Nav>
  );
} else {
  if (esCatalogo) {
    contenidoMenu = (
      <Nav className="ms-auto pe-2">
        <Nav.Link
          onClick={() => manejarNavegacion("/catalogo")}
          cclassName={mostrarMenu ? "color-text-marca": "text-white"}
        >
          <i className="bi-bag me-2"></i>
          <strong>Catálogo</strong>
        </Nav.Link>
      </Nav>
    );
  } else {
    contenidoMenu = (
      <>
      <Nav className="ms-auto pe-2">
        <Nav.Link
          onClick={() => manejarNavegacion("/")}
          className={mostrarMenu ? "color-text-marca": "text-white"}
        >
          {mostrarMenu ? <i className="bi-house-door-fill me-2"></i> : null}
          <strong>Inicio</strong>
        </Nav.Link>

        <Nav.Link
          onClick={() => manejarNavegacion("/categorias")}
          className={mostrarMenu ? "color-text-marca": "text-white"}
          >
              {mostrarMenu ? <i className="bi-house-door-fill me-2"></i> : null}
               <strong>Inicio</strong>
        </Nav.Link>

        <Nav.Link
          onClick={() => manejarNavegacion("/productos")}
          className={mostrarMenu ? "color-text-marca": "text-white"}
          >
              {mostrarMenu ? <i className="bi-house-door-fill me-2"></i> : null}
               <strong>Inicio</strong>
        </Nav.Link>

         <Nav.Link
          onClick={() => manejarNavegacion("/catalogo")}
          className={mostrarMenu ? "color-text-marca": "text-white"}
          >
              {mostrarMenu ? <i className="bi-house-door-fill me-2"></i> : null}
               <strong>Inicio</strong>
        </Nav.Link>
        
      <hr />

     {/* Icono cerrar secion en barra superiror */}
      {mostrarMenu ? null :(
        <Nav.Link
        onClick={cerrarSesion}
        className={mostrarMenu ? "color-text-marca" : "text-white"}
          >
<i className="bi-box-arrow-right me-2"></i> 
          </Nav.Link>
      )}
      <hr />
      </Nav>
      {/* informacion de usuario y boton cerrar secion */}
     {mostrarMenu && (
      <div className="mt-3 p-3 rounded bg-light text-dark">
     <p className="mb-2">
      <i className="bi-evelope-fill me-2"></i>
      {localStorage.getItem("usuario-supabase")?.toLocaleLowerCase ()|| "Usuario"}
     </p>

    <button 
    className="btn btn-outline-danger mt-3 w-100"
    onClick={cerrarSesion}
    >
      <i className="bi-box-arrow-right me-2"></i>
      Cerrar sesión
    </button>
      </div>
     )}
     </>
    );
  }
  }
  return (
    <Navbar expand="md" fixed="top" className="color-navbar shadow-lg" variant="dark">
      <Container>
        <Navbar.Brand
          onClick={() => manejarNavegacion(esCatalogo ? "/catalogo" : "/")}
          className="text-white fw-bold d-flex align-items-center"
          style={{ cursor: "pointer" }}
        >
          <img
            alt=""
            src={logo}
            width="45"
            height="45"
            className="d-inline-block me-2"
          />
          <strong>
            <h4 className="mb-0">Discosa</h4>
          </strong>
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
            <Offcanvas.Title>Menú Discosa</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {contenidoMenu}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
export default Encabezado;
