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
    //const response = await getPets();
    //TODO: remove this, just for testing purposes:
    const response = {
      pets: [
        {
          id: "10ee03e2-acb8-4e6a-8f8a-05c7b5a892c7",
          description:
            "¡Gente, ayuda! Se me perdió Max, mi pastor alemán, por la plaza del maestro. Tiene cinco años, es grandote, negro y marrón con una manchita blanca en el pecho. Lleva un collar rojo, es re buenazo pero medio tímido con la gente que no conoce. Si alguien lo vio o sabe algo, por favor avísenme, ¡estamos desesperados!",
          isLost: "TRUE",
          phoneNumberOwner: "11 2244-8866",
          missingReport: {
            locationsView: [
              {
                latitude: -34.706021,
                longitude: -58.274941,
                timestamp: 1725491095,
              },
            ],
            missingDate: 1725491095,
            state: "LOST",
          },
          ownerId: 1,
          name: "Max",
          animal: "DOG",
          town: "Bernal",
        },
        {
          id: "f12b43b1-95e8-45f3-bb19-ec473b8c6ad8",
          description:
            "Roberto es un gato siamés de dos años. Su pelaje es corto y claro, con manchas oscuras en las orejas, patas y cola. Es de tamaño pequeño y lleva un collar azul con una campanita. Se perdió en la plaza de Belen BERNAL.",
          phoneNumberOwner: "11 2864-4566",
          isLost: "TRUE",
          missingReport: {
            locationsView: [
              {
                latitude: -34.719207,
                longitude: -58.299668,
                timestamp: 1724967425,
              },
            ],
            missingDate: 1724967425,
            state: "LOST",
          },
          ownerId: 3,
          name: "Roberto",
          animal: "CAT",
          town: "Buenos Aires",
        },
        {
          id: "60ee03e2-acb8-4e6a-8f8a-05c7b5a892c9",
          description:
            "Luna es una perrita beagle de tres años. Su pelaje es tricolor, con predominancia de marrón, blanco y negro. Es de tamaño mediano, con orejas largas y caídas, y lleva un collar rosa con una pequeña placa en forma de hueso. Luna es muy juguetona y le encanta seguir olores. Se extravió cerca del barrio residencial el lunes por la tarde.",
          phoneNumberOwner: "-",
          isLost: "TRUE",
          missingReport: {
            locationsView: [
              {
                latitude: -34.814911,
                longitude: -58.463506,
                timestamp: 1724915325,
              },
            ],
            missingDate: 1724915325,
            state: "LOST",
          },
          ownerId: 2,
          name: "Luna",
          animal: "DOG",
          town: "Monte Grande",
        },
        {
          id: "40ee03e2-acb8-4e6a-8f8a-05c7b5a89333",
          description:
            "Oli es un gato siamés de dos años. Tiene ojos azules brillantes y un pelaje claro con extremidades marrones. Es de tamaño pequeño, delgado y lleva un collar verde con una campanita. Oliver es muy curioso y suele explorar los alrededores. Se perdió el martes por la noche cerca de la estacion de Bernal.",
          phoneNumberOwner: "-",
          isLost: "TRUE",
          missingReport: {
            locationsView: [
              {
                latitude: -34.710631,
                longitude: -58.279373,
                timestamp: 1725280032,
              },
            ],
            missingDate: 1725280032,
            state: "LOST",
          },
          ownerId: 3,
          name: "Oliver",
          animal: "CAT",
          town: "Bernal",
        },
      ],
    };

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
        imageUrl: "src/assets/mockers/exa1.png", // TODO: Pasar a usar S3,
        images: [
          "src/assets/mockers/exa1.png",
          "src/assets/images/logo.png",
          "src/assets/images/logo2.png",
        ],
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
