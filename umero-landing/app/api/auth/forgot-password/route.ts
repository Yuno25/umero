import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendOTPEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // don't reveal if user exists
    if (!user) {
      return NextResponse.json({ success: true });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        otp,
        otpExpiry: new Date(Date.now() + 1000 * 60 * 5),
        lastAuthAction: "reset",
      },
    });

    await sendOTPEmail({ email, otp });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
