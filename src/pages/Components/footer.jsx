import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#2E7D32",
        py: 2,
        textAlign: "center",
        position: "absolute",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body1">
        © {new Date().getFullYear()} Lost & Paws. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
