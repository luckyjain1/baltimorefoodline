import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-indigo-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-indigo-600 self-center text-xl font-semibold whitespace-nowrap">
          <Link href="/">Baltimore Foodline</Link>
        </div>

        {/* Navigation Links */}
        <div className="text-gray-800 focus:ring-4 focus:ring-gray-300 font-medium text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 flex gap-10">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/database" className="hover:underline">
            Database
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
