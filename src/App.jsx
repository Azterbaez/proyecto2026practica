
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Encabezado from "./components/navegacion/Encabezado";
import Inicio from "./views/inicio";
import Categorias from "./views/Categorias";
import Catalogo from "./views/Catalogo";
import Productos from "./views/Productos";
import Login from "./views/Login";
import RutaProtegida from "./components/rutas/RutasProtegida";
import Pagina404 from "./views/Pagina404";
import "./App.css";

const App = () => {
  return (
    <Router>

      <Encabezado />

      <main className="margen-superior-main">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<RutaProtegida><Inicio /></RutaProtegida>} />
          <Route path="/Categorias" element={<RutaProtegida><Categorias /></RutaProtegida>} />
          <Route path="/Catalogo" element={<Catalogo />} />
          <Route path="/Productos" element={<RutaProtegida><Productos /></RutaProtegida>} />
          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </main>

    </Router>
  );
}

export default App;