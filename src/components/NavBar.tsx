"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { IoIosSearch } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Container from "@/components/Container";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LoginButton";

function NavBar() {
  const [isClicked, setisClicked] = useState(false);
  const toggleNavbar = () => {
    setisClicked(!isClicked);
  };

  return (
    <div className="w-full bg-customBlack">
      <Container className="relative z-10 w-full font-libre ">
        <header>
          <nav className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>PG</AvatarFallback>
                </Avatar>
                {/* <Link
                  id="loginButton"
                  href="/login"
                  className="text-base md:text-xl text-background hover:text-secondary dark:text-darkText"
                >
                  Login
                </Link> */}
                <LoginButton />
                {/* <div>
                  {localStorage.getItem("token") ? (
                    <LogoutButton />
                  ) : (
                    <LoginButton />
                  )}
                </div> */}
              </div>

              <button
                className="text-base text-background hover:text-secondary dark:text-darkText md:text-3xl"
                onClick={toggleNavbar}
              >
                Menu
              </button>
            </div>

            <form className="">
              <input
                type="text"
                placeholder="Search"
                className="hidden w-96 flex-1 rounded-lg border border-background bg-background p-2 text-foreground outline-none transition-all duration-300 ease-in-out placeholder:text-sm focus:border-primary focus:ring-2 focus:ring-primary md:block"
              />
            </form>
            <div className="flex items-center justify-center gap-4 text-base md:text-3xl">
              <IoIosSearch className="text-background hover:text-secondary dark:text-darkText" />
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
            href="/book"
            onClick={toggleNavbar}
            className="text-base text-darkText opacity-50 hover:opacity-100 dark:text-darkText md:text-3xl"
          >
            BOOK
          </Link>
          <Link
            href="/host"
            onClick={toggleNavbar}
            className="text-base text-darkText opacity-50 hover:opacity-100 dark:text-darkText md:text-3xl"
          >
            HOST
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
          <Link
            href="/login"
            onClick={toggleNavbar}
            className="text-base text-darkText opacity-50 hover:opacity-100 dark:text-darkText md:text-3xl"
          >
            LOGIN
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
