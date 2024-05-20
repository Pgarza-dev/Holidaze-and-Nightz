import Container from "@/components/Container";
import LogoutButton from "@/components/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";

async function ProfilePage() {
  const username = cookies().get("username")?.value;
  const accessToken = cookies().get("accessToken")?.value;
  const getData = async () => {
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": process.env.NEXT_PUBLIC_NOROFF_API_KEY || "",
          },
          cache: "no-store",
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        console.log(response);
      }
      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      return { data: null, error };
    }
  };

  const data = await getData();
  console.log(data);
  return (
    <div className="h-full w-full p-10">
      <div className="flex flex-row items-center gap-4">
        <LogoutButton />
      </div>
      <Container className="flex h-full w-full flex-row border-2 border-customBlack p-5">
        <div className="h-full w-full p-4">
          {data.data && username === data.data.name ? (
            <>
              <Avatar className="h-20 w-20 md:h-1/4 md:w-1/4">
                <AvatarImage src={data.data.avatar.url} />
                <AvatarFallback>{data.data.name}</AvatarFallback>
              </Avatar>
              <h1>{data.data.name}</h1>
              <p>{data.data.email}</p>
              <p>{data.data.bio}</p>

              <p>Venue Manager: {data.data.venueManager ? "Yes" : "No"}</p>
              <p>My venues: {data.data._count.venues}</p>
              <p>My bookings: {data.data._count.bookings}</p>
              <div className="flex justify-end gap-4">
                <Link href="/editProfile">
                  <Button className="hover:bg-customWhite hover:text-customBlack">
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/createVenue">
                  <Button className="hover:bg-customWhite hover:text-customBlack">
                    Create Venue
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div>
              <h1>Oops! Did you forget to log in?</h1>
              <Link href="/login">
                <Button className="hover:bg-customWhite hover:text-customBlack">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default ProfilePage;
