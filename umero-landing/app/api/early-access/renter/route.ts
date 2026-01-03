import { connectDB } from "../../../../lib/db";
import Renter from "../../../../models/Renter";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      city: formData.get("city"),
      rentalDuration: formData.get("rentalDuration"),
      peopleCount: Number(formData.get("peopleCount")),
    };

    await Renter.create(data);

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (err) {
    console.error("RENTER SUBMIT ERROR:", err);
    return new Response("error", { status: 500 });
  }
}
