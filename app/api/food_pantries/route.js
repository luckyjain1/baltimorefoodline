import { getFoodPantries } from "@/utils/firestore";

export async function GET() {
  try {
    const foodPantries = await getFoodPantries();
    return new Response(JSON.stringify(foodPantries), { status: 200 });
  } catch (error) {
    console.error("Error fetching food pantries:", error);
    return new Response("Failed to fetch food pantries", { status: 500 });
  }
}
