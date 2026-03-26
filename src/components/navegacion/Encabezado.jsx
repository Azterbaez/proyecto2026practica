import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
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
    const esCatalogo =
        location.pathname === "/catalogo" &&
        localStorage.getItem("usuario-supabase") === null;

    let contenidoMenu;

    if (esLogin) {
        contenidoMenu = (
            <Nav className="ms-auto pe-2">
                <Nav.Link onClick={() => manejarNavegacion("/login")}>
                    <i className="bi-person-fill-lock me-2"></i>
                    Iniciar sesión
                </Nav.Link>
            </Nav>
        );
    } else {
        contenidoMenu = (
            <Nav className="ms-auto pe-2">
                <Nav.Link onClick={() => manejarNavegacion("/")}>
                    <strong>Inicio</strong>
                </Nav.Link>

                <Nav.Link onClick={() => manejarNavegacion("/categorias")}>
                    <strong>Categorías</strong>
                </Nav.Link>

                <Nav.Link onClick={() => manejarNavegacion("/productos")}>
                    <strong>Productos</strong>
                </Nav.Link>

                <Nav.Link onClick={() => manejarNavegacion("/catalogo")}>
                    <strong>Catálogo</strong>
                </Nav.Link>

                <hr />

                {!mostrarMenu && (
                    <Nav.Link onClick={cerrarSesion}>
                        <i className="bi-box-arrow-right"></i>
                    </Nav.Link>
                )}

                <hr />

                {mostrarMenu && (
                    <div className="mt-3 p-3 rounded bg-light text-dark">
                        <p className="mb-2">
                            <i className="bi-envelope-fill me-2"></i>
                            {localStorage.getItem("usuario-supabase")?.toLowerCase() || "Usuario"}
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
            </Nav>
        );
    }

    return (
        <Navbar expand="md" fixed="top" className="color-navbar shadow-lg" variant="dark">
            <Container>
                <Navbar.Brand
                    onClick={() => manejarNavegacion(esCatalogo ? "/catalogo" : "/")}
                    style={{ cursor: "pointer" }}
                >
                    <img src={logo} width="45" height="45" alt="" />
                    <strong className="ms-2">Tienda</strong>
                </Navbar.Brand>

                {!esLogin && (
                    <Navbar.Toggle onClick={manejarToggle} />
                )}

                <Navbar.Offcanvas
                    placement="end"
                    show={mostrarMenu}
                    onHide={() => setMostrarMenu(false)}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Menú tienda </Offcanvas.Title>
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