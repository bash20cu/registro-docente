import React, {useState} from 'react';
import './App.css';
import Home from './components/home.js';
import Login from './components/login.js';

import firebaseApp from './Credentials';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
const auth = getAuth(firebaseApp);


function App() {
  const [usuario, setUsuario] = useState(null);

  onAuthStateChanged(auth, (usuarioFireBase) => {
    if (usuarioFireBase) {
      setUsuario(usuarioFireBase);
    } else {
      setUsuario(null);
    }
  });

  return (
    <div className="App">
      {usuario ? <Home correoUsuario = {usuario.email} /> : <Login/>}
    </div>
  );
}

export default App;
