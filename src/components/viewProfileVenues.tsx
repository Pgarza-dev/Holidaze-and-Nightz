import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const DisplayUserVenues = ({ userVenues }: { userVenues: any[] }) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <Link href="/createVenue">
        <Button className="hover:bg-customWhite hover:text-customBlack">
          Create Venue
        </Button>
      </Link>
      {userVenues.map((venue) => (
        <div
          key={venue.id}
          className="bg-customBlackWhite border-2-customBlack flex h-full w-full cursor-pointer flex-row justify-evenly gap-4 rounded-lg bg-customBlack p-4 text-customWhite transition-colors duration-700 hover:bg-customWhite hover:text-customBlack hover:shadow-lg "
        >
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
            <p>Rated: {venue?.rating} / 5</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayUserVenues;
