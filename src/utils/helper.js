import Pet from "../models/pet";
import Vet from "../models/vet";
import imageCompression from "browser-image-compression";

export function convertJsonToPet(jsonObject) {
  return new Pet(jsonObject);
}

export function convertJsonToVet(jsonObject) {
  return new Vet(jsonObject);
}

export const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radio de la tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distancia en km
};

export const getDateByTimestamp = (timestamp) => {
  const fecha = new Date(timestamp * 1000);
  const opciones = {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return fecha.toLocaleString("es-AR", opciones);
};

export const getDateYMDByTimestamp = (timestamp) => {
  const fecha = new Date(timestamp);
  const opciones = {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return fecha.toLocaleString("es-AR", opciones);
};

export const compressImage = async (file) => {
  const options = {
    maxWidthOrHeight: 720, // Define el ancho máximo
    useWebWorker: true, // Usa web worker para mejorar el rendimiento
    maxSizeMB: 1, // Tamaño máximo en MB (ajústalo según tus necesidades)
    maxIteration: 3, // Límite de iteración para intentar comprimir más
    initialQuality: 0.8, // Calidad inicial (ajústala si necesitas menos peso)
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Error al comprimir la imagen:", error);
  }
};

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = JSON.parse(atob(token.split(".")[1]));
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime > exp;
};

export const getTokenExpiryTime = (token) => {
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));

    return decodedPayload.exp * 1000; // Convertir a milisegundos
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};
