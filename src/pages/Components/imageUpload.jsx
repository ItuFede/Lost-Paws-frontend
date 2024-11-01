import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Typography,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const ImageUpload = ({ images, setImages, error }) => {
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.slice(0, 3 - images.length).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    if (newImages.length + images.length > 3) {
      alert("Solo puedes subir hasta 3 imágenes.");
    } else {
      setImages([...images, ...newImages]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <FormControl fullWidth error={Boolean(error)}>
      <FormLabel>Cargar imágenes de tu mascota (máximo 3)</FormLabel>
      <Box display="flex" alignItems="center" flexDirection="column" mt={1}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="64px"
          height="64px"
          borderRadius="50%"
          border="2px solid #086928"
          mb={1}
        >
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleImageUpload}
            />
            <PhotoCamera fontSize="large" />
          </IconButton>
        </Box>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
      <Box display="flex" gap={2} mt={2} flexWrap="wrap">
        {images.map((image, index) => (
          <Box
            key={index}
            position="relative"
            width="100px"
            height="100px"
            borderRadius={2}
            overflow="hidden"
            border="1px solid #ddd"
          >
            <img
              src={image.preview}
              alt={`Vista previa ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Button
              size="small"
              color="secondary"
              onClick={() => handleRemoveImage(index)}
              style={{ position: "absolute", top: 0, right: 0, padding: 0 }}
            >
              X
            </Button>
          </Box>
        ))}
      </Box>
    </FormControl>
  );
};

export default ImageUpload;
