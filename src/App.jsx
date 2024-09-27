import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import Home from "./pages/home";
import PetsMap from "./pages/petsMap";
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
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pet/lost" element={<PetsMap />} />
          <Route path="pet/found/:petId" element={<PetFoundMap />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
