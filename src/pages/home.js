import React, { useEffect, useState } from "react";
import useLocalStorage from "react-use-localstorage";
import Navigation from "../components/Navigation.js";
import firebaseApp from "../Credentials";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Box, Grid, GridItem } from "@chakra-ui/react";

//Colegio

import Colegio from "../components/colegio.js";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const Home = () => {
  //variables de estado
  const [usuario, setUsuario] = useState(null);

  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      const usuarioParseado = JSON.parse(usuarioGuardado);
      setUsuario(usuarioParseado);
    }
    //console.log(usuario);
    setLocalStorageLoaded(true);
    //console.log(toString(usuario.email));
  }, []);

  useEffect(() => {
    // Este código se ejecutará una vez al cargar la página Home
    // Puedes agregar aquí cualquier inicialización o carga de datos necesarios
    console.log("Cargando página Home");
  }, [reloadData]);

  return (
    <>
      <Navigation triggerReload={() => setReloadData(!reloadData)} />
      <div className="container">
        <h1>Home page</h1>
      </div>

      <Grid
        templateRows={{ base: "repeat(2, 1fr)", md: "repeat(1, 1fr)" }}
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={4}
      >
        <GridItem>
          <Box
            borderRadius="lg"
            background="blue.100" // Cambia el color de fondo aquí
            boxShadow="md"
            p={4}
            m={2}
          >
            <Colegio />
          </Box>
        </GridItem>
        <GridItem>
          <Box
            borderRadius="lg"
            background="green.100" // Cambia el color de fondo aquí
            boxShadow="md"
            p={4}
            borderColor="gray.200"
          >
            <Colegio />
          </Box>
        </GridItem>
        <GridItem>
          <Box
            borderRadius="lg"
            background="red.100" // Cambia el color de fondo aquí
            boxShadow="md"
            p={4}
          >
            <Colegio />
          </Box>
        </GridItem>
        <GridItem>
          <Box
            borderRadius="lg"
            background="purple.100" // Cambia el color de fondo aquí
            boxShadow="md"
            p={4}
          >
            <Colegio />
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default Home;
