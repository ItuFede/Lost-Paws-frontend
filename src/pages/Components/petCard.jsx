// src/PetCard.js
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const pin = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const pinMB = L.icon({
    iconUrl: pin,
    iconSize: [24, 41],
    iconAnchor: [0, 44],
    popupAnchor: [12, -40],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null
  });

const getDateByTimestamp = (timestamp) => {
    const fecha = new Date(timestamp);
    
    const opciones = {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };

    const fechaHoraArgentina = fecha.toLocaleString('es-AR', opciones);

    return fechaHoraArgentina;
}

const PetCard = ({ pet }) => {

    const hasLocations = pet.LocacionesVisto.length > 0;
    const centerPosition = hasLocations
        ? [pet.LocacionesVisto[0].Latitud, pet.LocacionesVisto[0].Longitud]
        : null

    return (
        <Card
            style={{ width: '100%', maxWidth: '600px', marginBottom: '20px' }}
            className={pet.Estado === 'ENCONTRADO' ? 'border-success' : 'border-danger'}
            bg={pet.Estado === 'ENCONTRADO' ? 'success' : 'danger'}
            text="white"
        >
            <Card.Header>
                <strong>{pet.Estado}</strong>
            </Card.Header>
            <Card.Body>
                <Card.Title>{pet.Nombre}</Card.Title>
                <Card.Text>{pet.Descripcion}</Card.Text>
                {centerPosition && <MapContainer
                    center={centerPosition}
                    zoom={13}
                    style={{ height: '300px', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {hasLocations && (
                        pet.LocacionesVisto.map((loc, locIndex) => (
                            <Marker position={[loc.Latitud, loc.Longitud]} icon={pinMB}>
                                <Popup>
                                    Visto el {getDateByTimestamp(loc.Timestamp)}
                                    {/* TODO: Agregar img del perro */}
                                </Popup>
                            </Marker>
                        ))
                    )}
                </MapContainer>
                }
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroup.Item><strong>Localidad:</strong> {pet.Localidad}</ListGroup.Item>
                <ListGroup.Item><strong>Última ubicación:</strong> {hasLocations ? `${pet.LocacionesVisto[0].Latitud}, ${pet.LocacionesVisto[0].Longitud}` : 'No disponible'}</ListGroup.Item>
            </ListGroup>
        </Card>
    );
};

export default PetCard;
