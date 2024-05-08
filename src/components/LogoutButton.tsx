import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import LoginButton from "@/components/LoginButton";

function LogoutButton() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedOut(true)
    }
  }, [])

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedOut(true);
    console.log("Logged out");
    
  }

  if (isLoggedOut === true) {
    return (
      <div>
        <LoginButton />
      </div>
    );
  }
  return (
    <div>
      <Link href="/">
        <button
          onClick={handleLogout}
          className="text-base text-background hover:text-secondary dark:text-darkText md:text-xl"
        >
          Logout
        </button>
      </Link>
    </div>
  );
}

export default LogoutButton;
