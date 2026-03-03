import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Renter from "@/models/Renter";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    await Renter.create({
      name: formData.get("name"),
      email: formData.get("email"),
      city: formData.get("city"),
      rentalDuration: formData.get("rentalDuration"),
      peopleCount: Number(formData.get("peopleCount")),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RENTER ERROR:", error);
    return NextResponse.json(
      { error: "Renter submission failed" },
      { status: 500 }
    );
  }
}
