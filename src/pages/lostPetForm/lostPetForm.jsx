import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate, useLocation } from "react-router-dom";
import useErrorHandling from "../hooks/useErrorHandling";
import { updateUserPetLost } from "./../../services/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./lostPetForm.css";

const AddMarker = ({ position, setPosition }) => {
  useMapEvents({
    click: (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position}></Marker> : null;
};

const LostPetForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { petId, petName } = location.state || {};

  const { handleError } = useErrorHandling();
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [formData, setFormData] = useState({
    information: "",
    lostDate: "",
  });

  const [informationError, setInformationError] = useState(false);
  const [lostDateError, setLostDateError] = useState(false);
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleChange = (formAtr) => {
    const { name, value } = formAtr.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "information") setInformationError(false);
    if (name === "lostDate") setLostDateError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!formData.information) {
      setInformationError(true);
      hasError = true;
    }

    const currentDate = getCurrentDate();
    if (!formData.lostDate || formData.lostDate > currentDate) {
      setLostDateError(true);
      hasError = true;
    }

    if (!position) {
      setLocationError(true);
      hasError = true;
    } else {
      setLocationError(false);
    }

    if (hasError) return;

    const dataToSave = {
      ...formData,
      location: {
        latitude: position[0],
        longitude: position[1],
      },
      petId,
    };

    const auth = localStorage.getItem("authData");
    try {
      setLoadingButton(true);
      await updateUserPetLost(auth, dataToSave);
      navigate("/user/pet");
    } catch (error) {
      handleError({ errorMessage: "Error al crear la búsqueda" });
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Box className="missing-form" component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Carga los datos de {petName} que se perdió
        </Typography>
        <Typography variant="body2" sx={{ color: "gray", marginBottom: 2 }}>
          Nota: La publicación de perdido durará un mes.
        </Typography>

        <Box className="flex-column-gap">
          <Box className="flex-wrap-gap">
            <Box className="flex-2">
              <TextField
                label="Información adicional al momento de perderme"
                name="information"
                value={formData.information}
                onChange={handleChange}
                multiline
                rows={3}
                required
                error={informationError}
                fullWidth
                sx={{
                  backgroundColor: "white",
                }}
              />
            </Box>
            <Box className="flex-1">
              <TextField
                label="Fecha en que me perdí"
                name="lostDate"
                type="date"
                value={formData.lostDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: getCurrentDate(),
                }}
                required
                error={lostDateError}
                helperText={
                  lostDateError && "Por favor, selecciona una fecha válida."
                }
                fullWidth
                sx={{
                  backgroundColor: "white",
                }}
              />
            </Box>
          </Box>
        </Box>

        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Seleccione la ubicación donde se perdió:
        </Typography>

        <Box className="map-container-form">
          {loading ? (
            <Box className="loading-container">
              <CircularProgress />
            </Box>
          ) : (
            <MapContainer
              center={position || [-34.603715, -58.381592]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <AddMarker position={position} setPosition={setPosition} />
            </MapContainer>
          )}
        </Box>

        {locationError && (
          <Typography className="location-error">
            Por favor, seleccione una ubicación en el mapa.
          </Typography>
        )}

        {position && (
          <Typography className="coordinates">
            Coordenadas seleccionadas: {position[0].toFixed(6)},{" "}
            {position[1].toFixed(6)}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loadingButton}
          className="submit-button"
        >
          {loadingButton ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Crear búsqueda"
          )}
        </Button>
      </Box>
    </div>
  );
};

export default LostPetForm;
