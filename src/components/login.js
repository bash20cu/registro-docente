import React, { useState } from "react";
import firebaseApp from "../Credentials";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import Uno from "../images/1.jpeg";
import Dos from "../images/2.jpeg";
import Tres from "../images/3.jpeg";

const auth = getAuth(firebaseApp);

const Login = () => {
  const [registro, setRegistro] = useState(false);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const clave = e.target.clave.value;

    if (registro) {
      try {
        
        await createUserWithEmailAndPassword(auth, correo, clave);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        
        await signInWithEmailAndPassword(auth, correo, clave);
      } catch (error) {
        console.log(error); 
      }
    }
  };

  return (
    <div className="row container p-4">
      {/*Esta es la parte de las imagenes */}
      <div className="col-md-8">
        <div id="carouselExample" className="carousel slide">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src={Uno} className="tamanno-imagen" alt="..." />
            </div>
            <div class="carousel-item">
              <img src={Dos} className="tamanno-imagen" alt="..." />
            </div>
            <div class="carousel-item">
              <img src={Tres} className="tamanno-imagen" alt="..." />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/*Esta es la parte del formulario */}
      <div className="col-md-4 p-4">
        <div className="mt-5 ms-5">
          <h1>{registro ? "Registrate" : "Inicia Sesion"}</h1>
          <form onSubmit={handlerSubmit}>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Correo Electronico:{" "}
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Ingresar Correo Electrónico"
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Clave
              </label>
              <input
                type="password"
                id="clave"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Ingresar Clave"
              />
            </div>
            <button className="btn btn-primary" type="submit">
              {registro ? "Registrate" : "Inicia sesion"}
            </button>
          </form>
          <div className="form-group">
            <button
              className="btn btn-secondary mt-4 form-control"
              onClick={() => setRegistro(!registro)}
            >
              {registro
                ? "Ya tienes cuenta? Inicia sesion"
                : "No tienes cuenta? Registrate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
