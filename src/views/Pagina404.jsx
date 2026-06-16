<<<<<<< HEAD
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Pagina404() {
  return (
    <Container className="pagina-error vista-contenedor">
      <p className="pagina-error__codigo">404</p>
      <h1>Página no encontrada</h1>
      <p>La ruta que buscas no existe o fue movida.</p>
      <Button as={Link} to="/" variant="primary">
        Volver al inicio
      </Button>
    </Container>
  );
}

=======
import React from "react";
function Pagina404(){
  return <h1> Pajina no encontrada </h1>
}
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
export default Pagina404;
