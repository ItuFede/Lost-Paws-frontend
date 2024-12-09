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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { convertJsonToPet } from "../../utils/helper";
import { getUserPetsInfo, updateUserPetLostCancel } from "../../services/api";
import { useNavigate } from "react-router-dom";
import QRCode from "../Components/qrCode";
import "./userPetInfo.css";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import QrCodeIcon from "@mui/icons-material/QrCode";
import PetsIcon from "@mui/icons-material/Pets";
import CancelIcon from "@mui/icons-material/Cancel";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import { deleteUserPet } from "../../services/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserPetInfo = () => {
  const [userPets, setUserPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [currentIndexes, setCurrentIndexes] = useState({});
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrStringValue, setQrStringValue] = useState("");
  const [open, setOpen] = useState(false);
  const [modalDeletePet, setModalDeletePet] = useState({});

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

  // Modal:
  const handleOpen = (petName, petId) => {
    setModalDeletePet({ petName, petId });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const auth = localStorage.getItem("authData");
      await deleteUserPet(auth, modalDeletePet.petId);
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar la mascota:", error);
    } finally {
      setDeleting(false);
      setOpen(false);
    }
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
  }, [loading]);

  const handleQRCodeClick = (qrString) => {
    setQrStringValue(qrString);
    setShowQRCode(true);
  };

  const handleLostPetClick = (petId, petName) => {
    navigate("/user/pet/lost", {
      state: {
        petId,
        petName,
      },
    });
  };

  const handleLostPetCancelClick = async (petId) => {
    const auth = localStorage.getItem("authData");
    await updateUserPetLostCancel(auth, { petId });
    setLoading(true);
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
      <Box className="box-container ">
        <Typography className="no-pets-text" variant="h6">
          No cuentas con mascotas registradas por el momento.
        </Typography>
        <Button
          data-testid="addPetButton"
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
      className=""
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ marginTop: 4 }}
    >
      <Button
        data-testid="addPetButton"
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
              data-testid={"petCard_" + index}
              variant="outlined"
              sx={{ margin: 2, borderRadius: 2, boxShadow: 3 }}
            >
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  {/* Botón de editar */}
                  <IconButton
                    aria-label="editar"
                    className="lost-pet-edit-button"
                    data-testid={"petCard_edit_" + index}
                    onClick={() =>
                      navigate(`/pet/edit/`, {
                        state: { pet },
                      })
                    }
                  >
                    <EditIcon className="lost-pet-edit-icon" />
                  </IconButton>

                  {/* Botón de eliminar */}
                  <IconButton
                    aria-label="eliminar"
                    className="lost-pet-delete-button"
                    data-testid={"petCard_delete_" + index}
                    onClick={() => handleOpen(pet.name, pet.id)}
                  >
                    <DeleteIcon className="lost-pet-delete-icon" />
                  </IconButton>
                </div>
                <Typography
                  data-testid={"petCard_name_" + index}
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {pet.name}
                </Typography>
                <Typography
                  data-testid={"petCard_animal_" + index}
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Animal:</strong> {pet.animal}
                </Typography>
                <Typography
                  data-testid={"petCard_breed_" + index}
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Raza:</strong> {pet.breed}
                </Typography>
                <Typography
                  data-testid={"petCard_age_" + index}
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Edad:</strong> {calculateAge(pet.age)} años
                </Typography>
                <Typography
                  data-testid={"petCard_sex_" + index}
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Sexo:</strong> {pet.sex}
                </Typography>
                <Typography
                  data-testid={"petCard_size_" + index}
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Tamaño:</strong> {pet.size}
                </Typography>
                <Typography
                  data-testid={"petCard_characteristic_" + index}
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  <strong>Características:</strong>{" "}
                  {pet.characteristics.join(", ")}
                </Typography>
                <Typography
                  data-testid={"petCard_colors_" + index}
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
                          : "../src/assets/images/no-photo.png"
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

                <Box className="lost-pet-container">
                  {/* Contenedor de "Ver QR" y "Ver chapita" */}
                  <Box className="lost-pet-row">
                    <Button
                      startIcon={<QrCodeIcon />}
                      variant="contained"
                      onClick={() =>
                        handleQRCodeClick(
                          "http://localhost:5173/#/pet/found/" + pet.id
                        )
                      }
                      className="lost-pet-half-button"
                    >
                      Ver QR
                    </Button>
                    <Button
                      startIcon={<PetsIcon />}
                      variant="contained"
                      onClick={() =>
                        navigate(`/pet/found/${pet.id}`, {
                          state: { petId: pet.id },
                        })
                      }
                      className="lost-pet-half-button"
                    >
                      Ver chapita
                    </Button>
                  </Box>

                  {!pet.isLost && (
                    <Button
                      startIcon={<ReportProblemIcon />}
                      variant="contained"
                      onClick={() => handleLostPetClick(pet.id, pet.name)}
                      className="lost-pet-button"
                      disabled={pet.isLost}
                    >
                      ¡Me perdí!
                    </Button>
                  )}

                  {pet.isLost && (
                    <Button
                      startIcon={<CancelIcon />}
                      variant="contained"
                      onClick={() => handleLostPetCancelClick(pet.id)}
                      className="lost-pet-cancel-button"
                      disabled={!pet.isLost}
                    >
                      Cancelar búsqueda
                    </Button>
                  )}
                </Box>
              </CardContent>

              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{`Borrar registro de ${modalDeletePet.petName}`}</DialogTitle>
                <DialogContent>
                  <DialogContentText data-testid="alert-dialog-slide-description">
                    ¿Estás seguro de que quieres borrar esta mascota? Esta
                    acción no se puede deshacer.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    color="primary_mui"
                    disabled={deleting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    id={"modal_delete_pet"}
                    onClick={handleDelete}
                    color="primary_mui"
                    disabled={deleting}
                  >
                    {deleting ? <CircularProgress size={24} /> : "Eliminar"}
                  </Button>
                </DialogActions>
              </Dialog>
            </Card>
          </Grid>
        ))}
      </Grid>

      {showQRCode && (
        <QRCode
          qrStringValue={qrStringValue}
          onClose={() => setShowQRCode(false)}
        />
      )}
    </Box>
  );
};

export default UserPetInfo;
