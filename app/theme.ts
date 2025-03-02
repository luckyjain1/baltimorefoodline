"use client"; // Ensure it's a Client Component

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1.2rem", // Adjust font size globally
          fontWeight: "bold",
          textTransform: "none",
        },
      },
    },
  },
  
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
