import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { Box, Typography, Card, CardContent } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getDateByTimestamp } from "../../utils/helper";
import "./Styles/petInfoMap.css";

// Crear un icono personalizado que incluya un número
const createMarkerIcon = (number) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: blue; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; justify-content: center; align-items: center;">${number}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const PetInfoMap = ({ petData }) => {
  const orderPetsPositions = petData
    .getLocations()
    .sort((a, b) => a.timestamp - b.timestamp);
  const positions = orderPetsPositions.map((loc) => [
    loc.latitude,
    loc.longitude,
  ]);

  return (
    <Box className="container-pet-info-map">
      <Typography variant="h6" className="title">
        Encontraste a <strong>{petData.name}</strong>, por favor ponte en
        contacto con su familia lo antes posible.
      </Typography>

      <Box className="map-container-pet-info-map">
        <MapContainer
          center={positions[0]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {positions.map((position, index) => (
            <Marker
              key={index}
              position={position}
              icon={createMarkerIcon(index + 1)}
            >
              <Popup>
                {petData.name} estuvo aquí el{" "}
                {getDateByTimestamp(petData.getPositionPos(index))}
              </Popup>
            </Marker>
          ))}
          <Polyline positions={positions} color="blue" />
        </MapContainer>
      </Box>

      <Card className="pet-card-pet-info-map">
        <CardContent>
          <Typography variant="h5" className="pet-card-title-pet-info-map">
            Información de la mascota
          </Typography>
          <Typography variant="body1" className="pet-info-pet-info-map">
            <strong>Nombre:</strong> {petData.name}
          </Typography>
          <Typography variant="body1" className="pet-info-pet-info-map">
            <strong>Tipo:</strong> {petData.getAnimalType()}
          </Typography>
          <Typography variant="body1" className="pet-info-pet-info-map">
            <strong>Teléfono:</strong> {petData.phoneNumberOwner}
          </Typography>
          <Typography variant="body1" className="pet-info-pet-info-map">
            <strong>Descripción:</strong> {petData.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PetInfoMap;
