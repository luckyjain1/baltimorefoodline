"use client"; // Important for MUI in Next.js App Router

import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../app/theme"; 
import { ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures proper global styles */}
      {children}
    </MUIThemeProvider>
  );
}
