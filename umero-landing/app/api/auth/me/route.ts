// app/api/auth/me/route.ts
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const token = cookies().get("umero_token")?.value;
    if (!token) return NextResponse.json({ user: null }, { status: 200 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        emailVerified: true,
        phone: true,
        city: true,
        state: true,
        address: true,
        gender: true,
        age: true,
      },
    });

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
