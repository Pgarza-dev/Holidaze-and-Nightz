import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

function EditVenueButton({ editVenues }: { editVenues: any[] }) {
  return (
    <>
      {editVenues.map((venue) => (
        <Link href={`venues/${venue.id}`} key={venue.id}>
          <Button className=" hover:bg-customWhite hover:text-customBlack">
            Edit Venue
          </Button>
        </Link>
      ))}
    </>
  );
}

export default EditVenueButton;
