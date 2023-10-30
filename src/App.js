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

  useEffect(() => {
    // Agrega un evento antes de que la página se recargue
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Elimina el evento al desmontar el componente
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = (event) => {
    const currentUrl = window.location.href;
    window.location.href = currentUrl;

    // Mensaje opcional que se mostrará antes de recargar
    event.returnValue = 'Seguro que deseas recargar la página?';
  };


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
      <Routes>        
        <Route path="/registro-docente" element={<Login />} />
        <Route element={<ProtectedRoute canActivate={isUsuarioAutenticado} />}>
          <Route path="/registro-docente/home" element={<Home />} />
        </Route>
        <Route path="*" element={<h1> Error - 404 - Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
