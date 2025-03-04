import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID!;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
  try {
    const { subscribers, pantryName, message, pantryID } = await req.json();

    if (!subscribers || !Array.isArray(subscribers)) {
      return NextResponse.json({ error: "No subscribers provided" }, { status: 400 });
    }

    const body = `${pantryName} has sent a message: \n\n${message}\n\nReply with "UNSUBSCRIBE" if you would like to stop receiving messages from ${pantryName}.`;

    // Use Promise.all to ensure all messages are sent
    const sendMessages = subscribers.map(async (number) => {
      try {
        // Send message using Twilio Studio flow
        await client.studio.v2
          .flows(process.env.NEXT_PUBLIC_TWILIO_SUBSCRIBER_FLOW!)
          .executions.create({
            from: process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER!,
            parameters: {
              message: body,
              subscription_id: pantryID
            },
            to: number,
          });
      } catch (error) {
        console.error(`Error sending message to ${number}:`, error);
      }
    });

    // Wait for all message sending to complete
    await Promise.all(sendMessages);

    return NextResponse.json({ success: true, message: "Messages sent successfully!" }, { status: 200 });
  } catch (error: any) {
    console.error("Twilio Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
