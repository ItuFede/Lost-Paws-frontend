import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Container,
  Paper,
  Stack,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { getUserInfo, updateUserInfo } from "./../../services/api";
import "./userInfo.css";

const UserInfo = () => {
  const [user, setUser] = useState({
    email: "",
    name: "",
    phone: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      tiktok: "",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const auth = localStorage.getItem("authData");
      const response = await getUserInfo(auth);

      setUser({
        email: response?.email || "",
        name: response?.name || "",
        phone: response?.phone || "",
        socialMedia: {
          facebook: response?.socialMedia?.facebook || "",
          instagram: response?.socialMedia?.instagram || "",
          tiktok: response?.socialMedia?.tiktok || "",
        },
      });

      setLoading(false);
    };

    getUser();
  }, []);

  const handleEditClick = () => setIsEditing(true);

  const handleConfirmClick = async () => {
    const auth = localStorage.getItem("authData");
    await updateUserInfo(auth, user);
    setIsEditing(false);
  };

  const handleInputChange = (event, field) => {
    setUser((prevValues) => ({
      ...prevValues,
      [field]: event.target.value,
    }));
  };

  const handleSocialChange = (event, network) => {
    setUser((prevValues) => ({
      ...prevValues,
      socialMedia: {
        ...prevValues.socialMedia,
        [network]: event.target.value,
      },
    }));
  };

  if (loading) {
    return (
      <Container maxWidth="sm" className="user-info-container">
        <Box className="loading-box">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" className="user-info-container background-pet">
      <Paper elevation={3} className="user-info-paper">
        <Typography variant="h5" gutterBottom>
          Información del Usuario
        </Typography>
        <Stack spacing={2}>
          <TextField label="Email" value={user.email} disabled fullWidth />

          <TextField
            label="Nombre"
            value={user.name}
            onChange={(e) => handleInputChange(e, "name")}
            disabled={!isEditing}
            fullWidth
          />

          <TextField
            label="Número de Teléfono"
            value={user.phone}
            onChange={(e) => handleInputChange(e, "phone")}
            disabled={!isEditing}
            fullWidth
          />

          <Typography
            variant="h6"
            gutterBottom
            className="social-media-heading"
          >
            Redes Sociales
          </Typography>

          <TextField
            label="Facebook"
            value={user.socialMedia.facebook}
            onChange={(e) => handleSocialChange(e, "facebook")}
            disabled={!isEditing}
            fullWidth
          />

          <TextField
            label="Instagram"
            value={user.socialMedia.instagram}
            onChange={(e) => handleSocialChange(e, "instagram")}
            disabled={!isEditing}
            fullWidth
          />

          <TextField
            label="TikTok"
            value={user.socialMedia.tiktok}
            onChange={(e) => handleSocialChange(e, "tiktok")}
            disabled={!isEditing}
            fullWidth
          />
        </Stack>

        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          className="button-stack"
        >
          {!isEditing ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
            >
              Editar
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleConfirmClick}
            >
              Confirmar
            </Button>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default UserInfo;
