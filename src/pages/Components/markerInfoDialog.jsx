import React, { useState } from "react";
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const MarkerInfoDialog = ({ open, onClose, modalContent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % modalContent.images.length
    );
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + modalContent.images.length) %
        modalContent.images.length
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: 2,
          backgroundColor: "#f5f5f5",
          boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Información de la mascota
        </Typography>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography variant="h6" sx={{ color: "#1976d2" }}>
          {modalContent.name + " " + "(" + modalContent.animal + ")"}
        </Typography>
        <Typography variant="body1">
          <strong>Teléfono:</strong> {modalContent.phone}
        </Typography>
        <Typography variant="body1">
          <strong>Descripción:</strong> {modalContent.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Ubicación:</strong> Lat:{" "}
          {modalContent.position ? modalContent.position[0] : ""}, Lng:{" "}
          {modalContent.position ? modalContent.position[1] : ""}
        </Typography>

        {modalContent.images && modalContent.images.length > 0 && (
          <Box sx={{ marginTop: 3, position: "relative" }}>
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                top: "50%",
                left: 0,
                transform: "translateY(-50%)",
                zIndex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={modalContent.images[currentIndex]}
                alt={`Imagen ${currentIndex + 1}`}
                style={{
                  width: "100%",
                  maxWidth: "250px",
                  maxHeight: "250px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
                }}
              />
            </Box>

            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                top: "50%",
                right: 0,
                transform: "translateY(-50%)",
                zIndex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MarkerInfoDialog;
