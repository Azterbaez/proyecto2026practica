import react, { useState } from "react";
import { useNavigate, useLocation } from "react-bootstrap";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import IMG_20260208_133934 from "../../IMG_20260208_133934.jpg";
import { supabase } from "../../database/supabaseconfig";

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
        console.error("Error cerando sesión:", error.message);
    }
};

const esLogin = location.pathname === "/login";
const esCatalogo =
    location.pathname === "/catalogo" &&
    localStorage.getItem("usuario-supabase") === null;

// contenido del menu 

let contenidoMenu;

if (esLogin) {
    contenidoMenu = (
        <Nav className="ms-auto pe-2">
            <Nav.Link
                onClick={() => manejarNavegacion("/login")}
                className={mostrarMenu ? "color-texto-marca" : "text-white"}
            >
                <i className="bi bi-person-fill-lock me-2"></i>
                Iniciar sesión
            </Nav.Link>
        </Nav>
    );
}
else if (esCatalogo) {
    contenidoMenu = (
        <Nav className="ms-auto pe-2">
            <Nav.Link
                onClick={() => manejarNavegacion("/catalogo")}
                className={mostrarMenu ? "color-texto-marca" : "text-white"}
            >
                <i className="bi bi-images me-2"></i>
                <strong>Catálogo</strong>
            </Nav.Link>
        </Nav>
    );
}
else {
    contenidoMenu = (
        <Nav className="ms-auto pe-2">
            {/* Inicio */}
            <Nav.Link
                onClick={() => manejarNavegacion("/")}
                className={mostrarMenu ? "color-texto-marca" : "text-white"}
            >
                {mostrarMenu ? <i className="bi bi-house-fill me-2"></i> : null}
                <strong>Inicio</strong>
            </Nav.Link>

            {/* Categorías */}
            <Nav.Link
                onClick={() => manejarNavegacion("/categorias")}
                className={mostrarMenu ? "color-texto-marca" : "text-white"}
            >
                {mostrarMenu ? <i className="bi bi-bookmark-fill me-2"></i> : null}
                <strong>Categorías</strong>
            </Nav.Link>

            {/* Productos */}
            <Nav.Link
                onClick={() => manejarNavegacion("/productos")}
                className={mostrarMenu ? "color-texto-marca" : "text-white"}
            >
                {mostrarMenu ? <i className="bi bi-bag-heart-fill me-2"></i> : null}
                <strong>Productos</strong>
            </Nav.Link>

            {/* Catálogo público (desde admin) */}
            <Nav.Link
                onClick={() => manejarNavegacion("/catalogo")}
                className={mostrarMenu ? "color-texto-marca" : "text-white"}
            >
                {mostrarMenu ? <i className="bi bi-images me-2"></i> : null}
                <strong>Catálogo</strong>
            </Nav.Link>

            <hr />

            {/* Cerrar sesión */}
            {mostrarMenu && (
                <Nav.Link
                    onClick={cerrarSesion}
                    className={mostrarMenu ? "color-texto-marca" : "text-white"}
                >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Cerrar sesión
                </Nav.Link>
            )}

            <hr />

            {/* Información del usuario y botón cerrar sesión */}
            {mostrarMenu && (
                <div className="mt-3 p-3 rounded bg-light text-dark">
                    <p className="mb-2">
                        <i className="bi bi-envelope-fill me-2"></i>
                        {localStorage.getItem("usuario-supabase")?.toLowerCase() || "Usuario"}
                    </p>

                    <button
                        className="btn btn-outline-danger mt-3 w-100"
                        onClick={cerrarSesion}
                    >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Cerrar sesión
                    </button>
                </div>
            )}
        </Nav>
    );
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

            {/* Botón del menú */}
            {!esLogin && (
                <Navbar.Toggle
                    aria-controls="menu-offcanvas"
                    onClick={manejarToggle}
                />
            )}

            {/* Menú lateral */}
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
export default Encabezado;
  