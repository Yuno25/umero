import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = cookies();

    // 🔐 Support both old & new cookie names (safe)
    const token =
      cookieStore.get("umero_token")?.value || cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    // 🔍 Fetch fresh user data
    const user = await User.findById(decoded.userId).select(
      "email lastAuthAction",
    );

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        lastAuthAction: user.lastAuthAction,
      },
    });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
