import React from "react";
import {form, InputGroup} from "react-bootstrap";

const CuadroBusquedas = ({ textoBusqueda, manejarCambioBusqueda}) => {
  return (
    <InputGroup style= {{width: "100%", dorderRadius: "0.375rem"}} className="shadow-sm">
      <InputGroup.Text>
      <i className="bi bi-search"></i>
      </InputGroup.Text>
      <form.control
      type="text"
      placeholder= "Buscar..."
      value={textoBusqueda}
      onchange={manejarCambioBusqueda}
      />
    </InputGroup>
  );
};

export default CuadroBusquedas;