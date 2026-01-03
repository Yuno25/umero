import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import Lister from "@/models/Lister";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const formData = await req.formData();

    // 🔹 TEXT FIELDS (SAFE)
    const payload = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      city: formData.get("city")?.toString() || "",
      propertyType: formData.get("propertyType")?.toString() || "",
      contact: formData.get("contact")?.toString() || "",
      address: formData.get("address")?.toString() || "",
    };

    // 🔹 MULTI PHOTO SAFE HANDLING
    const files = formData.getAll("photos");
    const uploadedPhotos: string[] = [];

    for (const file of files) {
      if (!(file instanceof File)) continue;
      if (file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());

      const upload = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "umero/listers" }, (err, result) => {
            if (err) reject(err);
            resolve(result);
          })
          .end(buffer);
      });

      uploadedPhotos.push(upload.secure_url);
    }

    await Lister.create({
      ...payload,
      photos: uploadedPhotos,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("LISTER API ERROR →", error);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
