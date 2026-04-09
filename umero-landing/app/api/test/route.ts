// /api/test/route.ts
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return Response.json({ success: true, users });
  } catch (error) {
    console.error("🔥 TEST ERROR:", error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
