import React, { useRef } from "react";
import { Box, Button } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import DownloadIcon from "@mui/icons-material/Download";

const QRCode = ({ qrStringValue, onClose }) => {
  const qrCodeRef = useRef(null);

  const handleDownload = () => {
    const qrCanvas = qrCodeRef.current.querySelector("canvas");
    if (qrCanvas) {
      const imageUrl = qrCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "mascota_qr.png";
      link.click();
    }
  };

  return (
    <Box className="qr-code-container" onClick={onClose} ref={qrCodeRef}>
      <QRCodeCanvas value={qrStringValue} size={200} />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleDownload}
        startIcon={<DownloadIcon />}
      >
        Descargar QR
      </Button>
    </Box>
  );
};

export default QRCode;
