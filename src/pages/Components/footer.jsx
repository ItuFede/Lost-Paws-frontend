import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#A0D468",
        py: 2,
        textAlign: "center",
        width: "100%",
      }}
    >
      <Typography variant="body1" sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
        © {new Date().getFullYear()} Lost & Paws. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
