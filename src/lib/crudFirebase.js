import firebaseApp from "../Credentials";
import { getAuth, signOut } from "firebase/auth";


import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc,getDoc, setDoc} from "firebase/firestore";

const db = getFirestore(firebaseApp);


//Crea una clase que pueda llamar desde las demas js, que contenga un CRUD a la base de datos firebase,
//para poder usarla en cualquier parte del codigo

class crudFirebase{
    //Metodo para agregar un nuevo usuario a la base de datos
    async agregar(datos, dbDocument) {
        try {
            const docRef = await addDoc(collection(db,dbDocument ), {
                ...datos
            });

            // Agregar el nuevo usuario a la lista
            const newUser = { ...datos, id: docRef.id };
            return newUser;

        } catch (error) {
            console.log(error);
        }
    }
    //Metodo para obtener todos los usuarios de la base de datos
    async obtenerUsuarios(dbDocument){
        const querySnapshot = await getDocs(collection(db, dbDocument));
        const lista = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return lista;
    }
    //Metodo para eliminar un usuario de la base de datos
    async eliminar(dbDocument,id){
        try {
            await deleteDoc(doc(db, dbDocument, id));
            return id;
        } catch (error) {
            console.log(error);
        }
    }
    //Metodo para obtener un usuario de la base de datos
    async obtener(id,dbDocument){
        const docRef = doc(db, dbDocument, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No such document!");
        }
    }
    //Metodo para modificar un usuario de la base de datos
    async modificar(id, datosUsuario, dbDocument){
        try {
            await setDoc(doc(db, dbDocument, id), {
                ...datosUsuario
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default crudFirebase;

