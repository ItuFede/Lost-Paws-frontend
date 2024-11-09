import { Builder, By, until } from "selenium-webdriver";
import assert from "assert";

describe("Test E2E", () => {
  it("Registrar una nueva mascota y verificarla", async function () {
    this.timeout(60000);
    let driver;

    try {
      driver = await new Builder().forBrowser("chrome").build();
      await driver.get("http://localhost:5173");

      const findById = async (id, time = 3000) => {
        return await driver.wait(until.elementLocated(By.id(id)), time);
      };

      const findByName = async (name, time = 3000) => {
        return await driver.wait(until.elementLocated(By.name(name)), time);
      };

      const findByXpath = async (xpath, time = 3000) => {
        return await driver.wait(until.elementLocated(By.xpath(xpath)), time);
      };

      const iniciarSesion = await findById("iniciarSesion");
      iniciarSesion.click();

      const emailTextBox = await findById("signInFormUsername");
      await emailTextBox.sendKeys("federico_ituarte1@hotmail.com");

      const passwordTextBox = await findById("signInFormPassword");
      await passwordTextBox.sendKeys("TestUser123");

      const submitButtonBox = await findByName("signInSubmitButton");
      await submitButtonBox.click();

      // WAIT FOR USER LOGIN
      await driver.sleep(3000);

      const userConfigButton = await findById("userConfig");
      await userConfigButton.click();

      const userPetButton = await findById("userPetsButton");
      await userPetButton.click();

      // Carga de mascotas
      await driver.sleep(8000);

      // Registrar mascota
      const newPet = {
        name: "PetMock",
        animal: "Perro",
        breed: "Callejero",
        age: "14",
        sex: "Macho",
        size: "MEDIANO",
        characteristics: "Asustadizo",
        generalColor: "Blanco",
      };

      const addPetButton = await findById("addPetButton");
      await addPetButton.click();

      // Nombre
      const nameTextBox = await findByName("name");
      await nameTextBox.sendKeys(newPet.name);

      // Animal
      const animalSelect = await findById("animal-select");
      await animalSelect.click();
      const dogItem = await findById("dogItem");
      await dogItem.click();

      // Caracteristicas
      const characteristicsSelect = await findById("characteristics");
      await characteristicsSelect.click();
      await characteristicsSelect.sendKeys("Asustadizo");
      const optionCharacteristicsSelect = await findByXpath(
        '//li[contains(text(), "Asustadizo")]'
      );
      await optionCharacteristicsSelect.click();

      // Sexo
      const maleRadio = await findById("maleRadio");
      await maleRadio.click();

      // Raza
      const breedTextBox = await findByName("breed");
      await breedTextBox.sendKeys(newPet.breed);

      // Tamaño
      const sizeSelect = await findById("size-select");
      await sizeSelect.click();
      const mediumItem = await findById("mediumItem");
      await mediumItem.click();

      //Fecha de nacimiento
      const birthDate = await findByXpath('//input[@placeholder="MM/DD/YYYY"]');
      await birthDate.click();
      await birthDate.sendKeys("07/04/2010");

      // Colores generales
      const colorsAutoComplete = await findById("colors-auto-complete");
      await colorsAutoComplete.click();
      await colorsAutoComplete.sendKeys("Blanco");
      const optionColorsAutoComplete = await findByXpath(
        '//li[contains(text(), "Blanco")]'
      );
      await optionColorsAutoComplete.click();

      // Registrar mascota
      const registerPetButtom = await findById("registerPetButtom");
      await registerPetButtom.click();

      // Carga de mascotas
      await driver.sleep(8000);

      const index = 0;

      //Validacion de mascota nueva
      let petCardName = await findById("petCard_name_" + index);
      petCardName = await petCardName.getText();
      console.log("petCardName:::", petCardName);

      let petCardAnimal = await findById("petCard_animal_" + index);
      petCardAnimal = await petCardAnimal.getText();
      console.log("petCardAnimal:::", petCardAnimal);

      let petCardBreed = await findById("petCard_breed_" + index);
      petCardBreed = await petCardBreed.getText();
      console.log("petCardBreed:::", petCardBreed);

      let petCardAge = await findById("petCard_age_" + index);
      petCardAge = await petCardAge.getText();
      console.log("petCardAge:::", petCardAge);

      let petCardSex = await findById("petCard_sex_" + index);
      petCardSex = await petCardSex.getText();
      console.log("petCardSex:::", petCardSex);

      let petCardsize = await findById("petCard_size_" + index);
      petCardsize = await petCardsize.getText();
      console.log("petCardsize:::", petCardsize);

      let petCardCharacteristic = await findById(
        "petCard_characteristic_" + index
      );
      petCardCharacteristic = await petCardCharacteristic.getText();
      console.log("petCardCharacteristic:::", petCardCharacteristic);

      let petCardColors = await findById("petCard_colors_" + index);
      petCardColors = await petCardColors.getText();
      console.log("petCardColors:::", petCardColors);

      // Verificar cada propiedad de la mascota
      const cardProperties = {
        animal: `Animal: ${newPet.animal}`,
        breed: `Raza: ${newPet.breed}`,
        age: `Edad: ${newPet.age} años`,
        sex: `Sexo: ${newPet.sex}`,
        size: `Tamaño: ${newPet.size}`,
        characteristics: `Características: ${newPet.characteristics}`,
        generalColor: `Colores Generales: ${newPet.generalColor}`,
      };

      const assertAndLog = (actual, expected, label) => {
        try {
          assert.equal(actual, expected);
          console.log(
            `✅ Test passed: ${label} (${actual}) matches expected value (${expected})`
          );
        } catch (error) {
          console.error(
            `❌ Test failed: ${label} - Expected (${expected}) but got (${actual})`
          );
          throw error;
        }
      };

      assertAndLog(petCardName, newPet.name, "petCardName");
      assertAndLog(petCardAnimal, cardProperties.animal, "petCardAnimal");
      assertAndLog(petCardBreed, cardProperties.breed, "petCardBreed");
      assertAndLog(petCardAge, cardProperties.age, "petCardAge");
      assertAndLog(petCardSex, cardProperties.sex, "petCardSex");
      assertAndLog(petCardsize, cardProperties.size, "petCardsize");
      assertAndLog(
        petCardCharacteristic,
        cardProperties.characteristics,
        "petCardCharacteristic"
      );
      assertAndLog(petCardColors, cardProperties.generalColor, "petCardColors");
    } catch (error) {
      throw error;
    } finally {
      // TODO: Delete PET
      await driver.quit();
    }
  });
}, 10000);
