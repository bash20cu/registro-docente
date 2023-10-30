import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navigation.css'
import { Navigate, Link} from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../Credentials";
import { useDisclosure } from "@chakra-ui/react"


//Modal
import AgregarColegioModal from "../pages/modal/agregarColegio.js";

//Constantes
const auth = getAuth(firebaseApp);


function Navigation({ triggerReload }) {

  //const [usuario, setUsuario] = useState("");
  const [loading, setLoading] = useState(true);
  const usuarioGuardado = localStorage.getItem("usuario");
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  const [reloadData, setReloadData] = useState(false);

  // Verificar si hay un usuario autenticado en el localStorage
  //console.log(usuario.email);



  //Cerrar Sesion del usuario
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('usuario');
      //console.log('Sesión cerrada');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  //Props de modal agregar colegio
  const [agregarColegioShow, setAgregarColegioShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()

  
  const handleAgregarColegioClick = () => {    
    //console.log('Agregar colegio');
    onOpen();
    //setAgregarColegioShow(true);
    //console.log(setAgregarColegioShow);
  }; 
  
  return (
    <div>
    <Navbar expand="lg" sticky="top" className="bg-body-tertiary">
      <Container>        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/registro-docente/home' >  Home </Nav.Link>

            <Nav.Link href="#link">Link</Nav.Link>

            <NavDropdown title="Nuevo" id="basic-nav-dropdown">
              <NavDropdown.Item  
                 onClick={handleAgregarColegioClick}
                > Colegio </NavDropdown.Item>
                <AgregarColegioModal  
                triggerReload={() => setReloadData(!reloadData)}
                isOpen={isOpen}
                onClose={onClose}   />
              <NavDropdown.Item href="#action/3.2">Grupo</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Estudiante</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {
            usuario ? (
              <Nav className="ml-auto" title= {usuario.email}>
                <Nav.Link as={Link} to='/registro-docente'  onClick={handleSignOut} >
                  Cerrar Sesion
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <Nav.Link as={Link} to='/registro-docente' >
                  Iniciar Sesion
                </Nav.Link>
              </Nav>
            )
          }
          <NavDropdown title= {usuario.email}>
            <NavDropdown.Item as={Link} to='/registro-docente'  onClick={handleSignOut} >
              Cerrar Sesion
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <AgregarColegioModal
    show={agregarColegioShow}
    onHide={() => setAgregarColegioShow(false)}
    />
    </div>
  );
}

export default Navigation;