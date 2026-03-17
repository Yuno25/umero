import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { generateOTP, getOTPExpiry } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/sendEmail";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email" },
        { status: 404 },
      );
    }

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiry = getOTPExpiry();
    user.lastAuthAction = "login";

    await user.save({ validateBeforeSave: false });

    await sendOTPEmail({ email, otp });

    return NextResponse.json({
      success: true,
      otpRequired: true,
      message: "OTP sent to your email. Please verify.",
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
