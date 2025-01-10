"use client"; // For client-side interactivity

import { useState } from "react";

export default function PasswordResetPage() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Email: ${email}`);
        // Replace the alert with an API call for authentication
    };

    return (
        <div className="container">
          <h1 className="section-title">Reset Password</h1>
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
  
            {/* Submit Button */}
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
    );
}