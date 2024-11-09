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
import { convertJsonToPet } from "../../utils/helper";
import { getUserPetsInfo } from "../../services/api";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import "./userPetInfo.css";

const UserPetInfo = () => {
  const [userPets, setUserPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndexes, setCurrentIndexes] = useState({});
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrStringValue, setQrStringValue] = useState("");

  const navigate = useNavigate();

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleNext = (petIndex) => {
    setCurrentIndexes((prevIndexes) => ({
      ...prevIndexes,
      [petIndex]:
        (prevIndexes[petIndex] + 1) % userPets[petIndex].images.length,
    }));
  };

  const handlePrev = (petIndex) => {
    setCurrentIndexes((prevIndexes) => ({
      ...prevIndexes,
      [petIndex]:
        (prevIndexes[petIndex] - 1 + userPets[petIndex].images.length) %
        userPets[petIndex].images.length,
    }));
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

      const initialIndexes = userPets.reduce((acc, _, index) => {
        acc[index] = 0;
        return acc;
      }, {});
      setCurrentIndexes(initialIndexes);
    };

    getUserPets();
  }, []);

  const handleQRCodeClick = (qrString) => {
    setQrStringValue(qrString);
    setShowQRCode(true);
  };

  if (loading) {
    return (
      <Container maxWidth="sm" className="container-custom">
        <Box className="box-container-loading">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (userPets.length === 0) {
    return (
      <Box className="box-container">
        <Typography className="no-pets-text" variant="h6">
          No cuentas con mascotas registradas por el momento.
        </Typography>
        <Button
          id="addPetButton"
          variant="contained"
          onClick={() => navigate("/pet/register")}
          className="add-pet-button"
        >
          Agregar Mascota
        </Button>
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
      <Button
        id="addPetButton"
        variant="contained"
        onClick={() => navigate("/pet/register")}
        sx={{ marginBottom: 2 }}
      >
        Agregar Mascota
      </Button>

      <Grid container spacing={2} justifyContent="center">
        {userPets.map((pet, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              id={"petCard_" + index}
              variant="outlined"
              sx={{ margin: 2, borderRadius: 2, boxShadow: 3 }}
            >
              <CardContent>
                <Typography
                  id={"petCard_name_" + index}
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {pet.name}
                </Typography>
                <Typography
                  id={"petCard_animal_" + index}
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Animal:</strong> {pet.animal}
                </Typography>
                <Typography
                  id={"petCard_breed_" + index}
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Raza:</strong> {pet.breed}
                </Typography>
                <Typography
                  id={"petCard_age_" + index}
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Edad:</strong> {calculateAge(pet.age)} años
                </Typography>
                <Typography
                  id={"petCard_sex_" + index}
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Sexo:</strong> {pet.sex}
                </Typography>
                <Typography
                  id={"petCard_size_" + index}
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Tamaño:</strong> {pet.size}
                </Typography>
                <Typography
                  id={"petCard_characteristic_" + index}
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Características:</strong> {pet.characteristics}
                </Typography>
                <Typography
                  id={"petCard_colors_" + index}
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Colores Generales:</strong>{" "}
                  {pet.generalColor.join(", ")}
                </Typography>

                <Box sx={{ marginTop: 3, position: "relative" }}>
                  <IconButton
                    onClick={() => handlePrev(index)}
                    className="overlay-button"
                    style={{ left: 0 }}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>

                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={
                        pet.images && pet.images.length > 0
                          ? pet.images[currentIndexes[index]]
                          : "src/assets/images/no-photo.png"
                      }
                      alt={`Imagen ${currentIndexes[index] + 1}`}
                      className="image"
                    />
                  </Box>

                  <IconButton
                    onClick={() => handleNext(index)}
                    className="overlay-button"
                    style={{ right: 0 }}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Box>

                <Button
                  variant="contained"
                  onClick={() =>
                    handleQRCodeClick(
                      "http://localhost:5173/#/pet/found/" + pet.id
                    )
                  }
                  sx={{ marginTop: 2, width: "100%" }}
                >
                  Ver QR
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {showQRCode && (
        <QRCodeComponent
          qrStringValue={qrStringValue}
          onClose={() => setShowQRCode(false)}
        />
      )}
    </Box>
  );
};

const QRCodeComponent = ({ qrStringValue, onClose }) => (
  <Box className="qr-code-container" onClick={onClose}>
    <QRCodeCanvas value={qrStringValue} size={200} />
    <Typography variant="h6" color="white" sx={{ marginTop: 2 }}>
      Escanea el código QR
    </Typography>
  </Box>
);

export default UserPetInfo;
