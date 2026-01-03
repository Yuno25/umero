export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // 🔴 LOG EVERYTHING
    const entries: Record<string, any> = {};

    formData.forEach((value, key) => {
      if (value instanceof File) {
        entries[key] = { fileName: value.name };
      } else {
        entries[key] = value;
      }
    });

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
