import React, {useEffect, useState} from "react";

import firebaseApp from "../Credentials";
import { getAuth, signOut } from "firebase/auth";
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc,getDoc, setDoc} from "firebase/firestore";
import DbTest from "../components/database.js";


const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


const Home = () => {

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
      <h1>Home page</h1>
      </div>
  );
};

export default Home;
