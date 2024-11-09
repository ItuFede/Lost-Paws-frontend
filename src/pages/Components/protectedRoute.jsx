import { useEffect } from "react";
import { isTokenExpired, getTokenExpiryTime } from "./../../utils/helper";
import { refreshToken } from "../../services/api";

const COGNITO_CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;
const COGNITO_REDIRECT_URL = import.meta.env.VITE_COGNITO_REDIRECT_URL;
const COGNITO_DOMAIN = import.meta.env.VITE_COGNITO_DOMAIN;

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("authData");

  useEffect(() => {
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

    checkTokenExpiration();

    const interval = setInterval(checkTokenExpiration, 60 * 1000); // Check cada 1 min

    return () => clearInterval(interval);
  }, [token]);

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("authData");

    const clientId = COGNITO_CLIENT_ID;
    const redirectUri = COGNITO_REDIRECT_URL;
    const domain = COGNITO_DOMAIN;
    const cognitoUrl = `https://${domain}/login?client_id=${clientId}&response_type=code&scope=openid+email&redirect_uri=${redirectUri}`;

    window.location.href = cognitoUrl;
    return null;
  }

  return element;
};

export default ProtectedRoute;
