import { getDistance } from "../utils/helper";
import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Circle, Marker, useMap } from "react-leaflet";
import { Box, CircularProgress } from "@mui/material";
import "leaflet/dist/leaflet.css";
import MarkerList from "./Components/markerList";
import RadiusSlider from "./Components/radiusSlider";
import MarkerInfoDialog from "./Components/markerInfoDialog";
import { getPets } from "../services/api";
import Toaster from "./Components/toaster";
import { convertJsonToPet } from "../utils/helper";

function LocationMarker({ position, radius }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
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

const PetsMap = () => {
  const [petsData, setPetsData] = useState([]);
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [radius, setRadius] = useState(500); // Radio inicial en metros
  const [toast, setToast] = useState(null);

  const mapRef = useRef(); // Referencia al mapa

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const fetchData = async () => {
    const response = await getPets();

    if (!response.error) {
      setPetsData(response.pets.map((pet) => convertJsonToPet(pet)));
    } else {
      showToast(
        `Error al buscar las mascotas perdidas: ${response.error}`,
        "error"
      );
    }
  };

  // Ubicacion del usuario
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        fetchData();
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
      const filtered = petsData.filter((pet) => {
        const distance = getDistance(
          position[0],
          position[1],
          pet.getLatitude(0),
          pet.getLongitude(0)
        );
        return distance <= radius / 1000; // m a km
      });

      const markers = filtered.map((pet, index) => ({
        position: pet.getFirstLostLocation(),
        name: pet.name,
        zone: pet.town,
        animal: pet.getAnimalType(),
        description: pet.description,
        phone: pet.phoneNumberOwner,
        images: [], //TODO: S3 Service
      }));

      setFilteredMarkers(markers);
    }
  }, [petsData, position, radius]);

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
    const map = mapRef.current;
    if (map) {
      map.flyTo(marker.position, 16); // Hacer zoom al marcador sin cambiar la ubicación
    }
  };

  return (
    <Box sx={{ display: "flex", height: "86vh" }}>
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
          <Box sx={{ position: "relative", height: "86vh" }}>
            <MapContainer
              ref={mapRef} // Asignar la referencia al mapa
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
            <RadiusSlider radius={radius} setRadius={setRadius} />
          </Box>
        )}
      </Box>

      <MarkerInfoDialog
        open={open}
        onClose={handleClose}
        modalContent={modalContent}
      />
    </Box>
  );
};

export default PetsMap;
