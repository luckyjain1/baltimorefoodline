// import { collection, getDocs } from "firebase/firestore";
// import { db } from "./firebase";

// export async function getFoodPantries() {
//   try {

//     const querySnapshot = await getDocs(collection(db, "food_pantries"));

//     return querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//   } catch (error) {
//     console.error("Error fetching food pantries:", error);
//     return [];
//   }
// }

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// Add zipcode as optional parameter
export async function getFoodPantries(zipcode = null) {
  try {
    const querySnapshot = await getDocs(collection(db, "food_pantries"));

    const allPantries = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // If no zipcode provided, return full data
    if (!zipcode) {
      return allPantries;
    }

    // If zipcode provided, filter dynamically using regex on address
    const filteredPantries = allPantries.filter((pantry) => {
      if (!pantry.address) return false;
      const match = pantry.address.match(/\b\d{5}\b/);
      return match && match[0] === zipcode;
    });

    return filteredPantries;
  } catch (error) {
    console.error("Error fetching food pantries:", error);
    return [];
  }
}
