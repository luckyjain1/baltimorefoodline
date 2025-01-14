"use client";

import { useEffect, useState } from "react";

export default function DatabasePage() {
  
  type Pantry = {
    id: string;
    location: string;
    hours: string;
    other: string;
  };

  const [foodPantries, setFoodPantries] = useState<Pantry[]>([]);

  useEffect(() => {
    fetch("/api/food_pantries")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => setFoodPantries(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="container">
      <h1 className="page-title">Food Pantries in Baltimore</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Hours</th>
            <th>Other</th>
          </tr>
        </thead>
        <tbody>
          {foodPantries.map((pantry) => (
            <tr key={pantry.id}>
              <td>{pantry.id || "N/A"}</td>
              <td>{pantry.location || "N/A"}</td>
              <td>{pantry.hours || "N/A"}</td>
              <td>{pantry.other || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
