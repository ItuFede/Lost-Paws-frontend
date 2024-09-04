import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import { Home } from './pages/home';
import { Paws } from './pages/paws';
import MapScreen from './pages/mapScreen';
import NotFound from './pages/notFound';
import NavBar from './pages/Components/navBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const data = [
    {
        "Id": 1,
        "UniqueIdentifier": "das84gqeg",
        "Nombre": "Pancho",
        "Estado": "PERDIDO",
        "Localidad": "Bernal",
        "LocacionesVisto": [],
        "Descripcion": "Perro marrón, es amigable"
    },
    {
        "Id": 2,
        "UniqueIdentifier": "98fasSg45",
        "Nombre": "Luna",
        "Estado": "PERDIDO",
        "Localidad": "Quilmes",
        "LocacionesVisto": [],
        "Descripcion": "Gata blanca, ojos verdes"
    }
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/paws' element={<Paws />} /> */}
          <Route path='/paws' element={<MapScreen data={data}/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
