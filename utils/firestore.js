import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function getFoodPantries() {
  try {

    const querySnapshot = await getDocs(collection(db, "food_pantries"));

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching food pantries:", error);
    return [];
  }
}
