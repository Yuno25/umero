import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const submission = {
      id: crypto.randomUUID(),
      type: formData.get("type"),
      data: {
        name: formData.get("name"),
        email: formData.get("email"),
        city: formData.get("city"),
        contact: formData.get("contact"),
        propertyType: formData.get("propertyType"),
        address: formData.get("address"),
      },
      photos: formData.getAll("photos"), // 👈 FILES HERE
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    console.log("Saved submission:", submission);

    return Response.json(
      { success: true, submissionId: submission.id },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}
