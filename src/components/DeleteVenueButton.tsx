"use client";
import React from "react";
import { Button } from "./ui/button";
import { API_VENUES } from "@/shared/ApiEndPoints";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

type VenueProps = {
  venueId: string;
  accessToken: string;
};

function DeleteVenueButton({ venueId, accessToken }: VenueProps) {
  const router = useRouter();
  const { toast } = useToast();

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
        toast({
          title: "Venue Deleted",
          description: "You have successfully deleted a venue",
          duration: 3000,
          variant: "default",
          action: (
            <ToastAction altText="Venue deleted successfully">
              Close
            </ToastAction>
          ),
        });

        console.log("Venue deleted");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        duration: 3000,
        variant: "destructive",
        action: <ToastAction altText="Error">Close</ToastAction>,
      });
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
