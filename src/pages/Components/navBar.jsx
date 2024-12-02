import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PetsIcon from "@mui/icons-material/Pets";
import ClinicIcon from "@mui/icons-material/LocalHospital";
import AdoptionIcon from "@mui/icons-material/VolunteerActivism";
import MenuIcon from "@mui/icons-material/Menu";
import LostAndPawsPNG from "../../assets/images/logo2.png";

import { authUser } from "../../services/api";

const COGNITO_CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;
const COGNITO_REDIRECT_URL = import.meta.env.VITE_COGNITO_REDIRECT_URL;
const COGNITO_DOMAIN = import.meta.env.VITE_COGNITO_DOMAIN;

const NavBar = ({ setLoading }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  let token = localStorage.getItem("authData");

  useEffect(() => {
    setAuth(token);
  }, [token]);

  useEffect(() => {
    function doesNotContainUserOrPetWords(input) {
      const forbiddenWords = /user|pet/i;
      return !forbiddenWords.test(input);
    }

    const authorizeUser = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get("code");
      const savedAuth = localStorage.getItem("authData");
      if (
        authorizationCode &&
        !savedAuth &&
        doesNotContainUserOrPetWords(window.location.href)
      ) {
        setLoading(true);
        const response = await authUser(
          authorizationCode,
          window.location.origin + "/"
        );
        if (response?.accessToken) {
          setAuth(response);
          localStorage.setItem("authData", JSON.stringify(response));
        }
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
        setLoading(false);
      } else {
        setAuth(JSON.parse(savedAuth));
      }
    };

    authorizeUser();
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem("authData");
    navigate("/");
    setAnchorEl(null);
    window.location.reload();
  };

  const goToLostPage = () => {
    navigate("/pet/lost");
  };

  const goToVetsPage = () => {
    navigate("/vet");
  };

  const goToHomePage = () => {
    navigate("/");
  };

  const handleGoToUserInfo = () => {
    navigate("/user");
    setAnchorEl(null);
  };

  const handleGoToUserPetsInfo = () => {
    navigate("/user/pet");
    setAnchorEl(null);
  };

  const handleLogin = () => {
    const clientId = COGNITO_CLIENT_ID;
    const redirectUri = COGNITO_REDIRECT_URL;
    const domain = COGNITO_DOMAIN;
    const cognitoUrl = `https://${domain}/login?client_id=${clientId}&response_type=code&scope=openid+email&redirect_uri=${redirectUri}`;

    window.location.href = cognitoUrl;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#A0D468", height: "8vh" }}
    >
      <Toolbar>
        <IconButton
          onClick={goToHomePage}
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

        {/* Boton mobile*/}
        <IconButton
          color="inherit"
          onClick={toggleMobileMenu}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Menu mobile */}
        <Menu
          anchorEl={mobileMenuOpen ? document.body : null}
          open={mobileMenuOpen}
          onClose={toggleMobileMenu}
          sx={{ display: { xs: "block", md: "none" } }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={goToLostPage}>Perdidos</MenuItem>
          <MenuItem onClick={goToVetsPage}>Veterinarias</MenuItem>
          {auth && <MenuItem onClick={handleGoToUserInfo}>Perfil</MenuItem>}
          {auth && (
            <MenuItem
              data-testid="userPetsButton"
              onClick={handleGoToUserPetsInfo}
            >
              Mis mascotas
            </MenuItem>
          )}
          <Divider />
          {auth ? (
            <MenuItem onClick={handleLogOut}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Cerrar Sesión
            </MenuItem>
          ) : (
            <MenuItem data-testid="iniciarSesion" onClick={handleLogin}>
              <ListItemIcon>
                <LoginIcon fontSize="small" />
              </ListItemIcon>
              Iniciar Sesión
            </MenuItem>
          )}
        </Menu>

        {/* Categorías para pantallas más grandes */}
        <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1, gap: 8 }}>
          <Button
            color="inherit"
            startIcon={<PetsIcon />}
            sx={{
              fontWeight: "bold",
              border:
                location.pathname === "/pet/lost" ? "2px solid black" : "none",
              borderRadius: "4px",
            }}
            onClick={goToLostPage}
          >
            Perdidos
          </Button>
          <Button
            color="inherit"
            startIcon={<ClinicIcon />}
            sx={{
              fontWeight: "bold",
              border: location.pathname === "/vet" ? "2px solid black" : "none",
              borderRadius: "4px",
            }}
            onClick={goToVetsPage}
          >
            Veterinarias
          </Button>

          {/* <Button
            color="inherit"
            startIcon={<AdoptionIcon />}
            sx={{
              fontWeight: "bold",
              border:
                location.pathname === "/adoptions" ? "2px solid black" : "none",
              borderRadius: "4px",
            }}
          >
            Adopción
          </Button> */}
        </Box>

        {/* Usuario o Login */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {auth ? (
            <Tooltip title="Abrir configuraciones">
              <IconButton
                data-testid="userConfig"
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <AccountCircleIcon sx={{ fontSize: 48, color: "#363636" }} />
              </IconButton>
            </Tooltip>
          ) : (
            <Button
              data-testid="iniciarSesion"
              color="inherit"
              onClick={handleLogin}
              startIcon={<LoginIcon />}
              sx={{
                borderRadius: "6px",
                border: "2px solid black",
                padding: "8px 18px",
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "#FFB74D",
                color: "black",
                transition: "background-color 0.3s ease, transform 0.2s ease",
                "&:hover": {
                  backgroundColor: "#fb8c00",
                  transform: "scale(1.03)",
                },
              }}
            >
              Iniciar Sesión
            </Button>
          )}
          <Menu
            sx={{ mt: "45px" }}
            data-testid="menu-appbar"
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
            <MenuItem onClick={handleGoToUserInfo}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              Perfil
            </MenuItem>
            <Divider />
            <MenuItem
              data-testid="userPetsButton"
              onClick={handleGoToUserPetsInfo}
            >
              <ListItemIcon>
                <PetsIcon fontSize="small" />
              </ListItemIcon>
              Mis mascotas
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogOut}>
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
