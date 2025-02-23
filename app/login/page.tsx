"use client"; // Required for client-side interactivity

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { Container, Box, TextField, Button, Typography, Link, CircularProgress, Snackbar, Alert } from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            setError("The username or password you entered is incorrect.");
            break;
          default:
            setError("An unknown error occurred: " + error.message);
        }
      } else {
        setError("An unknown error occurred.");
      }
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSignIn} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Email Input */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Forgot Password */}
          <Link href="/password_reset" underline="hover" sx={{ alignSelf: "flex-end" }}>
            Forgot password?
          </Link>

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
          </Button>
        </Box>

        {/* Error Snackbar */}
        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
          <Alert severity="error" onClose={() => setOpenSnackbar(false)}>
            {error}
          </Alert>
        </Snackbar>

        {/* Partner Section */}
        <Typography variant="body1" sx={{ mt: 4 }}>
          Interested in partnering with us? We would love to hear from you!
        </Typography>
        <Button href="/contact" variant="contained" color="success" sx={{ mt: 2 }}>
          Partner With Us
        </Button>
      </Box>
    </Container>
  );
}
