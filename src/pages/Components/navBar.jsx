// src/components/NavBar.js
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PetsIcon from "@mui/icons-material/Pets";
import ClinicIcon from "@mui/icons-material/LocalHospital";
import AdoptionIcon from "@mui/icons-material/VolunteerActivism";
// import LostAndPawsPNG from "../../assets/images/logo_svg.svg";
import LostAndPawsPNG from "../../assets/images/logo2.png";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#A0D468" }}>
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
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          Lost & Paws
        </Typography>

        {/* Categorias */}
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Button color="inherit" startIcon={<PetsIcon />} sx={{ mr: 2 }}>
            Perdidos
          </Button>
          <Button color="inherit" startIcon={<ClinicIcon />} sx={{ mr: 2 }}>
            Veterinarias
          </Button>
          <Button color="inherit" startIcon={<AdoptionIcon />}>
            Adopción
          </Button>
        </Box>

        {/* Usuario */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Abrir configuraciones">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Usuario" sx={{ bgcolor: "#ff5722" }}>
                U
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              Perfil
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseUserMenu}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Cerrar Sesión
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
