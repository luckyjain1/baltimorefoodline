import db from '../../../utils/db';

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM food_pantries');
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
