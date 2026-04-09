import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.otp || String(user.otp) !== String(otp)) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }

    if (!user.otpExpiry || new Date(user.otpExpiry) < new Date()) {
      return NextResponse.json({ error: "OTP expired" }, { status: 401 });
    }

    // Clear OTP fields only — don't touch username/contact/password here
    await prisma.user.update({
      where: { email },
      data: {
        otp: null,
        otpExpiry: null,
        // For login flow, mark verified
        emailVerified: true,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "6h",
    });

    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set("umero_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 6,
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
