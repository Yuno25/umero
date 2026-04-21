import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const booking = await prisma.booking.create({
      data: {
        spaceId: body.spaceId,
        spaceName: body.spaceName,
        hostEmail: body.hostEmail,
        renterId: body.renterId,
        renterEmail: body.renterEmail,
        bookingDate: body.bookingDate,
        startTime: body.startTime,
        endTime: body.endTime,
        totalHours: body.totalHours,
        totalPrice: body.totalPrice,
      },
    });

    return NextResponse.json(booking);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}
