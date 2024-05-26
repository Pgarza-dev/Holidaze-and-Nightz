import Container from "@/components/Container";
import LogoutButton from "@/components/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import DisplayUserBookings from "@/components/viewProfileBookings";
import DisplayUserVenues from "@/components/viewProfileVenues";
import { API_VENUES } from "@/shared/ApiEndPoints";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function ProfilePage() {
  const username = cookies().get("username")?.value;
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
    return redirect("/login");
  }
  const getData = async () => {
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${username}?_bookings=true&_venues=true`,
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
    <div className="h-full w-full p-10 font-libre">
      <div className="flex flex-row items-center justify-end gap-4 pb-2">
        <Link href="/">
          <Button className="text-lg" variant="link" size="sm">
            Home
          </Button>
        </Link>
        <Link href="/venues">
          <Button className="text-lg" variant="link" size="sm">
            Venues
          </Button>
        </Link>
        <Link href="/editProfile">
          <Button className="text-lg" variant="link" size="sm">
            Edit Profile
          </Button>
        </Link>
        <LogoutButton accessToken="accessToken" username="username" />
      </div>
      <Container className="flex h-full w-full flex-row border-2 border-customBlack p-5">
        <div className="h-full w-full p-4">
          {data.data && username === data.data.name ? (
            <>
              <div>
                <div className="relative z-0 flex h-full w-full items-center justify-center">
                  <Image
                    src={data.data.banner.url}
                    alt={data.data.banner.alt}
                    width={500}
                    height={500}
                    className="absolute top-0 z-0 max-h-96 w-full rounded-lg object-cover"
                  />
                </div>
                <div>
                  <div className="flex flex-col items-center justify-center text-lg">
                    <Avatar className="my-2 h-20 w-20 md:h-1/6 md:w-1/6">
                      <AvatarImage src={data.data.avatar.url} />
                      <AvatarFallback>{data.data.name}</AvatarFallback>
                    </Avatar>
                    <div className="z-10 flex w-3/4 flex-col items-center justify-center rounded-lg bg-background bg-opacity-80 p-4 dark:bg-customBlack">
                      <h1 className="text-2xl">{data.data.name}</h1>
                      <p className="text-base">{data.data.email}</p>
                      <div className="flex flex-row gap-4">
                        <p className="">
                          Venue Manager:{" "}
                          {data.data.venueManager ? "Yes ✓" : "No"}
                        </p>
                      </div>
                      <p className=" text-center">{data.data.bio}</p>
                    </div>
                  </div>

                  <div className="my-4 h-full w-full p-4">
                    <h3 className="pb-5 pt-10 text-center text-2xl underline underline-offset-4 md:text-4xl">
                      My Venues
                    </h3>

                    <DisplayUserVenues
                      userVenues={data.data.venues}
                      accessToken={accessToken}
                    />
                  </div>
                  <div className="h-full w-full">
                    <h3 className="p-4 text-center text-2xl underline underline-offset-4 md:text-4xl">
                      My Bookings
                    </h3>
                    <DisplayUserBookings userBookings={data.data.bookings} />
                  </div>
                </div>
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
