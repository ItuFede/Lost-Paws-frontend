# React + Vite

# Proyecto Frontend

Frontend desarrollado con React + Vite para Lost&Paws. Para levantar el frontend en tu entorno local, sigue estos pasos:

## Requisitos

- Node.js
- npm

## Configuración

Una vez clonado el repositorio se debe de crear el archivo **env.local** siguiendo la estructura del .env.

Ejecutar los comandos:

- **`npm install`**: Asegúrate de instalar todas las dependencias antes de levantar el frontend.
- **`npm run dev`**: Este comando iniciará el servidor de desarrollo para que puedas trabajar en la aplicación localmente.

## Ejecución de Tests

Para ejecutar los tests de la aplicación, utiliza el siguiente comando:

- **`npx mocha .\tests\e2e\registerPet.test.js`**: Este comando ejecutará los tests end-to-end (e2e) ubicados en `registerPet.test.js` para validar el flujo de registro de mascotas.
