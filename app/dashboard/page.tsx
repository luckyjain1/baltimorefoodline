"use client"; 
import { useState } from "react";

export default function DashboardPage() {
  const [basicInfo, setBasicInfo] = useState("");
  const [message, setMessage] = useState("");

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Basic Info Updated: ${basicInfo}`);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message Sent: ${message}`);
  };

  return (
    <div className="container">
      <h1 className="page-title">Dashboard</h1>

      {/* Section for Updating Basic Info */}
      <h2 className="section-title">Update Basic Info</h2>
      <form onSubmit={handleBasicInfoSubmit} className="form">
        <textarea
          className="form-textarea"
          placeholder="Enter basic information here..."
          value={basicInfo}
          onChange={(e) => setBasicInfo(e.target.value)}
        />
        <button type="submit" className="btn">
          Update Info
        </button>
      </form>

      {/* Section for Sending a Message */}
      <h2 className="section-title">Send Message</h2>
      <form onSubmit={handleMessageSubmit} className="form">
        <textarea
          className="form-textarea"
          placeholder="Enter your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-green">
          Send Message
        </button>
      </form>
    </div>
  );
}
