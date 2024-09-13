const API_KEY = import.meta.env.VITE_API_KEY;

//TODO: Crear fetch por cada request y no uno generico
export const fetchDataFromAPI = async (
  method = "GET",
  endpoint,
  body = null
) => {
  const response = await fetch(endpoint, {
    method,
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });

  console.log("DATA API:::", response);

  if (!response.ok) {
    if (response.status >= 400 && response.statusText < 500) {
      response.error = `Error del cliente: ${response.status} ${response.statusText}`;
    } else if (response.status >= 500 && response.status < 600) {
      console.error("ERROR INTERNO:::", response);
    }
  }

  return await response.json();
};
