<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Encabezado from "./components/navegacion/Encabezado";

=======

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Encabezado from "./components/navegacion/Encabezado";
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
import Inicio from "./views/Inicio";
import Categorias from "./views/Categorias";
import Catalogo from "./views/Catalogo";
import Productos from "./views/Productos";
<<<<<<< HEAD
import Clientes from "./views/Clientes";  
import Ventas from "./views/Ventas";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import RutasProtegida from "./components/rutas/RutasProtegida";
import Pagina404 from "./views/Pagina404";
import Empleados from "./views/Empleados";

=======
import Empleados from "./views/Empleados";
import Clientes from "./views/Clientes";
import Ventas from "./views/Ventas";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import RutaProtegida from "./components/rutas/RutasProtegida";
import Pagina404 from "./views/Pagina404";
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
import "./App.css";

const App = () => {
  return (
    <Router>
<<<<<<< HEAD
      <Encabezado />

      <main className="margen-superior-main">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route 
            path="/" 
            element={
              <RutasProtegida>
                <Inicio />
              </RutasProtegida>
            } 
          />
          
          <Route 
            path="/Categorias" 
            element={
              <RutasProtegida>
                <Categorias />
              </RutasProtegida>
            } 
          />
          <Route 
            path="/clientes" 
            element={
              <RutasProtegida>
                <Clientes />
              </RutasProtegida>
            } 
          />  
          
          <Route path="/catalogo" element={<Catalogo />} />
          
          <Route 
            path="/productos" 
            element={
              <RutasProtegida>
                <Productos />
              </RutasProtegida>
            } 
          />
          
          <Route
            path="/empleados"
            element={
              <RutasProtegida>
                <Empleados />
              </RutasProtegida>
            }
          />

          <Route
            path="/ventas"
            element={
              <RutasProtegida>
                <Ventas />
              </RutasProtegida>
            }
          />

          <Route
            path="/dashboard"
            element={
              <RutasProtegida>
                <Dashboard />
              </RutasProtegida>
            }
          />

          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </main>
=======
      <Routes>

        {/* 🔓 Ruta pública */}
        <Route path="/login" element={<Login />} />


        {/* 🔒 Rutas con Navbar */}
        <Route
          path="/*"
          element={
            <>
              <Encabezado />
              <main className="margen-superior-main">
                <Routes>
                  <Route path="/" element={<RutaProtegida><Inicio /></RutaProtegida>} />
                  <Route path="/Categorias" element={<RutaProtegida><Categorias /></RutaProtegida>} />
                  <Route path="/Catalogo" element={<Catalogo />} />
                  <Route path="/Productos" element={<RutaProtegida><Productos /></RutaProtegida>} />
                  <Route path="/empleados" element={<RutaProtegida><Empleados /></RutaProtegida>} /> 
                  <Route path="/clientes" element={<RutaProtegida><Clientes /></RutaProtegida>} /> 
                  <Route path="/ventas" element={<RutaProtegida><Ventas /></RutaProtegida>} />
                  <Route path="/dashboard" element={<RutaProtegida> <Dashboard/> </RutaProtegida>} />
                  <Route path="*" element={<Pagina404 />} />
                </Routes>
              </main>
            </>
          }
        />

      </Routes>
>>>>>>> ec2a97295fc5201f05148feda443b310b223b0fe
    </Router>
  );
};

export default App;