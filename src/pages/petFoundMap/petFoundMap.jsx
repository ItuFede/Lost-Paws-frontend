import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import PetInfoMap from "../Components/petInfoMap";
import { getPet, updatePet, getPetImages } from "../../services/api";
import { convertJsonToPet } from "../../utils/helper";
import useErrorHandling from "../hooks/useErrorHandling";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PetFoundMap = () => {
  const { handleError } = useErrorHandling();
  const { petId } = useParams();
  const [petData, setPetData] = useState(null);
  const [position, setPosition] = useState(null);

  const validateUUID = (uuid) => {
    const regexUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regexUUID.test(uuid);
  };

  useEffect(() => {
    const fetchPetData = async () => {
      const validUUID = validateUUID(petId);

      if (validUUID) {
        const petData = await getPet(petId);
        petData.images = await getPetImages(petId);
        setPetData(petData);
      } else {
        handleError({ errorMessage: "UUID no valido" });
      }

      /*
      if (petId) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            //setPosition([latitude, longitude]);
            setPosition([-34.710811, -58.292755]);
          },
          (err) => {
            console.error(err);
            handleError({ errorMessage: "No se pudo obtener la ubicación." });
          }
        );
      }
      */
    };

    fetchPetData();
  }, [petId]);

  /*
  useEffect(() => {
    const fetchData = async () => {
      if (position && petData) {
        const record = {
          id: petId,
          latitude: position[0],
          longitude: position[1],
        };

        try {
          console.log("record:::", record);
          //await updatePet(record);
        } catch (error) {
          handleError("Error al actualizar la mascota");
          return;
        }

        const locations = petData.getLocations();

        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime / 1000);

        locations.push({
          latitude: position[0],
          longitude: position[1],
          timestamp: timestamp,
        });
        setPetData(
          convertJsonToPet({
            ...petData,
            missingReport: { locationsView: locations },
          })
        );
      }
    };

    fetchData();
  }, [position]);
  */

  if (!petData) {
    return (
      <Container maxWidth="sm" className="container-custom">
        <Box className="box-container-loading">
          <CircularProgress />
          <ToastContainer />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <ToastContainer />
      <PetInfoMap petData={petData} />
    </Container>
  );
};

export default PetFoundMap;
