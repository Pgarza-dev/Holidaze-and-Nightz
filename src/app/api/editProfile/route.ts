import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const form = Object.fromEntries(formData.entries());
    const cookieUser = cookies();
    const userObject = cookieUser.get("user");
    const user = JSON.parse(userObject?.value ?? "");
    const api_key = process.env.NOROFF_API_KEY;
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
      "X-Noroff-API-Key": api_key || "",
    });
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/profiles/${user.userName}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(form),
      },
    );
    const data = await response.json();
    console.log(data);
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
      // if (response.ok) {
      //   window.location.href = "/profile";
      // }
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
    return { data: null, error };
  }
}
