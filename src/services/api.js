// src/services/api.js

const API_KEY = "HoQFjoytly4zlNoHMgEQq2g11SjlUg1WavasQM5j";

export const fetchDataFromAPI = async (method = "GET", endpoint, body = null) => {
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
      });
  
      console.log("DATA API");
  
      if (!response.ok) {
        // Falta
        // capturar el mensaje de error si es 4xx para mostrarlo
        // si es 5xx hay que loguearlo internamente
        throw new Error("Error en la solicitud");
      }
  
      const data = await response.json();
      return data;
    // Volar el catch
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };
  