import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { Home } from "./pages/home";
import { Paws } from "./pages/paws";
import MapScreen from "./pages/mapScreen";
import NotFound from "./pages/notFound";
import NavBar from "./pages/Components/navBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<MapScreen />} />
          <Route path="/paws" element={<MapScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
