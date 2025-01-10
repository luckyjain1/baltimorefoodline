"use client"; // For client-side interactivity

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    // Make the loading spinner appear in case this takes a while
    setLoading(true);
    setError("");
    
    // Try to sign in with email and password
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // If succesful, redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            setError("The username or password you entered is incorrect.");
            break;
          default:
            setError("An unknown error occurred:" + error.message); // Replace in final with something else?
        }
      }
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="bg-indigo-50 min-h-screen flex flex-col items-center justify-center text-gray-700">
      {/* Login Form */}
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
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

          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={loading ? "bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed": "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "}
            disabled={loading}
          >
            {loading ? (
              <span className="inline-flex items-center">
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C3.58 0 0 5.58 0 12h4z"
                  ></path>
                </svg>
              </span>
            ) : (
              "Login"
            )}
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