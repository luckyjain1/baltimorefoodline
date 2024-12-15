import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-500 text-white shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/">Baltimore Food Line</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/login" className="hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
}
