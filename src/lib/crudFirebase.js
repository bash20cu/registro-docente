import firebaseApp from "../Credentials";
import { getAuth, signOut } from "firebase/auth";


import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc,getDoc, setDoc} from "firebase/firestore";

const db = getFirestore(firebaseApp);



