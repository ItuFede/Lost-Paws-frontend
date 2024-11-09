import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import AdoptionIcon from "@mui/icons-material/VolunteerActivism";
import ClinicIcon from "@mui/icons-material/LocalHospital";
import LostAndPawsPNG from "../../assets/images/logo2.png";
import "./home.css";

const Home = () => {
  return (
    <Box className="home-container">
      <Typography variant="h3" component="h1" className="home-title">
        ¡Lost & Paws!
      </Typography>

      <img src={LostAndPawsPNG} alt="Lost & Paws" className="home-logo" />

      <Typography variant="h6" component="p" className="home-description">
        Lost & Paws es una aplicación que te ayuda a encontrar mascotas
        perdidas, adoptar o brindarles un hogar temporal. Además, te ofrece
        información sobre veterinarias y centros de vacunación cercanos para el
        cuidado de tu mascota.
      </Typography>

      <Box className="home-cards-container">
        <Paper elevation={3} className="home-card-lost">
          <PetsIcon sx={{ fontSize: 60, color: "#fff", mb: 2 }} />
          <Typography variant="h6" className="home-card-title">
            Mascotas Perdidas
          </Typography>
          <Typography variant="body1">
            Publica mascotas perdidas o busca entre publicaciones cercanas para
            ayudar en su reencuentro.
          </Typography>
        </Paper>

        <Paper elevation={3} className="home-card-clinic">
          <ClinicIcon
            className="home-icon"
            sx={{ fontSize: 60, color: "#fff", mb: 2 }}
          />
          <Typography variant="h6" className="home-card-title">
            Veterinarias
          </Typography>
          <Typography variant="body1">
            Encuentra veterinarias cercanas para cuidar de la salud de tu
            mascota.
          </Typography>
        </Paper>

        <Paper elevation={3} className="home-card-adoption">
          <AdoptionIcon sx={{ fontSize: 60, color: "#fff", mb: 2 }} />
          <Typography variant="h6" className="home-card-title">
            Adopción
          </Typography>
          <Typography variant="body1">
            Conecta con refugios y adopta una mascota. Dale a una mascota un
            nuevo hogar.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Home;
