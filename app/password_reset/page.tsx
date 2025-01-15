"use client"; // For client-side interactivity

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/utils/firebase"

export default function PasswordResetPage() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        sendPasswordResetEmail(auth, email)
        .then(() => {
          // Pop up: Password reset email sent!
          alert("A password reset email has been sent.");
        })
        .catch((error) => {
          //const errorCode = error.code;
          //const errorMessage = error.message;
          alert("An unknown error has occured: " + error.message);
        });
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