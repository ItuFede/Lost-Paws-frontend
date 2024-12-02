import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Chip,
} from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getDateYMDByTimestamp } from "../../utils/helper";
import "./Styles/petInfoMap.css";

const createMarkerIcon = (number) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: #79BE2D; color: white; border-radius: 50%; width: 28px; height: 28px; font-size: 14px; font-weight: bold; display: flex; justify-content: center; align-items: center;">${number}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

const PetInfoMap = ({ petData }) => {
  let positions = [];
  const missingReport = petData.missingReport;

  if (petData.isLost && missingReport) {
    const orderPetsPositions = petData
      .getLocations()
      .sort((a, b) => a.timestamp - b.timestamp);
    positions = orderPetsPositions.map((loc) => [loc.latitude, loc.longitude]);
  }

  return (
    <Box className="pet-info-container">
      <Card className="pet-info-card">
        <Box className="pet-avatar-container">
          <Avatar
            src={
              petData.images.length > 0
                ? petData.images[0]
                : "https://via.placeholder.com/300x300?text=Sin+Foto"
            }
            alt={`Foto de ${petData.name}`}
            className="pet-avatar"
          />
        </Box>

        <CardContent>
          <Typography variant="h4" className="pet-info-title">
            ¡Hola! Soy <strong>{petData.name}</strong>
          </Typography>
          <Typography variant="body1" className="pet-info-subtitle">
            Si me encontraste y no está mi tutor cerca, por favor contacta a mi
            familia.
          </Typography>

          {/* Información detallada */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" className="pet-info-detail">
                Nombre:
              </Typography>
              <Typography variant="body2">{petData.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" className="pet-info-detail">
                Tipo:
              </Typography>
              <Typography variant="body2">{petData.animal}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" className="pet-info-detail">
                Teléfono:
              </Typography>
              <Typography variant="body2">
                {petData.phoneNumberOwner}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" className="pet-info-detail">
                Sexo:
              </Typography>
              <Typography variant="body2">{petData.sex}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" className="pet-info-detail">
                Color:
              </Typography>
              <Typography variant="body2">
                {petData.generalColor?.join(", ") || "No especificado"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" className="pet-info-detail">
                Descripción:
              </Typography>
              <Typography variant="body2">
                {petData.description || "No disponible"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" className="pet-info-detail">
                Tratamientos médicos:
              </Typography>
              <Typography variant="body2">
                {petData.medicalTreatment || "Ninguno"}
              </Typography>
            </Grid>
          </Grid>

          {/* Características */}
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="body1" className="pet-characteristics-title">
              Características:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {petData.characteristics.length > 0 ? (
                petData.characteristics.map((char, index) => (
                  <Chip
                    key={index}
                    label={char}
                    className="pet-characteristics-chip"
                  />
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No especificado
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Parte si se perdió */}
      {petData.isLost && missingReport && (
        <>
          <Card className="pet-info-card">
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#333",
                marginBottom: 2,
                textAlign: "center",
              }}
            >
              Información ¡Me perdí!
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Información al momento de perderme:{" "}
              <strong>{missingReport.info || "No especificada"}</strong>
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Fecha y hora de la pérdida:{" "}
              <strong>
                {missingReport.missingDate
                  ? getDateYMDByTimestamp(missingReport.missingDate)
                  : "No especificada"}
              </strong>
            </Typography>
          </Card>

          {/* Mapa */}
          <Box className="pet-map-container">
            <Typography variant="subtitle1" className="pet-map-title">
              El primer punto en el mapa es donde se perdió {petData.name}.
            </Typography>

            <Box className="pet-map">
              <MapContainer
                center={positions[0]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {positions.map((position, index) => (
                  <Marker
                    key={index}
                    position={position}
                    icon={createMarkerIcon(index + 1)}
                  >
                    <Popup>
                      {petData.name} estuvo aquí el{" "}
                      {getDateYMDByTimestamp(missingReport.missingDate)}
                    </Popup>
                  </Marker>
                ))}
                <Polyline positions={positions} color="green" />
              </MapContainer>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default PetInfoMap;
