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
    <div className="bg-indigo-50 p-8 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="mb-8">
      <label className="block text-gray-900 mb-2">
             Name:
             <input
               type="text"
               name="name"
               value={formData.name}
               onChange={handleChange}
               className="border border-gray-300 p-2 w-full"
               placeholder="Enter your name"
               required
             />
           </label>
           <label className="block text-gray-900 mb-2">
             Email:
             <input
               type="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               className="border border-gray-300 p-2 w-full"
               placeholder="Enter your email"
               required
             />
           </label>
           <label className="block text-gray-900 mb-2">
             Message:
             <textarea
               name="message"
               value={formData.message}
               onChange={handleChange}
               className="border border-gray-300 p-2 w-full"
               placeholder="Enter your message"
               rows={5}
               required
             ></textarea>
           </label>
           <button
             type="submit"
             className="bg-blue-500 text-white p-2 rounded mt-2"
           >
             Submit
           </button>
         </form>

         {/* Display form submission status */}
         {status && (
           <div
             className={`p-2 rounded ${
               status.startsWith("Error") ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"
             }`}
           >
             {status}
           </div>
         )}

         <footer className="text-center text-gray-600 text-sm mt-8">
           For more information, please email us at{" "}
           <a
             href="mailto:baltimorefoodline@gmail.com"
             className="text-blue-500"
           >
             baltimorefoodline@gmail.com
           </a>
           .
           <br />
           Baltimore Foodline - Helping the community one meal at a time.
         </footer>
       </div>
     );
   }

