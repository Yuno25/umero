import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const token = cookies().get("umero_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        username: body.username,
        phone: body.phone,
        city: body.city,
        state: body.state,
        address: body.address,
        gender: body.gender,
        age: body.age ? Number(body.age) : null,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
