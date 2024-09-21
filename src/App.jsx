import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { Home } from "./pages/home";
import { Paws } from "./pages/paws";
import MapScreen from "./pages/mapScreen";
import MapWithLocation from "./pages/newMap";
import NotFound from "./pages/notFound";
import NavBar from "./pages/Components/navBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const additionalMarkers = [
  [-34.71083, -58.292655], // Coordenada 1
  [-34.717653, -58.29316], // Coordenada 2
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Router>
        <Routes>
          {/* <Route path="/" element={<MapScreen />} /> */}
          <Route
            path="/"
            element={<MapWithLocation additionalMarkers={additionalMarkers} />}
          />
          <Route path="/paws" element={<MapScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
