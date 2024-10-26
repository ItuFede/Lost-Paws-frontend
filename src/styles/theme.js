import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6dd149",
    },
    secondary: {
      main: "#98c282",
    },
  },
  typography: {
    fontFamily:
      'Rubik, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
});

export default theme;
