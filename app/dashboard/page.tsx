"use client"; // Required for client-side interactivity in Next.js

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
    <div className="bg-indigo-50 min-h-screen p-8 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>

      {/* Section for Updating Basic Info */}
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Update Basic Info</h2>
        <form onSubmit={handleBasicInfoSubmit} className="flex flex-col gap-4">
          <textarea
            className="border p-2 rounded w-full text-gray-900 h-24"
            placeholder="Enter basic information here..."
            value={basicInfo}
            onChange={(e) => setBasicInfo(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Info
          </button>
        </form>
      </div>

      {/* Section for Sending a Message */}
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Send Message</h2>
        <form onSubmit={handleMessageSubmit} className="flex flex-col gap-4">
          <textarea
            className="border p-2 rounded w-full text-gray-900 h-24"
            placeholder="Enter your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
