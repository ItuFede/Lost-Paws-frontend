import { convertJsonToPet } from "../utils/helper";

const API_KEY = import.meta.env.VITE_API_KEY;

const API_BASE_ENDPOINT = import.meta.env.VITE_API_BASE_ENDPOINT;
const API_GET_ENDPOINT = import.meta.env.VITE_API_GET_ENDPOINT;
const API_PUT_ENDPOINT = import.meta.env.VITE_API_PUT_ENDPOINT;
const API_GET_VETS_ENDPOINT = import.meta.env.VITE_API_GET_VETS_ENDPOINT;

const fetchDataFromCognito = async (
  method = "GET",
  endpoint,
  accessToken,
  authorization,
  body = null
) => {
  const response = await fetch(endpoint, {
    method,
    headers: {
      "x-access-token": accessToken,
      Authorization: authorization,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    if (response.status >= 400 && response.statusText < 500) {
      response.error = `Error del cliente: ${response.status} ${response.body}`;
    } else if (response.status >= 500 && response.status < 600) {
      console.error("ERROR INTERNO:::", response);
    }
    return response;
  }

  return await response.json();
};

const fetchDataFromAPI = async (method = "GET", endpoint, body = null) => {
  const response = await fetch(endpoint, {
    method,
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    if (response.status >= 400 && response.statusText < 500) {
      response.error = `Error del cliente: ${response.status} ${response.body}`;
    } else if (response.status >= 500 && response.status < 600) {
      console.error("ERROR INTERNO:::", response);
    }
    return response;
  }

  return await response.json();
};

export const getPets = async () => {
  const response = await fetchDataFromAPI("GET", API_GET_ENDPOINT);
  return response.pets.map((pet) => convertJsonToPet(pet));
};

export const getVets = async () => {
  return await fetchDataFromAPI("GET", API_GET_VETS_ENDPOINT);
};

export const getPet = async (id) => {
  const response = await fetchDataFromAPI("GET", API_GET_ENDPOINT + "/" + id);
  return convertJsonToPet(response.pet);
};

export const getPetImages = async (id) => {
  return await fetchDataFromAPI("GET", API_GET_ENDPOINT + "/" + id + "/images");
};

export const getVetLogo = async (id) => {
  return await fetchDataFromAPI("GET", API_GET_ENDPOINT + "/" + id + "/images");
};

export const authUser = async (code, redirecUrl) => {
  return await fetchDataFromAPI(
    "GET",
    API_BASE_ENDPOINT +
      "/auth/?code=" +
      code +
      "&" +
      "redirec_url=" +
      redirecUrl
  );
};

export const refreshToken = async (token) => {
  const tokenParse = JSON.parse(token);
  console.log("tokenParse", tokenParse);
  console.log("tokenParse.refreshToken", tokenParse.refreshToken);
  const fetch = await fetchDataFromCognito(
    "POST",
    API_BASE_ENDPOINT + "/refresh",
    tokenParse.accessToken,
    tokenParse.idToken,
    { refreshToken: tokenParse.refreshToken }
  );
  console.log("refreshToken", fetch);
  return fetch;
};

export const getUserInfo = async (token) => {
  const tokenParse = JSON.parse(token);
  const fetch = await fetchDataFromCognito(
    "GET",
    API_BASE_ENDPOINT + "/user",
    tokenParse.accessToken,
    tokenParse.idToken
  );
  return fetch;
};

export const getUserPetsInfo = async (token) => {
  const tokenParse = JSON.parse(token);
  const fetch = await fetchDataFromCognito(
    "GET",
    API_BASE_ENDPOINT + "/user/pet",
    tokenParse.accessToken,
    tokenParse.idToken
  );
  return fetch;
};

export const updateUserPetLost = async (token, body) => {
  const tokenParse = JSON.parse(token);
  const fetch = await fetchDataFromCognito(
    "PUT",
    API_BASE_ENDPOINT + "/user/pet/lost",
    tokenParse.accessToken,
    tokenParse.idToken,
    body
  );
  return fetch;
};

export const updateUserPetLostCancel = async (token, body) => {
  const tokenParse = JSON.parse(token);
  const fetch = await fetchDataFromCognito(
    "PUT",
    API_BASE_ENDPOINT + "/user/pet/notLost",
    tokenParse.accessToken,
    tokenParse.idToken,
    body
  );
  return fetch;
};

export const updateUserInfo = async (token, body) => {
  const tokenParse = JSON.parse(token);
  return await fetchDataFromCognito(
    "PUT",
    API_BASE_ENDPOINT + "/user/update",
    tokenParse.accessToken,
    tokenParse.idToken,
    body
  );
};

export const updatePet = async (token, body) => {
  const tokenParse = JSON.parse(token);
  return await fetchDataFromCognito(
    "PUT",
    API_BASE_ENDPOINT + "/user/pet",
    tokenParse.accessToken,
    tokenParse.idToken,
    body
  );
};

export const putPetToUser = async (token, body) => {
  const tokenParse = JSON.parse(token);
  return await fetchDataFromCognito(
    "POST",
    API_BASE_ENDPOINT + "/user/pet",
    tokenParse.accessToken,
    tokenParse.idToken,
    body
  );
};

export const deleteUserPet = async (token, petId) => {
  const tokenParse = JSON.parse(token);
  return await fetchDataFromCognito(
    "DELETE",
    API_BASE_ENDPOINT + `/user/pet/${petId}`,
    tokenParse.accessToken,
    tokenParse.idToken
  );
};
