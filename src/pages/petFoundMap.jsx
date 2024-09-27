import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PetInfoMap from "./Components/petInfoMap";
import Toaster from "./Components/toaster";
import { convertJsonToPet } from "../utils/helper";

const PetFoundMap = () => {
  const { petId } = useParams();
  const [petData, setPetData] = useState(null);
  const [position, setPosition] = useState(null);
  const [toast, setToast] = useState(null);

  //TODO: Move to utils
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  useEffect(() => {
    const fetchPetData = async () => {
      const mockData = {
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
            {
              latitude: -34.708454,
              longitude: -58.269369,
              timestamp: 1725702000,
            },
          ],
          missingDate: 1725491095,
          state: "LOST",
        },
        ownerId: 1,
        name: "Max",
        animal: "DOG",
        town: "Bernal",
      };

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

      setPetData(convertJsonToPet(mockData));
    };

    fetchPetData();
  }, [petId]);

  useEffect(() => {
    const fetchData = async () => {
      if (position) {
        //const petId = query.get("id");
        /*
        const record = {
          id: petId,
          Latitud: position[0],
          Longitud: position[1],
        };
        console.log("record", record);
        */
        //await updatePet(record);

        const locations = petData.getLocations();

        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime / 1000);

        locations.push({
          latitude: position[0],
          longitude: position[1],
          timestamp: timestamp,
        });
        setPetData(
          convertJsonToPet({
            ...petData,
            missingReport: { locationsView: locations },
          })
        );
      }
    };

    fetchData();
  }, [position]);

  if (!petData) return <div>Cargando información...</div>;

  return (
    <div>
      <PetInfoMap petData={petData} />
      {toast && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      ;
    </div>
  );
};

export default PetFoundMap;
