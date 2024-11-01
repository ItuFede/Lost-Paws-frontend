import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Grid,
  Autocomplete,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import ImageUpload from "./Components/imageUpload";

const petCharacteristics = [
  "Tímido",
  "Cariñoso",
  "Asustadizo",
  "Juguetón",
  "Protector",
  "Amigable",
];

const generalColors = [
  "Blanco",
  "Marrón",
  "Negro",
  "Naranja",
  "Gris",
  "Dorado",
];

const RegisterPetForm = () => {
  const [formData, setFormData] = useState({
    birthDate: null,
    animal: "",
    breed: "",
    characteristics: [],
    description: "",
    colors: [],
    name: "",
    sex: "",
    size: "",
    medicalTreatment: "",
    images: [],
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, birthDate: date }));
    setErrors((prevErrors) => ({ ...prevErrors, birthDate: "" }));
  };

  const handleCheckboxChange = (event, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      characteristics: newValue,
    }));
  };

  const handleColorsChange = (event, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      colors: newValue,
    }));
  };

  const handleImageUpload = (newImages) => {
    setFormData((prevData) => ({
      ...prevData,
      images: newImages,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "El nombre es obligatorio.";
    if (!formData.animal) newErrors.animal = "El animal es obligatorio.";
    if (!formData.birthDate)
      newErrors.birthDate = "La fecha de nacimiento es obligatoria.";
    if (!formData.sex) newErrors.sex = "El sexo es obligatorio.";
    if (!formData.size) newErrors.size = "El tamaño es obligatorio.";
    if (formData.colors.length === 0)
      newErrors.colors = "Los colores generales son obligatorios.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Datos del formulario de mascota:", formData);
      //TODO: Llamar al service API.
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} p={3} maxWidth="md" mx="auto">
      <Typography variant="h4" gutterBottom textAlign="center">
        Registrar Nueva Mascota
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name}
            data-testid="name"
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth error={Boolean(errors.animal)}>
            <FormLabel>Animal</FormLabel>
            <Select
              name="animal"
              value={formData.animal}
              onChange={handleInputChange}
              data-testid="animal-select"
            >
              <MenuItem value="">
                <em>Selecciona un animal</em>
              </MenuItem>
              <MenuItem value="Perro">Perro</MenuItem>
              <MenuItem value="Gato">Gato</MenuItem>
            </Select>
            {errors.animal && (
              <Typography color="error">{errors.animal}</Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <FormLabel>Características</FormLabel>
            <Autocomplete
              multiple
              options={petCharacteristics}
              value={formData.characteristics}
              onChange={handleCheckboxChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Selecciona características"
                  data-testid="characteristics"
                />
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Raza"
            name="breed"
            value={formData.breed}
            onChange={handleInputChange}
            fullWidth
            data-testid="breed"
          />
        </Grid>

        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Fecha de nacimiento"
              value={formData.birthDate}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={Boolean(errors.birthDate)}
                  helperText={errors.birthDate}
                  data-testid="birth-date"
                />
              )}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={6}>
          <FormControl
            component="fieldset"
            fullWidth
            error={Boolean(errors.sex)}
          >
            <FormLabel>Sexo</FormLabel>
            <RadioGroup
              row
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
              data-testid="sex"
            >
              <FormControlLabel
                value="Macho"
                control={<Radio />}
                label="Macho"
              />
              <FormControlLabel
                value="Hembra"
                control={<Radio />}
                label="Hembra"
              />
            </RadioGroup>
            {errors.sex && <Typography color="error">{errors.sex}</Typography>}
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth error={Boolean(errors.size)}>
            <FormLabel>Tamaño</FormLabel>
            <Select
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              data-testid="size"
            >
              <MenuItem value="">
                <em>Selecciona un tamaño</em>
              </MenuItem>
              <MenuItem value="CHICO">CHICO</MenuItem>
              <MenuItem value="MEDIANO">MEDIANO</MenuItem>
              <MenuItem value="GRANDE">GRANDE</MenuItem>
            </Select>
            {errors.size && (
              <Typography color="error">{errors.size}</Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth error={Boolean(errors.colors)}>
            <FormLabel>Colores generales</FormLabel>
            <Autocomplete
              multiple
              options={generalColors}
              value={formData.colors}
              onChange={handleColorsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Selecciona colores"
                  data-testid="colors"
                />
              )}
            />
            {errors.colors && (
              <Typography color="error">{errors.colors}</Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Descripción"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            data-testid="description"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Tratamientos médicos"
            name="medicalTreatment"
            value={formData.medicalTreatment}
            onChange={handleInputChange}
            fullWidth
            data-testid="medical-treatment"
          />
        </Grid>

        <Grid item xs={12}>
          <ImageUpload
            images={formData.images}
            setImages={handleImageUpload}
            error={errors.images}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" type="submit" color="primary" fullWidth>
            Registrar Mascota
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterPetForm;
