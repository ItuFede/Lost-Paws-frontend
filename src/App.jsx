import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material"; // Solo importa Box
import theme from "./styles/theme";
import Home from "./pages/home";
import PetsMap from "./pages/petsMap";
import VetsMap from "./pages/vetsMap";
import UserInfo from "./pages/userInfo";
import UserPetsInfo from "./pages/userPetsInfo";
import PetFoundMap from "./pages/petFoundMap";
import NotFound from "./pages/notFound";
import NavBar from "./pages/Components/navBar";
import Footer from "./pages/Components/footer";
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
              {/* TODO: Esto tiene que estar protegido (USER)*/}
              <Route path="/user" element={<UserInfo />} />
              <Route path="/user/pet" element={<UserPetsInfo />} />
              <Route path="/pet/lost" element={<PetsMap />} />
              <Route path="/vet" element={<VetsMap />} />
              {/* <ProtectedRoute path="/vet" component={VetsMap} /> */}
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
