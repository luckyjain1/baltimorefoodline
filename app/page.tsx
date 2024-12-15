import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Website</h1>
      <p className="text-lg text-gray-600 text-center max-w-md mb-6">
        Our website allows businesses to send SMS messages to their clients quickly and efficiently.
      </p>
      <Link href="/login">
        <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Log In
        </button>
      </Link>
    </div>
  );
}
