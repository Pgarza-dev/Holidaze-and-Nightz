import useLoginContext from "@/utils/useLoginContext";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

function LoginButton() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log(isLoggedIn);
  const { isLoggedIn, setIsLoggedIn } = useLoginContext();
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <div>
        <button
          onClick={logout}
          className="text-base text-background hover:text-secondary dark:text-darkText md:text-xl"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div>
      <Link href="/login">
        <button className="text-base text-background hover:text-secondary dark:text-darkText md:text-xl">
          Login
        </button>
      </Link>
    </div>
  );
}

export default LoginButton;
