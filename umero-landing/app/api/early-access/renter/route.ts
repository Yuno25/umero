import { dbConnect } from "@/lib/db";
import Renter from "@/models/Renter";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const formData = await req.formData();

    const renterData = {
      name: formData.get("name"),
      email: formData.get("email"),
      city: formData.get("city"),
      rentalDuration: formData.get("rentalDuration"),
      peopleCount: Number(formData.get("peopleCount")),
    };

    console.log("RENTER DATA:", renterData);

    await Renter.create(renterData);

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (err) {
    console.error("RENTER API ERROR:", err);
    return new Response("Renter submission failed", { status: 500 });
  }
}
