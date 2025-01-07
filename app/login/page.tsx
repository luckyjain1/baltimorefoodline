"use client"; // For client-side interactivity

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}`);
    // Replace the alert with an API call for authentication
  };

  return (
    <div className="bg-indigo-50 min-h-screen flex flex-col items-center justify-center text-gray-700">
      {/* Login Form */}
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Input */}
          <label className="flex flex-col">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter your email"
              required
            />
          </label>

          {/* Password Input */}
          <label className="flex flex-col">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter your password"
              required
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>

      {/* Partner With Us Section */}
      <div className="text-center">
        <p className="text-gray-700 mb-4">
          Interested in partnering with us? We would love to hear from you!
        </p>
        <a
          href="/contact"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Partner With Us
        </a>
      </div>
    </div>
  );
}