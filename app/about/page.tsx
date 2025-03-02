"use client";

import { Container, Typography, List, ListItem, Card, CardContent, Button, Grid, Avatar, Box } from "@mui/material";
/* import Image from "next/image"; */

const teamMembers = [
  { name: "Shreya", role: "Co-Founder", image: "/shreya.jpg" },
  { name: "Megan", role: "Co-Founder", image: "/megan.jpg" },
  { name: "Lucky", role: "Co-Founder", image: "/lucky.jpg" },
];

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      {/* About Section */}
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        About Baltimore Foodline
      </Typography>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Mission
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Baltimore Foodline is dedicated to bridging the gap between Baltimore residents 
        and essential food resources. By providing updates directly to your phone, we aim 
        to make food access simpler and more reliable.
      </Typography>

      {/* Partners Section */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Our Partners
      </Typography>
      <List sx={{ mb: 4 }}>
        <ListItem>TBD</ListItem>
      </List>

      {/* Team Section */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Our Team
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        This project was built in collaboration with 
        Volunteers for Medical Engineering and Doctors
        Without Borders at Johns Hopkins University.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={4} key={member.name}>
            <Card sx={{ textAlign: "center", p: 3, borderRadius: "12px", boxShadow: 3 }}>
              <Avatar
                src={member.image}
                alt={member.name}
                sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{member.name}</Typography>
                <Typography variant="body2" color="text.secondary">{member.role}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Partner With Us */}
      <Box sx={{ textAlign: "center", mt: 6, mb: 10 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Interested in partnering with us? We would love to hear from you!
        </Typography>
        <Button 
          variant="contained" 
          href="/contact" 
          sx={{ bgcolor: "primary.main", color: "white", borderRadius: "2rem", px: 4, py: 1.5, '&:hover': { bgcolor: "#1565c0" } }}>
          Partner With Us →
        </Button>
      </Box>
    </Container>
  );
}
