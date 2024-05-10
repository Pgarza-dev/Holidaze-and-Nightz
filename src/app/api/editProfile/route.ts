import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const form = Object.fromEntries(formData.entries());
    const cookieUser = cookies();
    const userObject = cookieUser.get("user");
    const user = JSON.parse(userObject?.value ?? "");
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/profiles/${user.userName}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
          "X-Noroff-API-Key": "47f644a2-ca09-4d17-898f-4d82cb9e65f2",
        },
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
    return { data: null, error };
  }
}
