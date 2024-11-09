import React from "react";
import { Box, Typography } from "@mui/material";
import "./Styles/footer.css";

const Footer = () => {
  return (
    <Box className="footer">
      <Typography variant="body1" sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
        © {new Date().getFullYear()} Lost & Paws. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
