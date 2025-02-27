"use client";

import { Box, Container, Typography, Button, Grid, List, ListItem, ListItemIcon } from "@mui/material";
import Image from "next/image";

export default function HomePage() {

  const foodPantries = [
    "Helping Hands Pantry",
    "Baltimore Community Pantry",
    "Hunger Relief Center",
    "St. Vincent’s Food Bank",
    "Hope & Nourish Initiative",
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Container sx={{ mt: 12 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
              Find a Food Pantry Near You
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Text your zipcode to XXX-XXX-XXXX to see food pantries near you, or HELP for instructions 
              on subscribing to real-time updates about food resources in your area!
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              href="/about" 
              sx={{ mt: 2, borderRadius: "2rem", px: 4, py: 1.5 }}>
              Learn More →
            </Button>
          </Grid>

          {/* Right Image */}
          <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
            <Image 
              src="/cover_image.jpg" 
              alt="Cover Image" 
              width={500} 
              height={300} 
              style={{ borderRadius: "8px" }} 
            />
          </Grid>
        </Grid>
      </Container>

      {/* Mission Section */}
      <Box sx={{ bgcolor: "primary.main", color: "white", py: 6, mt: 8 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Mission
              </Typography>
              <Typography variant="body1">
                Baltimore Foodline is dedicated to bridging the gap between Baltimore residents 
                and essential food resources. By providing updates directly to your phone, we aim 
                to make food access simpler and more reliable.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Partners Section */}
      <Box sx={{ py: 6, mt: 4 }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Our Partners
          </Typography>
          <List sx={{ textAlign: "center" }}>
            {foodPantries.map((pantry, index) => (
              <ListItem key={index} sx={{ justifyContent: "center" }}>
                <Typography variant="body1">{pantry}</Typography>
              </ListItem>
            ))}
          </List>

          {/* Partner With Us Button - Now Below the List */}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button 
              variant="contained" 
              href="/contact" 
              sx={{ bgcolor: "primary.main", color: "white", borderRadius: "2rem", px: 4, py: 1.5, '&:hover': { bgcolor: "#1565c0" } }}>
              Partner With Us →
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footnote Section */}
      <Box sx={{ mt: 12, py: 4, bgcolor: "#f4f4f4", textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Created by Shreya, Megan, and Lucky in collaboration with 
           Volunteers for Medical Engineering and Doctors Without Borders at 
          Johns Hopkins University.
        </Typography>
      </Box>
    </Box>
  );
}
