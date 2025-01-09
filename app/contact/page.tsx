"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    setStatus("Submitting...");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset the form
      } else {
        setStatus(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("Error: Failed to submit the form");
    }
  };
  return (
    <div className="container">
      <h1 className="page-title">Contact Us</h1>

      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your name"
            required
          />
        </label>
        <label className="form-label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your email"
            required
          />
        </label>
        <label className="form-label">
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Enter your message"
            rows={5}
            required
          ></textarea>
        </label>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>

      {status && (
        <div className={`status ${status.startsWith("Error") ? "status-error" : "status-success"}`}>
          {status}
        </div>
      )}

      <div className="body">
        For more information, please email us at{" "}
        <a href="mailto:baltimorefoodline@gmail.com" className="link">
          baltimorefoodline@gmail.com
        </a>
        .
        <br />
        Baltimore Foodline - Helping the community one meal at a time.
      </div>
    </div>
  );
}
  