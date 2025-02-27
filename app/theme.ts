"use client"; // Ensure it's a Client Component

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Customize this color
    },
    secondary: {
      main: "#ff9800",
    },
  },
});

export default theme;
