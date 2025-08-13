import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID!;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
  try {
    const { subscribers, pantryName, message, scheduledTime, uid } = await req.json();

    if (!subscribers || !Array.isArray(subscribers)) {
      return NextResponse.json({ error: "No subscribers provided" }, { status: 400 });
    }

    if (!uid) {
      return NextResponse.json({ error: "No subscription ID provided" }, { status: 400 });
    }

    console.log("Sending messages with parameters:", {
      from: process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER!,
      flow: process.env.NEXT_PUBLIC_TWILIO_SUBSCRIBER_FLOW!,
      subscription_id: uid,
    });    
    

    const body = `${pantryName} has sent a message: \n\n${message}\n\nReply "U" if you would like to stop receiving messages from ${pantryName}.`;

    // TODO: Change this to schedule message
    const sendMessages = subscribers.map((number) =>
      client.studio.v2
        .flows(process.env.NEXT_PUBLIC_TWILIO_SUBSCRIBER_FLOW!)
        .executions.create({
          from: process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER!,
          parameters: {
            "message": body,
            "subscription_id": uid,
            "scheduled": true,
            "scheduleTime": scheduledTime
          },
          to: number,
        })
        .then((execution) => console.log(`Flow started for ${number}:`, execution.sid))
        .catch((error) => console.error(`Error sending to ${number}:`, error))
    );
    await Promise.all(sendMessages);
    

    return NextResponse.json({ success: true, message: "Messages sent successfully!" }, { status: 200 });
  } catch (error: any) {
    console.error("Twilio Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
