import React, { useState } from "react";
//import { Button, Modal, Form } from "react-bootstrap";
import firebaseApp from "../../Credentials";
import { getFirestore, collection, addDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import crudFirebase from "../../lib/crudFirebase.js";
import CustomModal from "./customModal.js";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const firebaseCrud = new crudFirebase();

function AgregarColegioModal({ isOpen, onClose, triggerReload }) {
  const [show, setShow] = useState(false);
  const [nombreColegio, setNombreColegio] = useState("");
  const [errorBase, setErrorBase] = useState(null);
  const auth = getAuth(firebaseApp);

  const handleShow = () => setShow(true);

  const handleAgregarColegio = async () => {
    //Validar input
    if (!nombreColegio) {
      console.log(nombreColegio);
      setErrorBase("Debes ingresar el nombre del colegio");
      return;
    } else {
      //datos a agregar
      //const uid = JSON.parse(localStorage.getItem("usuario"));

      const datos = {
        nombre_colegio: nombreColegio,
        fecha_entrada: Date(),
        activo: true,
        id_usuario: auth.currentUser.uid,
      };

      console.log(datos.id_usuario);
      //Agregar colegio a la coleccion

      try {
        await firebaseCrud.agregar(datos, "colegio");
        triggerReload();
      } catch (error) {
        console.log(error);
      }
    }

    setNombreColegio("");
    //props.onHide();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Colegio</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nombre del colegio</FormLabel>
              <Input
                value={nombreColegio}
                onChange={(e) => setNombreColegio(e.target.value)}
              />
              {errorBase && (
                <div style={{ color: "red" }}>{errorBase} & TO-DO</div>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAgregarColegio}>
              Crear
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AgregarColegioModal;
