"use client";
import React from "react";
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
        variant="secondary"
        size="sm"
        onClick={handleClick}
      >
        Edit Venue
      </Button>

      {isClicked && (
        <EditManagedVenueForm venueId={venueId} accessToken={accessToken} />
      )}
    </>
  );
}

export default EditVenueButton;
