import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import theme from "./styles/theme";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Home from "./pages/home/home";
import PetsMap from "./pages/petsMap/petsMap";
import VetsMap from "./pages/vetsMap/vetsMap";
import UserInfo from "./pages/userInfo/userInfo";
import UserPetsInfo from "./pages/userPetsInfo/userPetsInfo";
import PetFoundMap from "./pages/petFoundMap/petFoundMap";
import RegisterPetForm from "./pages/registerPetForm/registerPetForm";
import UpdatePetForm from "./pages/updatePetForm/updatePetForm";
import LostPetForm from "./pages/lostPetForm/lostPetForm";
import NotFound from "./pages/notFound/notFound";
import NavBar from "./pages/Components/navBar";
import Footer from "./pages/Components/footer";
import ProtectedRoute from "./pages/Components/protectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);

  const HOST = "http://localhost:5173/";

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            width: "100vw",
            mx: 0,
            overflowX: "hidden",
          }}
        >
          <NavBar setLoading={setLoading} />
          <Backdrop open={loading} sx={{ zIndex: 9999, color: "#fff" }}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Box flexGrow={1}>
            {" "}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/user"
                element={
                  <ProtectedRoute
                    element={<UserInfo />}
                    redirectUrl={`${HOST}user/`}
                  />
                }
              />
              <Route
                path="/user/pet"
                element={
                  <ProtectedRoute
                    element={<UserPetsInfo />}
                    redirectUrl={`${HOST}/user/pet`}
                  />
                }
              />
              <Route
                path="/pet/register"
                element={
                  <ProtectedRoute
                    element={<RegisterPetForm />}
                    redirectUrl={`${HOST}/pet/register`}
                  />
                }
              />
              <Route
                path="/pet/edit"
                element={
                  <ProtectedRoute
                    element={<UpdatePetForm />}
                    redirectUrl={`${HOST}/pet/edit`}
                  />
                }
              />
              <Route path="/pet/lost" element={<PetsMap />} />
              <Route path="/vet" element={<VetsMap />} />
              <Route
                path="/user/pet/lost"
                element={
                  <ProtectedRoute
                    element={<LostPetForm />}
                    redirectUrl={`${HOST}/user/pet/lost`}
                  />
                }
              />
              <Route path="pet/found/:petId" element={<PetFoundMap />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
