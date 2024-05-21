"use client";
import React from "react";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("An error occurred while logging out", error);
    }
  };

  return (
    <div className="py-4">
      <Button
        onClick={handleLogout}
        variant="default"
        className=" z-50 hover:bg-customWhite hover:bg-destructive  hover:text-white"
      >
        Logout
      </Button>
    </div>
  );
}
