"use client";
import React from "react";
import { Button } from "./ui/button";
import { API_VENUES } from "@/shared/ApiEndPoints";
import { useRouter } from "next/navigation";

type VenueProps = {
  venueId: string;
  accessToken: string;
};

async function DeleteVenueButton({ venueId, accessToken }: VenueProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(API_VENUES + `/${venueId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": process.env.NEXT_PUBLIC_NOROFF_API_KEY || "",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (response.ok) {
        console.log("Venue deleted");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      type="submit"
      variant="destructive"
      size="sm"
    >
      Delete Venue
    </Button>
  );
}

export default DeleteVenueButton;
