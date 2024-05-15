// components/LogoutButton.tsx
"use client";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      if (response.ok) {
        window.location.href = "/"; // Redirect to the homepage or login page after logging out
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("An error occurred while logging out", error);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      className=" z-50 hover:bg-customWhite hover:text-customBlack"
    >
      Logout
    </Button>
  );
}
