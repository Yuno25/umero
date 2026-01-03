import { connectDB } from "../../../../lib/db";
import Lister from "../../../../models/Lister";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const uploadDir = path.join(process.cwd(), "public/uploads/listers");

    const photos = formData.getAll("photos") as File[];
    const savedPhotos: string[] = [];

    for (const photo of photos) {
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = photo.name.split(".").pop();
      const fileName = `${randomUUID()}.${ext}`;

      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);

      savedPhotos.push(`/uploads/listers/${fileName}`);
    }

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      city: formData.get("city"),
      propertyType: formData.get("propertyType"),
      contact: formData.get("contact"),
      photos: savedPhotos,
    };

    await Lister.create(data);

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (err) {
    console.error("LISTER UPLOAD ERROR:", err);
    return new Response("error", { status: 500 });
  }
}
