import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Slider,
} from "@mui/material";
import "leaflet/dist/leaflet.css";

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radio de la tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distancia en km
};

function LocationMarker({ position, radius }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      //TODO: Si el usuario no tiene geo ver que hacer
      map.setView(position, 13);
    }
  }, [position, map]);

  return position === null ? null : (
    <>
      <Circle
        center={position}
        radius={10}
        color="blue"
        fillColor="blue"
        fillOpacity={1}
      />
      <Circle center={position} radius={radius} color="blue" />
    </>
  );
}

function AdditionalMarkers({ markers, onMarkerClick }) {
  return markers.map((marker, idx) => (
    <Marker
      key={idx}
      position={marker.position}
      eventHandlers={{
        click: () => onMarkerClick(marker),
      }}
    ></Marker>
  ));
}

// Componente para mostrar las tarjetas en la columna
function MarkerList({ markers, onCardClick }) {
  return (
    <Box sx={{ padding: 2, overflowY: "auto", maxHeight: "100vh" }}>
      {markers.map((marker, idx) => (
        <Card
          key={idx}
          sx={{ marginBottom: 2 }}
          onClick={() => onCardClick(marker)}
        >
          <CardContent>
            <Typography variant="h6">{marker.name}</Typography>
            <Typography variant="body1">{marker.phone}</Typography>
            <Typography variant="body2">
              Ubicación: Lat {marker.position[0]}, Lng {marker.position[1]}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => onCardClick(marker)}
            >
              Ver en el Mapa
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

const MapWithLocation = ({ additionalMarkers }) => {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [radius, setRadius] = useState(3000); // Radio inicial en metros

  // Ubicacion del usuario
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]);
        setLoading(false);
      },
      () => {
        console.error("No se pudo obtener la ubicación");
        setLoading(false);
      }
    );
  }, []);

  // Marcadores cerca
  useEffect(() => {
    if (position) {
      const filtered = additionalMarkers.filter((pos) => {
        const distance = getDistance(position[0], position[1], pos[0], pos[1]);
        return distance <= radius / 1000; // m a km
      });

      const markersWithMockData = filtered.map((pos, idx) => ({
        position: pos,
        name: `Nombre ${idx + 1}`,
        phone: `Telefono ${idx + 1}`,
        imageUrl: "src/assets/mockers/exa1.png", // TODO: Pasar a usar S3
      }));

      setFilteredMarkers(markersWithMockData);
    }
  }, [additionalMarkers, position, radius]);

  const handleMarkerClick = (marker) => {
    setModalContent(marker);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCardClick = (marker) => {
    setModalContent(marker);
    setOpen(true);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          width: "300px",
          borderRight: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MarkerList markers={filteredMarkers} onCardClick={handleCardClick} />
      </Box>
      <Box sx={{ flex: 1 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <MapContainer
            center={position || [-34.603715, -58.381631]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker position={position} radius={radius} />
            <AdditionalMarkers
              markers={filteredMarkers}
              onMarkerClick={handleMarkerClick}
            />
          </MapContainer>
        )}
      </Box>

      {/* TODO: Pasar a componente */}
      <Dialog open={open} onClose={handleClose}>
        {/* //TODO: Agregar toda la info de pet de DynamoDB */}
        <DialogTitle>Información de la mascota:</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Nombre: {modalContent.name}</Typography>
          <Typography variant="body1">
            Teléfono: {modalContent.phone}
          </Typography>
          <Typography variant="body2">
            Ubicación: Lat:{" "}
            {modalContent.position ? modalContent.position[0] : ""}, Lng:{" "}
            {modalContent.position ? modalContent.position[1] : ""}
          </Typography>
          {modalContent.imageUrl && (
            <Box sx={{ marginTop: 2 }}>
              <img
                src={modalContent.imageUrl}
                alt="Imagen del marcador"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MapWithLocation;
