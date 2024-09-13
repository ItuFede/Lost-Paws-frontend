import Pet from "../models/pet";

export function convertJsonToPet(jsonObject) {
  return new Pet(jsonObject);
}
