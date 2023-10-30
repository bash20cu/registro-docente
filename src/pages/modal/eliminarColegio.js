//crud para eliminar colegio
import { useState } from "react";
import crudFirebase from "../../lib/crudFirebase";
import firebaseApp from "../../Credentials";
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
  } from '@chakra-ui/react'
const crud = new crudFirebase();

function EliminarColegioModal({ isOpen, onClose }) {
  const [errorBase, setErrorBase] = useState(null);
  console.log("eliminar colegio");

  const  handleEliminarColegio = async () => {

    console.log("eliminar colegio");
    try {
        
    } catch (error) {
        setErrorBase(error.message);
        console.log(errorBase);
    }

  }


  return(
    <>
    <CustomModal
  isOpen={isOpen}
  onClose={onClose}
  title="Eliminar Colegio"
  content="¿Estás seguro de que deseas eliminar este colegio?"
  onConfirm={handleEliminarColegio}
/>







    {/* <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar Colegio</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Nombre del colegio</FormLabel>        
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} 
          onClick={handleAgregarColegio} >
            Crear
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal> */}
    </>

  )



}

export default EliminarColegioModal;
