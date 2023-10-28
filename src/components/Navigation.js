import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navigation.css'
import { Navigate, Link} from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../Credentials";


//Modal
import AgregarColegioModal from "../pages/modal/agregarColegio.js";

//Constantes
const auth = getAuth(firebaseApp);


function Navigation({ correoUsuario}) {

  //Cerrar Sesion del usuario
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('usuario');
      return <Navigate to="/registro-docente/" replace />; // Redirige al usuario a la página de inicio
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  //Props de modal agregar colegio
  const [agregarColegioShow, setAgregarColegioShow] = useState(false);
  
  const handleAgregarColegioClick = () => {    
    setAgregarColegioShow(true);
    //console.log(setAgregarColegioShow);
  }; 
  
  return (
    <div>
    <Navbar expand="lg" sticky="top" className="bg-body-tertiary">
      <Container>        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/registro-docente/registro' >  Home </Nav.Link>

            <Nav.Link href="#link">Link</Nav.Link>

            <NavDropdown title="Nuevo" id="basic-nav-dropdown">
              <NavDropdown.Item  
                 onClick={handleAgregarColegioClick}
                > Colegio </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Grupo</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Estudiante</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>


          </Nav>
          <NavDropdown title={correoUsuario}>
            <NavDropdown.Item  onClick={handleSignOut} >
              Cerrar Sesion
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <AgregarColegioModal
    show={agregarColegioShow}
    onHide={() => setAgregarColegioShow(false)}
    // onAgregarColegio={handleAgregarColegio}
    />



    </div>
  );
}


// Contruir los dropdown

function NavDropdownBuilder({ dropdownTitle, items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <NavDropdown title={dropdownTitle} id="basic-nav-dropdown">
      {items.map((item, index) => (
        <NavDropdown.Item key={index} href={item.link}>
          {item.name}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
}

export default Navigation;