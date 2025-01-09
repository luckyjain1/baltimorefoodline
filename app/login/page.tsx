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
    <div className="container">
      {/* Login Form */}
        <h1 className="page-title">Login</h1>
        <form onSubmit={handleSubmit} className="form">
          {/* Email Input */}
          <label className="form-label">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </label>

          {/* Password Input */}
          <label className="form-label">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </label>

          <a href="/password_reset" className="link">
            Forgot password?
          </a>

          {/* Submit Button */}
          <button type="submit" className="btn">
            Login
          </button>
        </form>

        <p className="body">
          Interested in partnering with us? We would love to hear from you!
        </p>
        <a href="/contact" className="btn btn-green">
          Partner With Us
        </a>
      </div>
  );
}