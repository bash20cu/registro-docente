import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import firebaseApp from "../../Credentials";
import { getFirestore, collection, addDoc, setDoc } from "firebase/firestore";
import {  getAuth,} from "firebase/auth";
import crudFirebase from "../../lib/crudFirebase.js";

const firebaseCrud = new crudFirebase();

function AgregarColegioModal(props) {
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
      } catch (error) {
        console.log(error);
      }
    }

    setNombreColegio("");
    props.onHide();
  };

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Colegio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre del Colegio</Form.Label>
            <Form.Control
              type="text"
              value={nombreColegio}
              onChange={(e) => setNombreColegio(e.target.value)}
            />
            {errorBase && (
                <div style={{ color: "red" }}>{errorBase}</div>
              )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleAgregarColegio}>
          Agregar Colegio
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AgregarColegioModal;
