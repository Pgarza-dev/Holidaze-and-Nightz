"use client";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { IoIosSearch } from "react-icons/io";
import Container from "@/components/Container";
import SearchBar from "@/components/SearchBar";
import LogoutButton from "./LogoutButton";
function NavBar() {
  const [isClicked, setisClicked] = useState(false);

  const toggleNavbar = () => {
    setisClicked(!isClicked);
  };

  return (
    <div className="relative w-full bg-customBlack">
      <Container className="relative z-10 w-full font-libre ">
        <header>
          <nav className="relative flex flex-row items-center justify-between">
            <div className="flex flex-col gap-4">
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
              <IoIosSearch className="text-background hover:text-secondary dark:text-darkText" />
              <ThemeToggle />
              {/* <LogoutButton accessToken="accessToken" /> */}
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

          <div className="flex flex-row gap-4 pt-[65%] text-base uppercase text-darkText dark:text-darkText md:text-lg ">
            <Link
              href="/about"
              onClick={toggleNavbar}
              className="cursor-pointer opacity-50 hover:opacity-100"
            >
              about
            </Link>
            <Link
              href="/contact"
              onClick={toggleNavbar}
              className="cursor-pointer opacity-50 hover:opacity-100"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
