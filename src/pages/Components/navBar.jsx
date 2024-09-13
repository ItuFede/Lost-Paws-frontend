// src/components/NavBar.js
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import LostAndPawsPNG from "../../assets/images/LostAndPaws.svg";
import LostAndPawsPNG from "../../assets/images/logo_svg.svg";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="logo"
          sx={{ mr: 2 }}
        >
          <img
            src={LostAndPawsPNG}
            alt="Lost & Paws"
            style={{ width: 60, height: 60 }}
          />
        </IconButton>
        <Typography variant="h6" component="div">
          Lost & Paws
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
