<<<<<<< HEAD
import React from "react";
import { Navigate } from "react-router-dom";

const RutasProtegida = ({ children }) => {
  // Verifica si el usuario está autenticado usando localStorage
  const estaLogueado = !!localStorage.getItem("usuario-supabase");

  // Log para depuración
  console.log("Usuario autenticado:", estaLogueado);

  // Si está autenticado,redirige a la página de login
  return estaLogueado ? children : <Navigate to="/login" replace />;
};

export default RutasProtegida;
=======

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../assets/database/supabaseconfig";

const RutaProtegida = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const verificarSesion = async () => {
      const { data } = await supabase.auth.getSession();
      setUsuario(data.session);
      setCargando(false);
    };

    verificarSesion();
  }, []);

  if (cargando) return <p>Cargando...</p>;

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RutaProtegida;

>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
