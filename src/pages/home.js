import React, {useEffect, useState} from "react";
import firebaseApp from "../Credentials";
import { getAuth, signOut } from "firebase/auth";
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc,getDoc, setDoc} from "firebase/firestore";
import DbTest from "../components/database.js";


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
    //variables de estado
    const [usuario, setUsuario] = useState(valorInicial);
    const [lista, setLista] = useState([]);
    const [subId, setsubId] = useState('');

    const capturarDatos = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })    
    }
    
    //Funcion para guardar los datos a la base de datos
    const guardarDatos = async (e) => {
      e.preventDefault();
      console.log(usuario);
  
      if (subId === '') {
          try {
              const docRef = await addDoc(collection(db, "alumnos"), {
                  ...usuario
              });
  
              // Agregar el nuevo usuario a la lista
              const newUser = { ...usuario, id: docRef.id };
              setLista([...lista, newUser]);
  
          } catch (error) {
              console.log(error);
          }
      } else {
          try {
              await setDoc(doc(db, "alumnos", subId), {
                  ...usuario
              });
  
              // Actualizar la lista con el usuario modificado
              const updatedList = lista.map(item => {
                  if (item.id === subId) {
                      return { ...usuario, id: subId };
                  }
                  return item;
              });
              setLista(updatedList);
  
          } catch (error) {
              console.log(error);
          }
      }
      setUsuario(valorInicial);
      setsubId('');
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
        
        //DbTest();
    },[]);

    //Funcion para eliminar el usuario
    const eliminarUsuario = async (id) => {
      try {
          await deleteDoc(doc(db, "alumnos", id));
  
          // Eliminar el usuario de la lista
          const updatedList = lista.filter(item => item.id !== id);
          setLista(updatedList);
  
      } catch (error) {
          console.log(error);
      }
  }

    //Funcion para actualizar el usuario
    const getOne = async (id) => {
      try {
        const datos = await getDoc(doc(db, "alumnos", id));
        setUsuario(datos.data())
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      if(subId !== ''){
        getOne(subId);
        
      }
    },[subId]);


  return (
    <div className="container">
      <hr />

      <div className="row">
        {/* esta seccion es para el formulario */}
        <div className="col-md-4">
          <h3 className="text-center mb-3">Formulario de registro</h3>
          <form onSubmit={guardarDatos}>
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
                <button className="btn btn-primary mb-2">
                  {subId === '' ? 'Guardar' : 'Actualizar'}
                </button>
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
                            <button className="btn btn-danger m-2" onClick={()=>eliminarUsuario(lista.id)} >Eliminar</button>
                            <button className="btn btn-success m-2" onClick={()=>setsubId(lista.id)}>Editar</button>
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
