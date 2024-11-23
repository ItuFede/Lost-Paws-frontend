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
import ImageUpload from "../Components/imageUpload";
import { putPetToUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleDateChange = (date) => {
    if (date > new Date()) {
      setErrors((prev) => ({
        ...prev,
        birthDate: "No puedes seleccionar una fecha futura",
      }));
    } else {
      setErrors((prev) => ({ ...prev, birthDate: "" }));
      setFormData((prev) => ({ ...prev, birthDate: date }));
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    console.log("validationErrors:::", validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Datos del formulario de mascota:", formData);
      const auth = localStorage.getItem("authData");
      const register = await putPetToUser(auth, formData);
      console.log("register:::", register);
      navigate("/user/pet");
    }
  };

  return (
    <Box className="background-pet">
      <Box
        component="form"
        onSubmit={handleSubmit}
        p={2}
        m={2}
        maxWidth="md"
        mx="auto"
        sx={{
          backgroundColor: "white",
        }}
      >
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
              id="name"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth error={Boolean(errors.animal)}>
              <FormLabel>Animal</FormLabel>
              <Select
                name="animal"
                value={formData.animal}
                onChange={handleInputChange}
                id="animal-select"
              >
                <MenuItem value="">
                  <em>Selecciona un animal</em>
                </MenuItem>
                <MenuItem id="dogItem" value="Perro">
                  Perro
                </MenuItem>
                <MenuItem id="catItem" value="Gato">
                  Gato
                </MenuItem>
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
                id="characteristics"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Selecciona características"
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
              id="breed"
            />
          </Grid>

          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Fecha de nacimiento"
                value={formData.birthDate}
                onChange={handleDateChange}
                id="birth-date"
                maxDate={new Date()}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={Boolean(errors.birthDate)}
                    helperText={errors.birthDate}
                  />
                )}
              />
              {errors.birthDate && (
                <Typography color="error">{errors.birthDate}</Typography>
              )}
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
                id="sex"
              >
                <FormControlLabel
                  id="maleRadio"
                  value="Macho"
                  control={<Radio />}
                  label="Macho"
                />
                <FormControlLabel
                  id="femaleRadio"
                  value="Hembra"
                  control={<Radio />}
                  label="Hembra"
                />
              </RadioGroup>
              {errors.sex && (
                <Typography color="error">{errors.sex}</Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth error={Boolean(errors.size)}>
              <FormLabel>Tamaño</FormLabel>
              <Select
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                id="size-select"
              >
                <MenuItem value="">
                  <em>Selecciona un tamaño</em>
                </MenuItem>
                <MenuItem id="smallItem" value="CHICO">
                  CHICO
                </MenuItem>
                <MenuItem id="mediumItem" value="MEDIANO">
                  MEDIANO
                </MenuItem>
                <MenuItem id="largeItem" value="GRANDE">
                  GRANDE
                </MenuItem>
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
                id="colors-auto-complete"
                renderInput={(params) => (
                  <TextField {...params} placeholder="Selecciona colores" />
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
              id="description"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Tratamientos médicos"
              name="medicalTreatment"
              value={formData.medicalTreatment}
              onChange={handleInputChange}
              fullWidth
              id="medical-treatment"
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
            <Button
              id="registerPetButtom"
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
            >
              Registrar Mascota
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RegisterPetForm;
