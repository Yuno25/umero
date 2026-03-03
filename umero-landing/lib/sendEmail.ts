import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendOTPParams {
  email: string;
  otp: string;
}

export const sendOTPEmail = async ({ email, otp }: SendOTPParams) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Umero <noreply@umero.in>", // ✅ use your verified domain
      to: [email],
      subject: "Your Umero verification code",
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px">
          <p>Your verification code is:</p>
          <h2 style="letter-spacing:5px">${otp}</h2>
          <p>This code expires in 10 minutes.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return false;
    }

    console.log("Email sent:", data?.id);
    return true;
  } catch (err) {
    console.error("Email sending failed:", err);
    return false;
  }
};
