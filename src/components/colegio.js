//vamos a llamar a la base de datos y extraer el colegio que tiene como usuario el id del usuario actual
//

// estamos en el home de docentes

import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import crudFirebase from "../lib/crudFirebase.js";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { AddIcon, SmallAddIcon, MinusIcon, EditIcon } from "@chakra-ui/icons";
import AgregarColegioModal from "../pages/modal/agregarColegio.js";
import EliminarColegioModal from "../pages/modal/eliminarColegio.js";

const firebaseCrud = new crudFirebase();

const auth = getAuth();

function Colegio() {
  const [colegio, setColegio] = useState([]);
  const { isOpen: isAgregarModalOpen, onOpen: openAgregarModal, onClose: closeAgregarModal } = useDisclosure();
  const { isOpen: isEliminarModalOpen, onOpen: openEliminarModal, onClose: closeEliminarModal } = useDisclosure();


  function recortarFecha(fechaCompleta) {
    const fecha = new Date(fechaCompleta);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return fecha.toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    const obtenerColegio = async () => {
      try {
        const resultado = await firebaseCrud.obtenerDocumentos("colegio");
        console.log(resultado);
        console.log(auth.currentUser.uid);
        if (resultado && Array.isArray(resultado)) {
          const colegioDocente = resultado.filter(
            (doc) => doc.id_usuario === auth.currentUser.uid
          );
          setColegio(colegioDocente);
        } else {
          console.error("No se encontraron colegios");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    obtenerColegio();
  }, []);

  console.log(colegio);

  return (
    <Box 

   
    >
      <Table size="sm" variant="striped" colorScheme="whatsapp">
        <TableCaption placement="top">
          Colegios de{" "}
          {auth.currentUser ? auth.currentUser.email : "Cargando..."}
        </TableCaption>
        <Thead>
          <Tr>
            <Td colSpan="4" textAlign="center">
              <Button
                colorScheme="blue"
                onClick={openAgregarModal}
                size="sm"
                borderRadius="base"
                leftIcon={<Icon as={SmallAddIcon} />}
              >
                Agregar Colegio
              </Button>
            </Td>
          </Tr>
          <Tr>
            <Th>Nombre</Th>
            <Th>Fecha Entrada</Th>
            <Th>Activo</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {colegio.map((doc) => (
            <Tr key={doc.id}>
              <Td>{doc.nombre_colegio}</Td>
              <Td>{recortarFecha(doc.fecha_entrada)}</Td>
              <Td>{doc.activo ? "Activo" : "Inactivo"}</Td>
              <Td textAlign="left">
                  <Button
                  m={1}
                    colorScheme="blue"
                    onClick={openEliminarModal}
                    size="sm"
                    borderRadius="base"
                    leftIcon={<Icon as={EditIcon} />}
                  >Editar </Button>
                  <Button
                    p={2}
                    colorScheme="blue"
                    onClick={openEliminarModal}
                    size="sm"
                    borderRadius="base"
                    leftIcon={<Icon as={MinusIcon} />}
                  >Eliminar</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <AgregarColegioModal isOpen={isAgregarModalOpen} onClose={closeAgregarModal} />
      <EliminarColegioModal isOpen={isEliminarModalOpen} onClose={closeEliminarModal} />
    </Box>
  );
}

export default Colegio;
