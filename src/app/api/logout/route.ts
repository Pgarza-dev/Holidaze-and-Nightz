// /app/api/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  cookieStore.delete("user");

  return NextResponse.json({ message: "Logged out" });
}
