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
          Información de la Veterinaria
        </Typography>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {/* Mostrar la imagen del logo circular */}
        {modalContent.image && modalContent.image.length > 0 && (
          <Box
            sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
          >
            <img
              src={modalContent.image[0]}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
              }}
            />
          </Box>
        )}

        <Typography variant="h6" sx={{ color: "#1976d2" }}>
          {modalContent.name}
        </Typography>
        <Typography variant="body1">
          <strong>Teléfono:</strong> {modalContent.phone}
        </Typography>

        <Typography variant="body1" sx={{ marginTop: 2 }}>
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
        {modalContent.tiktok && (
          <Typography variant="body2">
            <strong>TikTok:</strong> {modalContent.tiktok}
          </Typography>
        )}

        <Typography variant="body1" sx={{ marginTop: 2 }}>
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
          <Typography variant="body2">No hay horarios disponibles.</Typography>
        )}

        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
          <strong>Dirección:</strong> {modalContent.address}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default VetInfoDialog;
