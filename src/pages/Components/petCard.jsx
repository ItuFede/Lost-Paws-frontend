// src/PetCard.js
import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const pin = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png";
const pinMB = L.icon({
  iconUrl: pin,
  iconSize: [24, 41],
  iconAnchor: [0, 44],
  popupAnchor: [12, -40],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});

const getDateByTimestamp = (timestamp) => {
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

const PetCard = ({ pet }) => {
  // TODO: Estaría bueno tener un objeto que represente ese pet.missingReports[0], como que falta una abstracción
  const centerPosition = pet.hasLocations()
    ? [pet.getLatitude(), pet.getLongitud()]
    : null;

  return (
    <Card
      style={{ width: "100%", maxWidth: "600px", marginBottom: "20px" }}
      className={
        pet.getMissingState() === "FOUND" ? "border-success" : "border-danger"
      }
      bg={pet.getMissingState() === "FOUND" ? "success" : "danger"}
      text="white"
    >
      <Card.Header>
        <strong>
          {pet.getMissingState() === "LOST" ? "PERDIDO" : "ENCONTRADO"}
        </strong>
      </Card.Header>
      <Card.Body>
        <Card.Title>{pet.name}</Card.Title>
        <Card.Text>{pet.description}</Card.Text>
        {centerPosition && (
          <MapContainer
            center={centerPosition}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {pet.hasLocations() &&
              pet.getLocations().map((loc, locIndex) => (
                <Marker position={[loc.Latitud, loc.Longitud]} icon={pinMB}>
                  <Popup>
                    Visto el {getDateByTimestamp(loc.Timestamp)}
                    {/* TODO: Agregar img del perro */}
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        )}
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <strong>Localidad:</strong> {pet.town}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Contacto:</strong> {pet.phoneNumberOwner}
        </ListGroup.Item>
        {pet.emailOwner && (
          <ListGroup.Item>
            <strong>Email:</strong> {pet.emailOwner}
          </ListGroup.Item>
        )}
        <ListGroup.Item>
          <strong>Última ubicación:</strong>{" "}
          {pet.hasLocations()
            ? `${pet.getLatitude()}, ${pet.getLongitud()}`
            : "No disponible"}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default PetCard;