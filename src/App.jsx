import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import theme from "./styles/theme";
import Home from "./pages/home/home";
import PetsMap from "./pages/petsMap/petsMap";
import VetsMap from "./pages/vetsMap/vetsMap";
import UserInfo from "./pages/userInfo/userInfo";
import UserPetsInfo from "./pages/userPetsInfo/userPetsInfo";
import PetFoundMap from "./pages/petFoundMap/petFoundMap";
import RegisterPetForm from "./pages/registerPetForm/registerPetForm";
import NotFound from "./pages/notFound/notFound";
import NavBar from "./pages/Components/navBar";
import Footer from "./pages/Components/footer";
import ProtectedRoute from "./pages/Components/protectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
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
          <NavBar />
          <Box flexGrow={1}>
            {" "}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/user"
                element={<ProtectedRoute element={<UserInfo />} />}
              />
              <Route
                path="/user/pet"
                element={<ProtectedRoute element={<UserPetsInfo />} />}
              />
              <Route
                path="/pet/register"
                element={<ProtectedRoute element={<RegisterPetForm />} />}
              />
              <Route path="/pet/lost" element={<PetsMap />} />
              <Route path="/vet" element={<VetsMap />} />
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
