import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Circle, Marker, useMap } from "react-leaflet";
import { Box, CircularProgress } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { getVets, getVetLogo } from "../services/api";
import { convertJsonToVet } from "../utils/helper";
import VetInfoDialog from "./Components/vetInfoDialog";

function LocationMarker({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 15);
    }
  }, [position, map]);

  return position === null ? null : (
    <>
      <Circle center={position} radius={5} color="blue" />
    </>
  );
}

function VetMarkers({ markers, onMarkerClick }) {
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

const VetsMap = () => {
  const [vetsData, setVetsData] = useState([]);
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vetMarkers, setVetMarkers] = useState([]);
  const [modalContent, setModalContent] = useState({});
  const [open, setOpen] = useState(false);

  const mapRef = useRef(); // Referencia al mapa

  const fetchData = async () => {
    const response = await getVets();

    if (!response.error) {
      setVetsData(response.vets.map((vet) => convertJsonToVet(vet)));
    } else {
      showToast(`Error al buscar las veterinarias: ${response.error}`, "error");
    }
  };

  // Ubicacion del usuario
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        fetchData();
        const { latitude, longitude } = location.coords;
        //setPosition([latitude, longitude]);
        //TODO: Delete Mock
        setPosition([-34.710811, -58.292755]);
        setLoading(false);
      },
      () => {
        console.error("No se pudo obtener la ubicación");
        setLoading(false);
      }
    );
  }, []);

  const fetchVetImage = async (id) => {
    return await getVetLogo(id);
  };

  useEffect(() => {
    const markers = vetsData.map((vet, index) => ({
      id: vet.id,
      position: vet.getLocation(),
      name: vet.name,
      description: vet.description,
      phone: vet.phone,
      email: vet.email,
      geoLocation: vet.geoLocation,
      facebook: vet.socialNetworks.facebook,
      instagram: vet.socialNetworks.instagram,
      tiktok: vet.socialNetworks.tiktok,
      address: vet.address,
      businessHours: vet.businessHours,
      image: null,
    }));

    setVetMarkers(markers);
  }, [vetsData]);

  const handleMarkerClick = async (marker) => {
    const vetImg = await fetchVetImage(marker.id);
    marker.image = vetImg;
    setModalContent(marker);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", height: "86vh" }}>
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
              <LocationMarker position={position} />
              <VetMarkers
                markers={vetMarkers}
                onMarkerClick={handleMarkerClick}
              />
            </MapContainer>
          </Box>
        )}
      </Box>

      <VetInfoDialog
        open={open}
        onClose={handleClose}
        modalContent={modalContent}
      />
    </Box>
  );
};

export default VetsMap;
