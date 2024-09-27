import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PetInfoMap from "./Components/petInfoMap";
import Toaster from "./Components/toaster";
import { getPet, updatePet } from "../services/api";
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

  const validateUUID = (uuid) => {
    const regexUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regexUUID.test(uuid);
  };

  useEffect(() => {
    const fetchPetData = async () => {
      const validUUID = validateUUID(petId);

      if (validUUID) {
        const response = await getPet(petId);
        setPetData(convertJsonToPet(response.pet));
      }

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
    };

    fetchPetData();
  }, [petId]);

  useEffect(() => {
    const fetchData = async () => {
      if (position && petData) {
        const record = {
          id: petId,
          latitude: position[0],
          longitude: position[1],
        };
        console.log("record:::", record);
        await updatePet(record);

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
