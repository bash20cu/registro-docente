import React, { useState } from "react";
import { Button, Modal, Form} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import crudFirebase from "../../lib/crudFirebase.js";
import {  getAuth,} from "firebase/auth";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';


const firebaseCrud = new crudFirebase();

function AgregarColegioModal(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [nombreColegio, setNombreColegio] = useState("");

  const handleClose = () => {
    navigate('/registro-docente');
  };

  const handleShow = () => setShow(true);


  const handleAgregarAlumno = () => {
    // Aquí puedes enviar los datos del colegio al servidor o realizar alguna acción necesaria
    // Por ejemplo, puedes usar una función props para manejar la lógica de agregar colegios.
    props.onAgregarColegio(nombreColegio);
    setNombreColegio("");
    props.onHide();
  };

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Lorem count={2} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );




  // return (
  //   <Modal {...props} centered>
  //     <Modal.Header closeButton>
  //       <Modal.Title>Agregar Colegio</Modal.Title>
  //     </Modal.Header>
  //     <Modal.Body>
  //       <Form>
  //         <Form.Group>
  //           <Form.Label>Nombre del Colegio</Form.Label>
  //           <Form.Control
  //             type="text"
  //             placeholder="Nombre del colegio"
  //             value={nombreColegio}
  //             onChange={(e) => setNombreColegio(e.target.value)}
  //           />
  //         </Form.Group>
  //       </Form>
  //     </Modal.Body>
  //     <Modal.Footer>
  //       <Button variant="secondary" onClick={props.onHide}>
  //         Cerrar
  //       </Button>
  //       <Button variant="primary" onClick={handleAgregarAlumno}>
  //         Agregar Colegio
  //       </Button>
  //     </Modal.Footer>
  //   </Modal>
  // );
}

export default AgregarColegioModal;
