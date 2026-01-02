export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // 🔴 LOG EVERYTHING
    const entries: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
      entries[key] =
        typeof value === "object" && "name" in value
          ? { fileName: (value as File).name }
          : value;
    }

    console.log("FORM DATA RECEIVED:", entries);

    // 🔴 DO NOT PROCESS — JUST RESPOND
    return NextResponse.json(
      {
        success: true,
        received: entries,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("HARD CRASH:", err);
    return NextResponse.json({ error: "Crash" }, { status: 500 });
  }
}
