import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchDataFromAPI } from "../services/api";
import PetCard from "./Components/petCard";

const API_GET_ENDPOINT = "https://w2xm8ky6b3.execute-api.us-east-1.amazonaws.com/prod/pets";
const API_PUT_ENDPOINT = "https://w2xm8ky6b3.execute-api.us-east-1.amazonaws.com/prod/pets/lost";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MapScreen = () => {
  const query = useQuery();
  const [petsData, setPetsData] = useState([]);
  const [position, setPosition] = useState(null);
  const [observer, setObserver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        setError(false);
        try {
            const response = await fetchDataFromAPI("GET", API_GET_ENDPOINT);
            // response.pets.map((pet) => {console.log("PET:::", pet)})
            if (response.pets && Array.isArray(response.pets)) {
              setPetsData(response.pets);
              //setLoading(false);
            } else {
                throw new Error('Invalid JSON response');
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
            setError(true);
        } finally {
          setLoading(false);
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
        alert("No se pudo obtener la ubicación.");
      }
      )
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (position) {
        const petId = query.get("id");
        const record = {
          "id": petId,
          "Latitud": position[0],
          "Longitud": position[1]
        }
        console.log("record", record)
        await fetchDataFromAPI("PUT", API_PUT_ENDPOINT, record);
        setObserver(true)
      }
    }

    fetchData();
  }, [position]);

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      {petsData.map((item, index) => (
        <PetCard key={index} pet={item} />
      ))}
    </div>
  );
};

export default MapScreen;
