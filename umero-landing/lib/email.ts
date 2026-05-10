import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendOTPEmail = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your OTP Code",
    html: `<p>Your OTP is:</p>
           <h2>${otp}</h2>
           <p>This expires in 5 minutes.</p>`,
  });
};