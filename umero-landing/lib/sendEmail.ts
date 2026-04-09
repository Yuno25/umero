import { Resend } from "resend";

interface SendOTPParams {
  email: string;
  otp: string;
}

export const sendOTPEmail = async ({ email, otp }: SendOTPParams) => {
  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    // Move check INSIDE function
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not defined");
    }

    //Initialize inside function
    const resend = new Resend(RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Umero <noreply@umero.in>",
      to: email,
      subject: "Your Umero verification code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px;">
          <h2 style="margin-bottom:10px;">Umero Verification Code</h2>
          <p>Your one-time login code is:</p>

          <div style="
            font-size:28px;
            font-weight:bold;
            letter-spacing:6px;
            background:#f4f4f4;
            padding:12px 20px;
            display:inline-block;
            margin:12px 0;
            border-radius:6px;
          ">
            ${otp}
          </div>

          <p>This code will expire in <strong>10 minutes</strong>.</p>

          <hr style="margin:20px 0;" />

          <p style="font-size:12px;color:#777;">
            If you did not request this login, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      throw new Error("Failed to send OTP email");
    }

    console.log("OTP email sent successfully:", data?.id);

    return true;
  } catch (error) {
    console.error("sendOTPEmail failed:", error);
    throw error;
  }
};
