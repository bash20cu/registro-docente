import React, {useEffect, useState} from "react";
import firebaseApp from "../Credentials";
import { getAuth, signOut } from "firebase/auth";
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc,getDoc, setDoc} from "firebase/firestore";
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const DbTest = async () => {
    //console.log("hola");
    try {
        const datosColegio = await getDocs(collection(db, "colegio"));
        console.log(datosColegio.docs.map(doc => doc.data()));
    } catch (error) {
        console.log(error.message);
    }

};


export default DbTest;