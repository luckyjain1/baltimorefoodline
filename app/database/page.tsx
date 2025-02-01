"use client";

import { useEffect, useState } from "react";

export default function DatabasePage() {
  
  type Pantry = {
    id: string;
    name: string;
    address: string;
    hours: string;
    other: string;
  };

  const [foodPantries, setFoodPantries] = useState<Pantry[]>([]);

  useEffect(() => {
    fetch("./api/food_pantries")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setFoodPantries(data);
      }) 
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
              <td>{pantry.name || "N/A"}</td>
              <td>{pantry.address || "N/A"}</td>
              <td>{pantry.hours || "N/A"}</td>
              <td>{pantry.other || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
