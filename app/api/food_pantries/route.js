// import { getFoodPantries } from "@/utils/firestore";

// export async function GET() {
//   try {
//     const foodPantries = await getFoodPantries();
   
//     return new Response(JSON.stringify(foodPantries), { 
//       status: 200, 
//       headers: { "Content-Type": "application/json" } 
//     });
//   } catch (error) {
//     console.error("Error fetching food pantries:", error);
//     return new Response("Failed to fetch food pantries", { status: 500 });
//   }
// }

import { getFoodPantries } from "@/utils/firestore";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const zipcode = searchParams.get("zipcode");

    const foodPantries = await getFoodPantries(zipcode);

    return new Response(JSON.stringify(foodPantries), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    });
  } catch (error) {
    console.error("Error fetching food pantries:", error);
    return new Response("Failed to fetch food pantries", { status: 500 });
  }
}
