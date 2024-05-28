"use client";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { IoIosSearch } from "react-icons/io";
import Container from "@/components/Container";
import SearchBar from "@/components/SearchBar";
import { GrClose } from "react-icons/gr";
function NavBar() {
  const [isClicked, setisClicked] = useState(false);

  const toggleNavbar = () => {
    setisClicked(!isClicked);
  };

  return (
    <div className="relative w-full bg-customBlack">
      <Container className="relative z-10 w-full font-libre ">
        <header>
          <nav className="relative flex flex-col items-center justify-evenly md:flex-row">
            <div className="relative top-0 flex flex-col items-center justify-between md:flex-row gap-4 w-full">
              <div className="flex w-full flex-row items-center justify-between gap-4 py-2">
                <button
                  className="text-base text-background hover:text-secondary dark:text-darkText md:text-3xl"
                  onClick={toggleNavbar}
                >
                  Menu
                </button>
                <div className="not-sr-only sm:sr-only">
                  <ThemeToggle />
                </div>
              </div>

              <div>
                <SearchBar />
              </div>
              <div className="sr-only md:not-sr-only">
                  <ThemeToggle />
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 text-base md:text-3xl"></div>
          </nav>
        </header>
      </Container>
      {isClicked && (
        <div className="absolute top-0 z-50 flex h-screen w-96 flex-col justify-start gap-2 bg-background ps-20 pt-40 font-libre ">
          <div onClick={toggleNavbar} className="flex w-full justify-end p-4">
            <GrClose className="h-6 w-6 cursor-pointer hover:opacity-50" />
          </div>

          <button className="pb-8 text-left text-2xl text-darkText underline underline-offset-auto hover:opacity-50 dark:text-darkText md:text-7xl">
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
