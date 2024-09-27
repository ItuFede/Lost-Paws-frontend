import React from "react";
import { Typography, Box, Button, Paper } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import AdoptionIcon from "@mui/icons-material/VolunteerActivism";
import ClinicIcon from "@mui/icons-material/LocalHospital";
import LostAndPawsPNG from "../assets/images/logo2.png";

const Home = () => {
  return (
    //height: "100vh", -> En Box
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          textAlign: "center",
          mb: 2,
        }}
      >
        ¡Lost & Paws!
      </Typography>

      <img
        src={LostAndPawsPNG}
        alt="Lost & Paws"
        style={{ width: 300, height: 300 }}
      />

      <Typography
        variant="h6"
        component="p"
        sx={{
          color: "#616161",
          textAlign: "center",
          maxWidth: "800px",
          mb: 4,
        }}
      >
        Lost & Paws es una aplicación que te ayuda a encontrar mascotas
        perdidas, adoptar o brindarles un hogar temporal. Además, te ofrece
        información sobre veterinarias y centros de vacunación cercanos para el
        cuidado de tu mascota.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
          mt: 6,
          maxWidth: "1200px",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            backgroundColor: "#A0D468",
            textAlign: "center",
            width: { xs: "100%", sm: "30%" },
          }}
        >
          <PetsIcon sx={{ fontSize: 60, color: "#fff", mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Mascotas Perdidas
          </Typography>
          <Typography variant="body1">
            Publica mascotas perdidas o busca entre publicaciones cercanas para
            ayudar en su reencuentro.
          </Typography>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            padding: 3,
            backgroundColor: "#4DB6AC",
            textAlign: "center",
            width: { xs: "100%", sm: "30%" },
          }}
        >
          <ClinicIcon sx={{ fontSize: 60, color: "#fff", mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Veterinarias
          </Typography>
          <Typography variant="body1">
            Encuentra veterinarias cercanas para cuidar de la salud de tu
            mascota.
          </Typography>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            padding: 3,
            backgroundColor: "#FFB74D",
            textAlign: "center",
            width: { xs: "100%", sm: "30%" },
          }}
        >
          <AdoptionIcon sx={{ fontSize: 60, color: "#fff", mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
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
