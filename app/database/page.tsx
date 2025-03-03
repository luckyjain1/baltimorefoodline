"use client";

import { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from "@mui/material";

export default function DatabasePage() {
  
  type Pantry = {
    id: string;
    name: string;
    address: string;
    hours: string;
    other: string;
  };

  const [foodPantries, setFoodPantries] = useState<Pantry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/food_pantries")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setFoodPantries(data);
      }) 
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Food Pantries in Baltimore
      </Typography>

      {/* Show Loading Spinner */}
      {loading && <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />}

      {/* Show Error Message */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Show Data Table */}
      {!loading && !error && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Location</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Hours</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Other</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foodPantries.map((pantry) => (
                <TableRow key={pantry.id}>
                  <TableCell>{pantry.name || "N/A"}</TableCell>
                  <TableCell>{pantry.address || "N/A"}</TableCell>
                  <TableCell>{pantry.hours || "N/A"}</TableCell>
                  <TableCell>{pantry.other || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
