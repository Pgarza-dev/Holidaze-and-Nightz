import Container from "@/components/Container";
import EditProfileForm from "@/components/forms/EditProfleForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { useCallback } from "react";

async function ProfilePage() {
  const cookieUser = cookies();
  const userObject = cookieUser.get("user");

  const user = JSON.parse(userObject?.value ?? "");

  const getData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${user.userName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
            "X-Noroff-API-Key": "47f644a2-ca09-4d17-898f-4d82cb9e65f2",
          },
        },
      );
      if (!response.ok) {
        return {};
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return { data: null, error };
    }
  }, [user]);

  const data = await getData();

  return (
    <div className="h-full w-full p-10">
      <Container className="flex h-full w-full flex-row border-2 border-customBlack p-5">
        <div className="h-full w-full p-4">
          <Avatar className="h-20 w-20 md:h-1/4 md:w-1/4">
            <AvatarImage src={data.data.avatar.url} />
            <AvatarFallback>{data.data.name}</AvatarFallback>
          </Avatar>
          <h1>{data.data.name}</h1>
          <p>{data.data.email}</p>
          <p>{data.data.bio}</p>
          <p>{data.data.venueManager}</p>
          <p>My bookings: {data.data.bookings}</p>
          <p>My venues: {data.data.venues_count}</p>
        </div>
        <div>
          <Button>Edit Profile</Button>
        </div>
      </Container>
      <div>
        <EditProfileForm />
      </div>
    </div>
  );
}

export default ProfilePage;
