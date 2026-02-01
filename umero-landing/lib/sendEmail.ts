import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendOTPParams {
  email: string;
  otp: string;
}

export const sendOTPEmail = async ({ email, otp }: SendOTPParams) => {
  await resend.emails.send({
    from: "Umero <onboarding@resend.dev>",
    to: email,
    subject: "Your Umero verification code",
    html: `
      <p>Your verification code is:</p>
      <h2>${otp}</h2>
      <p>This code expires in 10 minutes.</p>
    `,
  });
};
