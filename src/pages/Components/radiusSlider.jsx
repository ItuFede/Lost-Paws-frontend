import React, { useState } from "react";
import { Box, IconButton, Slider, Typography } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import InfoIcon from "@mui/icons-material/Info";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/radiusSlider.css";

const RadiusSlider = ({ radius, setRadius }) => {
  const [sliderExpanded, setSliderExpanded] = useState(false);

  const marks = [
    { value: 500, label: "500m" },
    { value: 1000, label: "1000m" },
    { value: 1500, label: "1500m" },
    { value: 2000, label: "2000m" },
  ];

  const showInfoToast = () => {
    toast.info(
      "Puedes ajustar el rango de búsqueda de mascotas perdidas moviendo el control deslizante."
    );
  };

  return (
    <Box
      onMouseEnter={() => setSliderExpanded(true)}
      onMouseLeave={() => setSliderExpanded(false)}
      className={`slider-box ${
        sliderExpanded ? "slider-box-expanded" : "slider-box-collapsed"
      }`}
    >
      {!sliderExpanded ? (
        <IconButton onClick={() => setSliderExpanded(true)}>
          <MyLocationIcon />
        </IconButton>
      ) : (
        <>
          <Typography gutterBottom>Radio (m)</Typography>
          <Slider
            defaultValue={radius}
            marks={marks}
            min={0}
            max={2000}
            step={500}
            onChange={(e, newValue) => setRadius(newValue)}
            valueLabelDisplay="auto"
          />
          <IconButton onClick={showInfoToast} className="info-button">
            <InfoIcon />
          </IconButton>
        </>
      )}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Box>
  );
};

export default RadiusSlider;
