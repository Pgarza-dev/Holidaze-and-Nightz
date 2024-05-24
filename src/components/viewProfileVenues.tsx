import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { IoMdStar } from "react-icons/io";
import DeleteVenueButton from "@/components/DeleteVenueButton";
import EditVenueButton from "./EditVenueButton";

type Props = {
  accessToken: string;
  userVenues: any[];
};

const DisplayUserVenues = ({ userVenues, accessToken }: Props) => {
  return (
    <>
      <div className="py-2">
        <Link href="/createVenue">
          <Button className=" hover:bg-customWhite hover:text-customBlack">
            Create Venue
          </Button>
        </Link>
      </div>
      <div className="flex w-full flex-col gap-4 rounded-lg border-2 border-background p-2 duration-500 hover:border-customBlack hover:shadow-md">
        {userVenues.map((venue) => (
          <>
            <Link href={`venues/${venue.id}`} key={venue.id}>
              <div className="bg-customBlackWhite border-2-customBlack flex h-full w-full cursor-pointer flex-row justify-evenly gap-4 rounded-lg bg-customBlack p-4 text-customWhite transition-colors duration-700 hover:bg-customWhite hover:text-customBlack hover:shadow-lg ">
                <div>
                  <Image
                    width={150}
                    height={150}
                    src={venue?.media[0].url}
                    alt={venue?.media.alt}
                  />
                </div>
                <div>
                  <h2>{venue?.name}</h2>
                  <p>Price per night: ${venue?.price}</p>
                  <p>Guests: {venue?.maxGuests}</p>
                  <p className="inline-flex items-center">
                    {Array.from({ length: venue?.rating }, (_, index) => (
                      <IoMdStar className="text-yellow-500" key={index} />
                    ))}
                  </p>
                </div>
              </div>
            </Link>

            <DeleteVenueButton venueId={venue.id} accessToken={accessToken} />
            <EditVenueButton accessToken="accessToken" venueId="venueId" />
          </>
        ))}
      </div>
    </>
  );
};

export default DisplayUserVenues;
