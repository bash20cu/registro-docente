import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Routes, Route } from 'react-router-dom';


//Components
import Navigation from './components/Navigation.js';


// Pages
import Home from './pages/home.js';
import Login from './pages/login.js';


import firebaseApp from './Credentials';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
const auth = getAuth(firebaseApp);


function App() {
  const [usuario, setUsuario] = useState(null);

    // Verificar si hay un usuario autenticado en el localStorage
    useEffect(() => {
      const usuarioGuardado = localStorage.getItem('usuario');
      if (usuarioGuardado) {
        setUsuario(JSON.parse(usuarioGuardado));
      }
  
      onAuthStateChanged(auth, (usuarioFireBase) => {
        if (usuarioFireBase) {
          // Almacenar el usuario en el localStorage
          localStorage.setItem('usuario', JSON.stringify(usuarioFireBase));
          setUsuario(usuarioFireBase);
        } else {
          // Eliminar el usuario del localStorage al cerrar sesión
          localStorage.removeItem('usuario');
          setUsuario(null);
        }
      });
    }, []);

  return (
    <div className="App">
      {usuario && <Navigation correoUsuario = {usuario.email}/>}
      {usuario ? <Home correoUsuario = {usuario.email} /> : <Login/>}
    </div>
  );
}

export default App;
