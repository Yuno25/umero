import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: { status: "CONFIRMED" },
    });

    return NextResponse.json(booking);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
