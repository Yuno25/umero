import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export const runtime = "nodejs";

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

    // Validate OTP (safe string comparison)
    if (!user.otp || String(user.otp) !== String(otp)) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }

    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      return NextResponse.json({ error: "OTP expired" }, { status: 401 });
    }

    // Clear OTP
    user.otp = null;
    user.otpExpiry = null;

    await user.save({ validateBeforeSave: false });

    // CREATE JWT (THIS WAS MISSING)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    // CREATE RESPONSE
    const response = NextResponse.json(
      {
        success: true,
        message: "OTP verified successfully",
      },
      { status: 200 },
    );

    //  SET COOKIE
    response.cookies.set("umero_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
