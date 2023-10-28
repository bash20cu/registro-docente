import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//Components
import Navigation from "./components/Navigation.js";
import ProtectedRoute from "./components/protectedRoutes.js";

// Pages
import Home from "./pages/home.js";
import Login from "./pages/login.js";



//Base de datos
import firebaseApp from "./Credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);

function App() {
  const [usuario, setUsuario] = useState(null);

  // Verificar si hay un usuario autenticado en el localStorage
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    //console.log(usuario);
    if (usuarioGuardado) {
      const usuarioParseado = JSON.parse(usuarioGuardado);
      setUsuario(usuarioParseado);
    }

    const unsubscribe = onAuthStateChanged(auth, (usuarioFireBase) => {
      if (usuarioFireBase) {
        // Almacenar el usuario en el localStorage
        localStorage.setItem("usuario", JSON.stringify(usuarioFireBase));
        setUsuario(usuarioFireBase);
      } else {
        // Eliminar el usuario del localStorage al cerrar sesión
        localStorage.removeItem("usuario");
        setUsuario(null);
      }
    });

    // Limpia el efecto cuando la verificación se complete
    return () => unsubscribe();
  }, []);

  // Función para verificar si el usuario está autenticado
  const isUsuarioAutenticado = () => {
    return usuario !== null;
  };





  return (
    <div className="App">
      {usuario && (
        <Navigation
          correoUsuario={usuario.email}          
        />
      )}
      <Routes>
        <Route path="*" element={<h1> Error - 404 - Not Found</h1>} />
        <Route path="/registro-docente/" element={<Login />} />
        <Route element={<ProtectedRoute canActivate={isUsuarioAutenticado} />}>
          <Route path="/registro-docente/registro" element={<Home />} />
        </Route>
        <Route element={<ProtectedRoute canActivate={isUsuarioAutenticado} />}>
          <Route
            path="/registro-docente/agregar-colegio"
            // element={
            //   <AgregarColegioModal
            //     show={agregarColegioShow}
            //     onHide={() => setAgregarColegioShow(false)}
            //     onAgregarColegio={handleAgregarColegio}
            //   />
            // }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
