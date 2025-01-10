"use client"; // Required for client-side interactivity in Next.js

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function DashboardPage() {
  const [basicInfo, setBasicInfo] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null); // Store user ID for testing

  const router = useRouter();

  useEffect(() => {
    // Redirect to login if user is not authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Save the user ID
      } else {
        router.push("/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

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
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard- {userId}</h1>

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
