import React, { useState } from "react";
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./Styles/markerInfoDialog.css";

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
        className: "dialog-paper",
      }}
    >
      <DialogTitle className="dialog-title">
        <Typography variant="h6" className="dialog-title-typography">
          Información de la mascota
        </Typography>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography variant="h6" className="typography-highlight">
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
          <Box className="modal-image-container">
            <IconButton
              onClick={handlePrev}
              className="nav-button nav-button-left"
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={modalContent.images[currentIndex]}
                alt={`Imagen ${currentIndex + 1}`}
                className="modal-image"
              />
            </Box>

            <IconButton
              onClick={handleNext}
              className="nav-button nav-button-right"
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
