"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./NavBar.module.css"

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
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/">Baltimore Foodline</Link>
        </div>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navItem}>
            Home
          </Link>
          <Link href="/about" className={styles.navItem}>
            About
          </Link>
          <Link href="/database" className={styles.navItem}>
            Food Pantries
          </Link>
          <Link href="/contact" className={styles.navItem}>
            Contact
          </Link>
          { user && (
            <Link href="/dashboard" className={styles.navItem}>
              Dashboard
            </Link>
          )}
          { user && (
            <button
              onClick={handleSignOut}
              className="hover:text-gray-400 border border-white px-2 rounded" // replace with whatever format for button
            >
              Sign Out
            </button>
          )}
          { !user && (
            <Link href="/login" className={styles.navItem}>
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
