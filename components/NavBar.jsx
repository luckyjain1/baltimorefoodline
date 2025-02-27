"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the user if logged in, or null if logged out
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/login");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: "none", color: "white" }}>
            Baltimore Foodline
          </Link>
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/database">
            Food Pantries
          </Button>
          <Button color="inherit" component={Link} href="/contact">
            Contact
          </Button>
          {user && (
            <Button color="inherit" component={Link} href="/dashboard">
              Dashboard
            </Button>
          )}
          {user ? (
            <Button color="inherit" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <Button color="inherit" component={Link} href="/login">
              Log In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
