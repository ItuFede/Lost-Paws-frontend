import React from "react";
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
import "./Styles/vetInfoDialog.css";

const VetInfoDialog = ({ open, onClose, modalContent }) => {
  const daysOfWeek = [
    { key: "monday", label: "Lunes" },
    { key: "tuesday", label: "Martes" },
    { key: "wednesday", label: "Miércoles" },
    { key: "thursday", label: "Jueves" },
    { key: "friday", label: "Viernes" },
    { key: "saturday", label: "Sábado" },
    { key: "sunday", label: "Domingo" },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        className: "dialog-paper",
      }}
    >
      <DialogTitle className="dialog-title">
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Información de la Veterinaria
        </Typography>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {modalContent.image && modalContent.image.length > 0 && (
          <Box className="image-container">
            <img
              src={modalContent.image[0]}
              alt="Veterinary Logo"
              className="logo-image"
            />
          </Box>
        )}

        <Typography variant="h6" className="vet-name">
          {modalContent.name}
        </Typography>

        <div style={{ height: "10px" }} />

        <Typography variant="body1">
          <strong>Teléfono:</strong> {modalContent.phone}
        </Typography>

        <div style={{ height: "5px" }} />

        <Typography variant="body1" className="section-title">
          <strong>Redes Sociales:</strong>
        </Typography>
        {modalContent.facebook && (
          <Typography variant="body2">
            <strong>Facebook:</strong>{" "}
            <a
              href={modalContent.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              {modalContent.facebook}
            </a>
          </Typography>
        )}
        {modalContent.instagram && (
          <Typography variant="body2">
            <strong>Instagram:</strong> {modalContent.instagram}
          </Typography>
        )}

        <div style={{ height: "5px" }} />

        {modalContent.tiktok && (
          <Typography variant="body2">
            <strong>TikTok:</strong> {modalContent.tiktok}
          </Typography>
        )}

        <div style={{ height: "5px" }} />

        <Typography variant="body1" className="section-title">
          <strong>Horario de Atención:</strong>
        </Typography>
        {modalContent.businessHours ? (
          daysOfWeek.map(({ key, label }) => (
            <Typography variant="body2" key={key}>
              <strong>{label}:</strong>{" "}
              {modalContent.businessHours[key] === "Closed"
                ? "Cerrado"
                : modalContent.businessHours[key]}
            </Typography>
          ))
        ) : (
          <Typography className="address" variant="body2">
            No hay horarios disponibles.
          </Typography>
        )}

        <div style={{ height: "5px" }} />

        <Typography variant="body2" className="address">
          <strong>Dirección:</strong> {modalContent.address}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default VetInfoDialog;
