"use client";
import React from "react";
import { Button } from "./ui/button";
import { API_VENUES } from "@/shared/ApiEndPoints";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        duration: 5000,
        variant: "destructive",
        action: <ToastAction altText="Error">Close</ToastAction>,
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="pe-2">
        <span className="rounded-md bg-red-500 px-4 py-[6px] text-sm text-customWhite dark:bg-red-800  ">
          Delete
        </span>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col">
        <span className="text-sm">
          Are you sure you want to delete this venue?
        </span>
        <Button
          onClick={handleDelete}
          type="submit"
          variant="destructive"
          size="sm"
        >
          Delete Venue
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default DeleteVenueButton;
