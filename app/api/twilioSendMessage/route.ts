import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID!;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
  try {
    const { subscribers, pantryName, message } = await req.json();

    if (!subscribers || !Array.isArray(subscribers) || subscribers.length === 0) {
      return NextResponse.json({ error: "No subscribers provided" }, { status: 400 });
    }

    const sendMessages = subscribers.map((number) =>
      client.messages.create({
        body: `${pantryName} has sent a message: \n\n${message}\n\nIf you would like to unsubscribe from messages from ${pantryName}, text "1".`,
        from: process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER,
        to: number,
      })
    );

    await Promise.all(sendMessages);

    return NextResponse.json({ success: true, message: "Messages sent successfully!" }, { status: 200 });
  } catch (error: any) {
    console.error("Twilio Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
