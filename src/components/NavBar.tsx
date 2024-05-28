"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { IoIosSearch } from "react-icons/io";
import Container from "@/components/Container";
import SearchBar from "@/components/SearchBar";

function NavBar() {
  const [isClicked, setisClicked] = useState(false);
  const menuNav = useRef(null);

  const toggleNavbar = () => {
    setisClicked((prevIsClicked) => !prevIsClicked);
    const menu = menuNav.current as HTMLElement | null;
    if (menu) {
      menu.style.display = isClicked ? "none" : "block";
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuNav.current &&
      !(menuNav.current as HTMLElement).contains(event.target as Node)
    ) {
      setisClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full bg-customBlack">
      <Container className="relative z-10 w-full font-libre ">
        <header>
          <nav className="relative flex flex-row items-center justify-between">
            <div ref={menuNav} className="flex flex-col gap-4">
              <button
                className="text-base text-background hover:text-secondary dark:text-darkText md:text-3xl"
                onClick={toggleNavbar}
              >
                Menu
              </button>
            </div>
            <div className="relative top-0 flex items-center justify-center">
              <SearchBar />
            </div>

            <div className="flex items-center justify-center gap-4 text-base md:text-3xl">
              <IoIosSearch className="text-background dark:text-customWhite" />
              <ThemeToggle />
            </div>
          </nav>
        </header>
      </Container>
      {isClicked && (
        <div className="absolute top-0 z-50 flex h-screen w-96 flex-col justify-start gap-2 bg-background ps-20 pt-40 font-libre ">
          <button
            className="pb-8 text-left text-2xl text-darkText underline underline-offset-auto hover:opacity-50 dark:text-darkText md:text-7xl"
            onClick={toggleNavbar}
          >
            Menu
          </button>
          <Link
            href="/"
            onClick={toggleNavbar}
            className="text-base text-darkText opacity-50 hover:opacity-100 dark:text-darkText md:text-3xl"
          >
            HOME
          </Link>
          <Link
            href="/venues"
            onClick={toggleNavbar}
            className="text-base text-darkText opacity-50 hover:opacity-100 dark:text-darkText md:text-3xl"
          >
            VENUES
          </Link>
          <Link
            href="/register"
            onClick={toggleNavbar}
            className="text-base text-darkText opacity-50 hover:opacity-100 dark:text-darkText md:text-3xl"
          >
            REGISTER
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;
