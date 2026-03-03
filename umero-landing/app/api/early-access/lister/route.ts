import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lister from "@/models/Lister";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs"; // Required for Buffer + FormData

/* ================= CLOUDINARY CONFIG ================= */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

/* ================= POST HANDLER ================= */
export async function POST(req: Request) {
  try {
    /* ===== CONNECT DB ===== */
    await connectDB();

    /* ===== READ FORM DATA ===== */
    const formData = await req.formData();

    /* ===== PHOTOS ===== */
    const photos = formData.getAll("photos") as File[];

    if (!Array.isArray(photos) || photos.length === 0) {
      return NextResponse.json(
        { error: "No photos received" },
        { status: 400 }
      );
    }

    const uploadedPhotos: string[] = [];

    for (const file of photos) {
      if (!(file instanceof File)) continue;

      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "listers" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(buffer);
      });

      if (uploadResult?.secure_url) {
        uploadedPhotos.push(uploadResult.secure_url);
      }
    }

    if (uploadedPhotos.length === 0) {
      return NextResponse.json(
        { error: "Image upload failed" },
        { status: 500 }
      );
    }

    /* ===== BASE DATA ===== */
    const pricingType = formData.get("pricingType") as
      | "hourly"
      | "daily"
      | "monthly"
      | null;

    if (!pricingType) {
      return NextResponse.json(
        { error: "pricingType missing" },
        { status: 400 }
      );
    }

    const listerData: any = {
      name: formData.get("name"),
      email: formData.get("email"),
      city: formData.get("city"),
      contact: formData.get("contact"),
      propertyType: formData.get("propertyType"),
      pricingType,
      photos: uploadedPhotos,
    };

    /* ===== HOURLY PRICING ===== */
    if (pricingType === "hourly") {
      listerData.hourlyPricing = {
        pricePerHour: Number(formData.get("pricePerHour")),
        minHours: Number(formData.get("minHours")),
        openFrom: formData.get("openFrom"),
        openTo: formData.get("openTo"),
      };
    }

    /* ===== SAVE TO DB ===== */
    await Lister.create(listerData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("LISTER CREATE ERROR:", error);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
