"use client";

import { useState } from "react";
import { Box, Container, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{ message: string, type: "success" | "error" | "" }>({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ message: "Message sent successfully!", type: "success" });
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setStatus({ message: `Error: ${result.error}`, type: "error" });
      }
    } catch (err) {
      console.error(err);
      setStatus({ message: "Error: Failed to submit the form", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        Contact Us
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
        Have a question or want to get in touch? Fill out the form below.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          required
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          required
          name="message"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </Box>

      {/* Snackbar for success/error message */}
      <Snackbar open={!!status.message} autoHideDuration={4000} onClose={() => setStatus({ message: "", type: "" })}>
        <Alert onClose={() => setStatus({ message: "", type: "" })}>
          {status.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
