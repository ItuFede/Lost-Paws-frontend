import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Button,
  Grid,
  Box,
  CircularProgress,
  Container,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { convertJsonToPet } from "../utils/helper";
import { getUserPetsInfo } from "../services/api";

const UserPetInfo = () => {
  const [userPets, setUserPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = (petIndex) => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % userPets[petIndex].images.length
    );
  };

  const handlePrev = (petIndex) => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + userPets[petIndex].images.length) %
        userPets[petIndex].images.length
    );
  };

  useEffect(() => {
    const getUserPets = async () => {
      const auth = localStorage.getItem("authData");
      const pets = await getUserPetsInfo(auth);

      let userPets = [];

      pets.map((pet) => {
        userPets.push(convertJsonToPet(pet));
      });

      setUserPets(userPets);
      setLoading(false);
    };

    getUserPets();
  }, []);

  const handleQRCodeClick = (nombre) => {
    alert(`Mostrando QR para ${nombre}`);
  };

  if (loading) {
    return (
      <Container maxWidth="sm" style={{ marginTop: "50px" }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (userPets.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ marginTop: 4 }}
      >
        <Typography variant="h6" color="text.secondary">
          No cuentas con mascotas registradas por el momento.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ marginTop: 4 }}
    >
      <Grid container spacing={2} justifyContent="center">
        {userPets.map((pet, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              variant="outlined"
              sx={{ margin: 2, borderRadius: 2, boxShadow: 3 }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {pet.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Animal:</strong> {pet.animal}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Raza:</strong> {pet.breed}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Edad:</strong> {pet.age} años
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Sexo:</strong> {pet.sex}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Tamaño:</strong> {pet.size}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Características:</strong> {pet.characteristics}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Colores Generales:</strong>{" "}
                  {pet.generalColor.join(", ")}
                </Typography>

                {pet.images && pet.images.length > 0 && (
                  <Box sx={{ marginTop: 3, position: "relative" }}>
                    <IconButton
                      onClick={() => handlePrev(index)}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        transform: "translateY(-50%)",
                        zIndex: 1,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                      }}
                    >
                      <ArrowBackIosNewIcon />
                    </IconButton>

                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={pet.images[currentIndex]}
                        alt={`Imagen ${currentIndex + 1}`}
                        style={{
                          width: "100%",
                          maxWidth: "250px",
                          maxHeight: "250px",
                          borderRadius: "10px",
                          objectFit: "cover",
                          boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    </Box>

                    <IconButton
                      onClick={() => handleNext(index)}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: 0,
                        transform: "translateY(-50%)",
                        zIndex: 1,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                      }}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Box>
                )}

                <Button
                  variant="contained"
                  onClick={() => handleQRCodeClick(pet.name)}
                  sx={{ marginTop: 2, width: "100%" }}
                >
                  Ver QR
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserPetInfo;
