import { useEffect, useState } from "react";
import { isTokenExpired, getTokenExpiryTime } from "./../../utils/helper";
import { refreshToken } from "../../services/api";
import { authUser } from "../../services/api";
import { Container, CircularProgress, Box } from "@mui/material";

const COGNITO_CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;
const COGNITO_REDIRECT_URL = import.meta.env.VITE_COGNITO_REDIRECT_URL;
const COGNITO_DOMAIN = import.meta.env.VITE_COGNITO_DOMAIN;

const ProtectedRoute = ({ element, redirectUrl }) => {
  const [loading, setLoading] = useState(true);
  let token = localStorage.getItem("authData");

  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get("code");

  useEffect(() => {
    const initialize = async () => {
      try {
        if (authorizationCode) {
          await checkCode();
        } else if (token && !isTokenExpired(token)) {
          await checkTokenExpiration();
        } else {
          redirectToLogIn();
          return; // No continuar para evitar que `loading` cambie.
        }
      } finally {
        setLoading(false); // Marcar como cargado al final.
      }
    };

    const checkTokenExpiration = async () => {
      if (token && !isTokenExpired(token)) {
        const tokenExpiryTime = getTokenExpiryTime(token);
        const currentTime = Date.now();
        const timeRemaining = tokenExpiryTime - currentTime;

        if (timeRemaining <= 5 * 60 * 1000) {
          // 5 min para vencer
          const newToken = await refreshToken(token);
          if (newToken) {
            localStorage.setItem("authData", newToken);
          }
        }
      }
    };

    const checkCode = async () => {
      console.log("authorizationCode:::", authorizationCode);
      if (authorizationCode) {
        const response = await authUser(
          authorizationCode,
          window.location.origin + window.location.pathname
        );
        console.log("response:::", response);
        if (response?.accessToken) {
          console.log("response?.accessToken:::", response.accessToken);
          localStorage.setItem("authData", JSON.stringify(response));
        }
        const newUrl = window.location.origin + window.location.pathname;
        console.log("newUrl:::", newUrl);
        window.history.replaceState({}, document.title, newUrl);
      }
    };

    const redirectToLogIn = () => {
      localStorage.removeItem("authData");

      const clientId = COGNITO_CLIENT_ID;
      const domain = COGNITO_DOMAIN;
      const cognitoUrl = `https://${domain}/login?client_id=${clientId}&response_type=code&scope=openid+email&redirect_uri=${redirectUrl}`;
      console.log("cognitoUrl", cognitoUrl);

      console.log("token:::", token);
      window.location.href = cognitoUrl;
    };

    initialize();

    const interval = setInterval(checkTokenExpiration, 60 * 1000); // Check cada 1 min

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Container maxWidth="sm" className="user-info-container">
        <Box className="loading-box">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return element;
};

export default ProtectedRoute;
