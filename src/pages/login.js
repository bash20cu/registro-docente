import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import firebaseApp from "../Credentials";
import { getFirestore, collection, addDoc, setDoc } from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  Icon,
} from "@chakra-ui/react";

const avatars = [
  {
    name: "Ryan Florence",
    url: "https://bit.ly/ryan-florence",
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/sage-adebayo",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://bit.ly/prosper-baba",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
];
const Blur = (props) => {
  return (
    <Icon
     
      height="660px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const Login = () => {
  const [registro, setRegistro] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorBase, setErrorBase] = useState(null);
  const [redirect, setRedirect] = useState(false); // Estado para controlar la redirección
  
  

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const clave = e.target.clave.value;
    

    if (registro) {
      const nombre_usuario = e.target.nombre_usuario.value;
      console.log(nombre_usuario);
      try {
        // Attempt to save user data to Firestore first email account      
        await createUserWithEmailAndPassword(auth, correo, clave);

        // If saving data to Firestore is successful, proceed to create the user on db
        try {
          await guardarDatos(nombre_usuario, new Date(), true);
          // At this point, user registration is complete
          //console.log("User registered successfully:", userCredential.user);
          localStorage.setItem('usuario', JSON.stringify(auth));
          //console.log("User registered successfully:", userCredential.user);
          setRedirect(true);
        } catch (error) {
          setErrorBase(error.message);
          //console.log(errorBase);
        }
      } catch (error) {
        setErrorBase(error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, correo, clave);
        localStorage.setItem('usuario', JSON.stringify(auth));
        setRedirect(true);
      } catch (error) {
        setErrorBase(error.message);
        console.log(error);
      }
    }
  };

  const guardarDatos = async (nombre_usuario, fecha, activo) => {
    try {
      const userData = {
        id: auth.currentUser.uid,
        email: auth.currentUser.email,
        nombre_usuario: nombre_usuario,
        fecha: fecha,
        activo: activo,
      };

      // Change "usuarios_registrados" to the name of your collection
      const userRef = await addDoc(
        collection(db, "usuarios_registrados"),
        userData
      );

      //console.log("Document added with ID: ", userRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    if (registro) {
      if (password.length < 8) {
        setPasswordError("La contraseña debe tener al menos 8 caracteres");
      } else if (!/[A-Z]/.test(password)) {
        setPasswordError(
          "La contraseña debe contener al menos una letra mayuscula"
        );
      } else {
        setPasswordError("");
      }
    }
  }, [password, registro]);

    // Redirige al usuario si el estado de redirección es true
    if (redirect) {
      return <Navigate to="/registro-docente/home" />;
    }

  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"6xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 10 }}
        py={{ base: 10, sm: 20, lg: 8 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Registro Docente{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              &
            </Text>{" "}
            TO-DO
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  size={"md"}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, red.400,pink.400)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              {registro ? "Registrate" : "Inicia Sesion"}
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              {errorBase && (
                <div style={{ color: "red" }}>{errorBase} & TO-DO</div>
              )}
            </Text>
          </Stack>
          <Box as={"form"} mt={6} onSubmit={handlerSubmit}>
            <Stack spacing={2}>
              {registro && (
                <Input
                  placeholder="Nombre usuario"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  type={"text"}
                  id={"nombre_usuario"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
              )}
              <Input
                placeholder="Correo Electronico"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                type={"email"}
                id={"email"}
                _placeholder={{
                  color: "gray.500",
                }}
              />

              <Input
                placeholder="Clave"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                type={"password"}
                id={"clave"}
                onChange={(e) => setPassword(e.target.value)}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              {passwordError && (
                <div style={{ color: "red" }}>{passwordError}</div>
              )}
            </Stack>
            <Button
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              type={"submit"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
            >
              {registro ? "Registrate" : "Inicia sesion"}
            </Button>
            <Button
              fontFamily={"heading"}
              mt={6}
              w={"full"}
              bgGradient="linear(to-r, blue.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,blue.400)",
                boxShadow: "xl",
              }}
              onClick={() => setRegistro(!registro)}
            >
              {registro
                ? "Ya tienes cuenta? Inicia sesion"
                : "No tienes cuenta? Registrate"}
            </Button>
          </Box>
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
        zIndex={-1}
      />
    </Box>
  );
};

export default Login;
