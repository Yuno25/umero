import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { email: string } },
) {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        renterEmail: params.email,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json([]);
  }
}
