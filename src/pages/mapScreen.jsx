import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchDataFromAPI } from "../services/api";
import PetCard from "./Components/petCard";
import Toaster from "./Components/toaster";
import { convertJsonToPet } from "../utils/helper";

const API_GET_ENDPOINT = import.meta.env.VITE_API_GET_ENDPOINT;
const API_PUT_ENDPOINT = import.meta.env.VITE_API_PUT_ENDPOINT;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MapScreen = () => {
  const query = useQuery();
  const [petsData, setPetsData] = useState([]);
  const [position, setPosition] = useState(null);
  const [observer, setObserver] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDataFromAPI("GET", API_GET_ENDPOINT);

      if (!response.error) {
        setPetsData(response.pets);
      } else {
        showToast(
          `Error al buscar las mascotas perdidas: ${response.error}`,
          "error"
        );
      }
    };

    fetchData();
  }, [observer]);

  useEffect(() => {
    const petId = query.get("id");
    if (petId) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.error(err);
          showToast("No se pudo obtener la ubicación.", "error");
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (position) {
        const petId = query.get("id");
        const record = {
          id: petId,
          Latitud: position[0],
          Longitud: position[1],
        };
        console.log("record", record);
        await fetchDataFromAPI("PUT", API_PUT_ENDPOINT, record);
        setObserver(true);
      }
    };

    fetchData();
  }, [position]);

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      {petsData.map((item, index) => (
        <PetCard key={index} pet={convertJsonToPet(item)} />
      ))}
      {toast && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default MapScreen;
