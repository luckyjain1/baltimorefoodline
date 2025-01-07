"use client";

import { useEffect, useState } from "react";

interface Pantry {
  name: string;
  location: string;
  hours: string;
  contact_number: string;
}

export default function DatabasePage() {
  const [foodPantries, setFoodPantries] = useState<Pantry[]>([]);

  useEffect(() => {
    fetch('/api/food_pantries')
      .then((res) => res.json())
      .then((data) => setFoodPantries(data))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  return (
    <div className="bg-indigo-50 p-8 min-h-screen">
      <h1 className="text-3xl text-gray-900 font-bold mb-4 flex flex-col items-center">Food Pantry Database</h1>
      <table className="border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 text-gray-900 p-2">Name</th>
            <th className="border border-gray-400 text-gray-900 p-2">Location</th>
            <th className="border border-gray-400 text-gray-900 p-2">Hours</th>
            <th className="border border-gray-400 text-gray-900 p-2">Contact</th>
          </tr>
        </thead>
        <tbody>
          {foodPantries.map((pantry, index) => (
            <tr key={index}>
              <td className="border border-gray-400 bg-white text-gray-900 p-2">{pantry.name}</td>
              <td className="border border-gray-400 bg-white text-gray-900 p-2">{pantry.location}</td>
              <td className="border border-gray-400 bg-white text-gray-900 p-2">{pantry.hours}</td>
              <td className="border border-gray-400 bg-white text-gray-900 p-2">{pantry.contact_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
