import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Lister from "@/models/Lister";
import Renter from "@/models/Renter";
import { generateOTP, getOTPExpiry } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/sendEmail";
export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password, username, contact, mode } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    //  Check if user already exists
    const existingUser = await User.findOne({ email });

    // ===============================
    //  MODE 1: SEND OTP (NO USER YET)
    // ===============================
    if (mode === "send-otp") {
      if (existingUser) {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 409 },
        );
      }

      const otp = generateOTP();

      // store OTP temporarily on user doc placeholder
      await User.updateOne(
        { email },
        {
          email,
          otp,
          otpExpiry: getOTPExpiry(),
          lastAuthAction: "signup",
        },
        { upsert: true },
      );

      await sendOTPEmail({ email, otp });

      return NextResponse.json({
        success: true,
        otpRequired: true,
        message: "OTP sent to email",
      });
    }

    // =================================
    //  MODE 2: COMPLETE SIGNUP (AFTER OTP)
    // =================================
    if (mode === "complete-signup") {
      if (!username || !contact) {
        return NextResponse.json(
          { error: "Missing signup details" },
          { status: 400 },
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.findOneAndUpdate(
        { email },
        {
          username,
          contact,
          password: hashedPassword,
          emailVerified: true,
          otp: null,
          otpExpiry: null,
        },
        { new: true },
      );

      // 🔗 LINK PREVIOUS SUBMISSIONS
      await Lister.updateMany({ email }, { userId: user._id });
      await Renter.updateMany({ email }, { userId: user._id });

      return NextResponse.json(
        { success: true, userId: user._id },
        { status: 201 },
      );
    }

    return NextResponse.json({ error: "Invalid signup mode" }, { status: 400 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
