
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

