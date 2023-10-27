import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Button, CloseButton} from 'react-bootstrap'
import './Navigation.css'
import { Navigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../Credentials";
const auth = getAuth(firebaseApp);

const dropdownItems = [
  { name: 'Action 1', link: '#action/3.1' },
  { name: 'Action 2', link: '#action/3.2' },
  { name: 'Action 3', link: '#action/3.3' },
  { name: 'Separated Link', link: '#action/3.4' },
];



function Navigation({ correoUsuario }) {


  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('usuario');
      return <Navigate to="/auth" />; // Redirige al usuario a la página de inicio
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  
  return (
    <Navbar expand="lg" sticky="top" className="bg-body-tertiary">
      <Container>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <NavDropdown title={correoUsuario}>
            <NavDropdown.Item className="ml-auto" href='#' onClick={handleSignOut} >
              Cerrar Sesion
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
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