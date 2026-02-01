import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    //  Validate OTP
    if (!user.otp || user.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }

    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      return NextResponse.json({ error: "OTP expired" }, { status: 401 });
    }

    //  OTP IS VALID — CLEAR IT ONLY
    user.otp = null;
    user.otpExpiry = null;

    // DO NOT set emailVerified here
    //  DO NOT touch password here

    //  Skip password validation explicitly
    await user.save({ validateBeforeSave: false });

    return NextResponse.json(
      {
        success: true,
        message: "OTP verified successfully",
        next: "complete-signup",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
