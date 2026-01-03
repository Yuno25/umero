import { dbConnect } from "@/lib/db";
import Lister from "@/models/Lister";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const photos = formData.getAll("photos") as File[];

    const uploadedPhotos: string[] = [];

    for (const photo of photos) {
      if (!photo || typeof photo === "string") continue;

      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const base64 = buffer.toString("base64");
      const dataURI = `data:${photo.type};base64,${base64}`;

      const uploadRes = await cloudinary.uploader.upload(dataURI, {
        folder: "umero/listers",
      });

      console.log("CLOUDINARY URL:", uploadRes.secure_url);

      uploadedPhotos.push(uploadRes.secure_url);
    }

    await Lister.create({
      name: formData.get("name"),
      email: formData.get("email"),
      city: formData.get("city"),
      propertyType: formData.get("propertyType"),
      contact: formData.get("contact"),
      photos: uploadedPhotos,
    });

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (err) {
    console.error("LISTER SUBMIT ERROR:", err);
    return new Response("Upload failed", { status: 500 });
  }
}
