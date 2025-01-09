import Link from "next/link";
import styles from "./NavBar.module.css"

export default function Navbar() {
  return (
    
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/">Baltimore Foodline</Link>
        </div>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navItem}>Home</Link>
          <Link href="/about" className={styles.navItem}>About</Link>
          <Link href="/database" className={styles.navItem}>Database</Link>
          <Link href="/contact" className={styles.navItem}>Contact</Link>
          <Link href="/dashboard" className={styles.navItem}>Dashboard</Link>
          <Link href="/login" className={styles.navItem}>Log In</Link>
        </div>
      </div>
    </nav>
  );
}
