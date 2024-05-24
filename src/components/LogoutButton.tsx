"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type LogoutButtonProps = {
  accessToken: string;
  username: string;
};

export default function LogoutButton({ accessToken, username }: LogoutButtonProps) {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  // if (!accessToken)
  //   return (
  //     <Link href="/login">
  //       <Button>Login</Button>
  //     </Link>
  //   );

  return (
    <Button onClick={handleLogout} variant="destructive">
      Logout
    </Button>
  );
}
