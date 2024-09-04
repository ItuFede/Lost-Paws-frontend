import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PetCard from "./Components/petCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function getNewPosition(position) {
  return {
    "Latitud": position[0],
    "Longitud": position[1],
    "Timestamp": Date.now()
  }
}

const MapScreen = ({ data }) => {
  const query = useQuery();
  const [petsData, setPetsData] = useState(data);
  const [position, setPosition] = useState(null);

  // TODO: Ver el tema del render y como se comporta el mapa

  
  useEffect(() => {
    const petId = parseInt(query.get("id"));
    const uPetId = query.get("uid");
    if (petId && uPetId) {
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
    console.log(position)
    if (position) {
      console.log(position)
      const petId = parseInt(query.get("id"));
      const uPetId = query.get("uid");
      if (petId && uPetId) {
        setPetsData((prevPetsData) =>
          prevPetsData.map((pet) =>
            pet.Id === petId && pet.UniqueIdentifier === uPetId
              ? {
                  ...pet,
                  Estado: "ENCONTRADO",
                  LocacionesVisto: [...pet.LocacionesVisto, getNewPosition(position)],
                }
              : pet
          )
        );
      }
    }
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
