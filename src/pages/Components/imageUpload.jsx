import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  IconButton,
  Typography,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { compressImage, fileToBase64 } from "./../../utils/helper";
import useErrorHandling from "./../hooks/useErrorHandling";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/imageUpload.css";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024; // 8 MB
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png"];

const ImageUpload = ({ images, setImages, error }) => {
  const { handleError } = useErrorHandling();
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    setLoading(true);
    const files = Array.from(event.target.files);
    const newImages = [];

    try {
      for (const file of files.slice(0, 3 - images.length)) {
        // Verificar el tipo de archivo
        if (!VALID_IMAGE_TYPES.includes(file.type)) {
          handleError({
            errorMessage: `El formato de la imagen ${file.name} no es válido. Solo se permiten JPEG y PNG.`,
          });
          continue;
        }

        // Verificar si la imagen es menor de 8 MB
        if (file.size > MAX_IMAGE_SIZE) {
          handleError({
            errorMessage: `La imagen ${file.name} excede el límite de 8 MB.`,
          });
          continue;
        }

        const compressedFile = await compressImage(file);
        const base64 = await fileToBase64(compressedFile);

        console.log("img:::", { compressedFile, base64 });
        newImages.push({
          file: compressedFile,
          preview: URL.createObjectURL(compressedFile),
          base64,
        });
      }

      if (newImages.length + images.length > 3) {
        handleError({ errorMessage: "Solo puedes subir hasta 3 imágenes." });
      } else {
        setImages([...images, ...newImages]);
      }
    } catch (error) {
      console.error("Error al comprimir las imágenes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div>
      <ToastContainer />
      <FormControl fullWidth error={Boolean(error)}>
        <FormLabel>
          Cargar imágenes de tu mascota (máximo 3, hasta 8 MB cada una, solo
          JPEG o PNG)
        </FormLabel>
        <Box className="upload-form-container">
          <Box className="upload-icon-box">
            {loading ? (
              <CircularProgress color="primary" />
            ) : (
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
            )}
          </Box>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
        <Box display="flex" gap={2} mt={2} flexWrap="wrap">
          {images.map((image, index) => (
            <Box key={index} className="upload-image-container">
              <img
                src={image.preview}
                alt={`Vista previa ${index + 1}`}
                className="upload-image"
              />
              <Button
                size="small"
                color="secondary"
                onClick={() => handleRemoveImage(index)}
                className="remove-button"
              >
                X
              </Button>
            </Box>
          ))}
        </Box>
      </FormControl>
    </div>
  );
};

export default ImageUpload;
