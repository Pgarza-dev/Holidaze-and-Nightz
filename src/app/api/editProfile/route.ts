import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { removeUndefinedAndEmpty } from "@/utils/removeUndefinedAndEmpty";
import { revalidatePath } from "next/cache";

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const form = Object.fromEntries(formData.entries());
    const transformedForm = {
      bio: form.bio || undefined,
      avatar: {
        url: form.avatarUrl || undefined,
        alt: form.avatarAlt || undefined,
      },
      banner: {
        url: form.bannerUrl || undefined,
        alt: form.bannerAlt || undefined,
      },
      venueManager: form.venueManager === "true" ? true : false || undefined,
    };

    const saveResult = removeUndefinedAndEmpty(transformedForm);
    console.log(saveResult);
    console.log(transformedForm);
    console.log(form);
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
        body: JSON.stringify(saveResult),
      },
    );
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      console.log(data);

      revalidatePath("/profile");

      return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify(response.status), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    return Response.json("error", { status: 500 });
  }
}
