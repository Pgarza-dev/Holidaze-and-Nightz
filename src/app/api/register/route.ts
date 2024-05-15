import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return new Response(JSON.stringify({ message: "HELLO" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
