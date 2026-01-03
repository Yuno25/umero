import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import Lister from "@/models/Lister";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const formData = await req.formData();

    const photo = formData.getAll("photo") as File;

    let photoUrl = "";

    if (photo && photo.size > 0) {
      const buffer = Buffer.from(await photo.arrayBuffer());

      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "umero/listers" }, (err, result) => {
            if (err) reject(err);
            resolve(result);
          })
          .end(buffer);
      });

      photoUrl = uploadResult.secure_url;
    }

    await Lister.create({
      name: formData.get("name"),
      email: formData.get("email"),
      city: formData.get("city"),
      propertyType: formData.get("propertyType"),
      contact: formData.get("contact"),
      photo: photoUrl,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
