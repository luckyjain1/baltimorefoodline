import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'baltimorefoodline@gmail.com', // Your Gmail address
        pass: 'your-app-password',   // Your app-specific password
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: 'baltimorefoodline@gmail.com', // Where you want to receive the contact form submissions
      subject: `Contact Form Submission from ${name}`,
      text: `Message: ${message}\n\nFrom: ${name} (${email})`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: 'Message sent successfully!' }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      { status: 500 }
    );
  }
}
