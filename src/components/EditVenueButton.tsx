"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import EditManagedVenueForm from "@/components/forms/EditManagedVenueForm";

type Props = {
  venueId: string;
  accessToken: string;
};

function EditVenueButton({ venueId, accessToken }: Props) {
  const [isClicked, setIsClicked] = React.useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className=" hover:bg-customWhite hover:text-customBlack"
      >
        Edit Venue
      </Button>

      {isClicked && <EditManagedVenueForm accessToken={accessToken} />}
    </>
  );
}

export default EditVenueButton;
