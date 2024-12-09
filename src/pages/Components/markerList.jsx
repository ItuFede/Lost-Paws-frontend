import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const MarkerList = ({ markers, onCardClick }) => {
  if (!markers.length > 0)
    return (
      <Box sx={{ padding: 2, overflowY: "auto", maxHeight: "100vh" }}>
        <Typography variant="h7">
          No se encuentran mascotas por tu zona.
        </Typography>
      </Box>
    );
  return (
    <Box sx={{ padding: 2, overflowY: "auto", maxHeight: "100vh" }}>
      {markers.map((marker, idx) => (
        <Card
          key={idx}
          sx={{ marginBottom: 2 }}
          onClick={() => onCardClick(marker)}
        >
          <CardContent>
            <Typography variant="h6">Nombre: {marker.name}</Typography>
            <Typography variant="body1">Animal: {marker.animal}</Typography>
            <Typography variant="body1">Telefono: {marker.phone}</Typography>
            {/* <Typography variant="body2">Zona: {marker.zone}</Typography> */}
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => onCardClick(marker)}
            >
              Ver en el Mapa
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default MarkerList;
