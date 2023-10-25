import React, {useEffect, useState} from "react";
import firebaseApp from "../Credentials";
import { getAuth, signOut } from "firebase/auth";
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc,getDoc} from "firebase/firestore";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const Home = ({ correoUsuario }) => {

    const valorInicial = {
        nombre: '',
        apellido1: '',
        apellido2: '',
        edad: '',
        grupo: ''
        }

    const [usuario, setUsuario] = useState(valorInicial);
    const [lista, setLista] = useState([]);

    const capturarDatos = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })    
    }

    const enviarDatos = async (e) => {
        e.preventDefault();
        console.log(usuario);

        try {
            await addDoc(collection(db,"alumnos"), {
                ...usuario
            });
            
        } catch (error) {
            console.log(error);            
        }


        setUsuario(valorInicial);
    }

    {/* Funciones para renderizar la lista de usuarios */}

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const datos = await getDocs(collection(db,"alumnos"));
                const arrayDatos = []
                datos.forEach((dato) => {
                    arrayDatos.push({...dato.data(), id: dato.id})
                })
                setLista(arrayDatos);
                
            } catch (error) {
                console.log(error);
            }
        }
        obtenerDatos();
    },[lista]);



  return (
    <div className="container">
      <p>
        Bienvenido, <strong>{correoUsuario}</strong>, Haz iniciaso sesión
      </p>
      <button className="btn btn-primary" onClick={() => signOut(auth)}>
        Cerrar sesión
      </button>
      <hr />

      <div className="row">
        {/* esta seccion es para el formulario */}
        <div className="col-md-4">
          <h3 className="text-center mb-3">Formulario de registro</h3>
          <form onSubmit={enviarDatos}>
            <div className="card card-body">
              <div className="form-group">
                <input type="text" className="form-control mb-2" placeholder="Nombre" name="nombre"
                onChange={capturarDatos} value={usuario.nombre}/>
                <input type="text" className="form-control mb-2" placeholder="Primer Apellido" name="apellido1" 
                onChange={capturarDatos} value={usuario.apellido1}/>
                <input type="text" className="form-control mb-2" placeholder="Segundo Apellido" name="apellido2"
                onChange={capturarDatos} value={usuario.apellido2}/>
                <input type="text" className="form-control mb-2" placeholder="Edad" name="edad"
                onChange={capturarDatos} value={usuario.edad}/>
                <input type="text" className="form-control mb-2" placeholder="Grupo" name="grupo" 
                onChange={capturarDatos} value={usuario.grupo}/>
              </div>
                <button className="btn btn-primary mb-2">Guardar</button>
            </div>
          </form>
        </div>
        {/* esta seccion es para la tabla de usuarios */}
        <div className="col-md-6">
          <h2 className="text-center mb-2 ">Lista de usuarios</h2>
          <div className="container card">
            <div className="card-body">
                {
                    lista.map(lista => (
                        <div  key={lista.id}>
                            <p>Nombre: {lista.nombre}</p>
                            <p>Apellido: {lista.apellido1}</p>
                            <p>Apellido: {lista.apellido2}</p>
                            <p>Edad: {lista.edad}</p>
                            <p>Grupo: {lista.grupo}</p>
                            <button className="btn btn-danger float-end" >Eliminar</button>
                            <button className="btn btn-success">Editar</button>
                            <hr/>
                        </div>
                    ))
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
