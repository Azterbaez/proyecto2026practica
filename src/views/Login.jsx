import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormularioLogin from "../components/Login/FormularioLogin";
<<<<<<< HEAD
import { supabase } from "../database/supabaseconfig";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);
=======
import { supabase } from "../assets/database/supabaseconfig";


function Login() {

  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);

  // NUEVAS FUNCIONES
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [recordarme, setRecordarme] = useState(false);
  const [cargando, setCargando] = useState(false);

  const navegar = useNavigate();

<<<<<<< HEAD
  useEffect(() => {
    const correoGuardado = localStorage.getItem("correo-recordado");
=======
  // CARGAR CORREO RECORDADO
  useEffect(() => {

    const correoGuardado =
      localStorage.getItem("correo-recordado");

>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
    if (correoGuardado) {
      setUsuario(correoGuardado);
      setRecordarme(true);
    }
<<<<<<< HEAD
  }, []);

  const iniciarSesion = async () => {
    try {
=======

  }, []);

  const iniciarSesion = async () => {

    try {

>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
      if (!usuario || !contrasena) {
        setError("Completa todos los campos");
        return;
      }

      setError(null);
      setCargando(true);

      const { data, error: errorSupabase } =
        await supabase.auth.signInWithPassword({
          email: usuario.trim().toLowerCase(),
          password: contrasena,
        });

      if (errorSupabase) {
        setError("Usuario o contraseña incorrectos");
        setCargando(false);
        return;
      }

<<<<<<< HEAD
      if (recordarme) {
        localStorage.setItem("correo-recordado", usuario);
      } else {
        localStorage.removeItem("correo-recordado");
      }

      if (data.user) {
        localStorage.setItem("usuario-supabase", data.user.id);
        navegar("/");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
      console.error("Error en la solicitud:", err);
=======
      // GUARDAR CORREO SI ACTIVA "RECORDARME"
      if (recordarme) {
        localStorage.setItem(
          "correo-recordado",
          usuario
        );
      } else {
        localStorage.removeItem(
          "correo-recordado"
        );
      }

      if (data.user) {

        localStorage.setItem(
          "usuario-supabase",
          data.user.id
        );

        navegar("/");
      }

    } catch (err) {

      setError("Error al conectar con el servidor");

      console.error(
        "Error en la solicitud:",
        err
      );

>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
    } finally {
      setCargando(false);
    }
  };

<<<<<<< HEAD
=======
  // ENTER PARA INICIAR SESIÓN
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
  const manejarEnter = (e) => {
    if (e.key === "Enter") {
      iniciarSesion();
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    const usuarioGuardado = localStorage.getItem("usuario-supabase");
    if (usuarioGuardado) {
      navegar("/");
    }
  }, [navegar]);

  return (
    <div className="login-pagina">
      <div className="login-tarjeta">
        <div className="login-tarjeta__marca">
          <h1>Sistema de ventas</h1>
          <p>Ingresa con tu cuenta de empleado</p>
=======

    const usuarioGuardado =
      localStorage.getItem(
        "usuario-supabase"
      );

    if (usuarioGuardado) {
      navegar("/");
    }

  }, [navegar]);

  const estiloContenedor = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",

    backgroundImage:
      "linear-gradient(rgba(15,23,42,0.75), rgba(15,23,42,0.75)), url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1972&auto=format&fit=crop')",

    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const estiloCard = {
    width: "100%",
    maxWidth: "450px",
    padding: "40px",
    borderRadius: "28px",
    background: "rgba(255,255,255,0.10)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow:
      "0 20px 60px rgba(0,0,0,0.35)",
  };

  return (

    <div style={estiloContenedor}>

      <div style={estiloCard}>

        <div className="text-center mb-4">

          <h1
            style={{
              color: "#fff",
              fontWeight: "700",
              marginBottom: "10px"
            }}
          >
            Sistema de Ventas
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.75)"
            }}
          >
            Bienvenido nuevamente
          </p>

>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
        </div>

        <FormularioLogin
          usuario={usuario}
          contrasena={contrasena}
          error={error}
          setUsuario={setUsuario}
          setContrasena={setContrasena}
          iniciarSesion={iniciarSesion}
<<<<<<< HEAD
=======

          // NUEVAS PROPS
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
          mostrarPassword={mostrarPassword}
          setMostrarPassword={setMostrarPassword}
          recordarme={recordarme}
          setRecordarme={setRecordarme}
          cargando={cargando}
          manejarEnter={manejarEnter}
        />
<<<<<<< HEAD
      </div>
=======

      </div>

>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
    </div>
  );
}

export default Login;
