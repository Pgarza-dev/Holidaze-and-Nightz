import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const form = Object.fromEntries(formData.entries());
    const response = await fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      cookies().set({
        name: "user",
        value: JSON.stringify({
          userName: data.data.name,
          token: data.data.accessToken,
        }),
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 365 * 1000,
        expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
      });
      return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify(response.status), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    return Response.json("error", { status: 500 });
  }
}
