import React from "react";
import Container from "./Container";

function Footer() {
  return (
    <div className="h-full w-full py-10 font-bodoni">
      <Container className="bg-customBlack ">
        <footer className="h-ful flex w-full flex-col items-center justify-center gap-8 md:flex md:flex-row">
          <div className="flex h-40 w-28 flex-col items-center justify-center border-r-8 border-l-darkText border-r-darkText px-10 uppercase text-background dark:text-darkText md:w-fit md:border-l-8">
            <p className="">address</p>
            <p className="text-sm">Oslo, Norway</p>
          </div>
          <div className="flex h-40 w-28 flex-col items-center justify-center border-r-8 border-r-darkText pe-10 uppercase text-background dark:text-darkText md:w-fit">
            <p className="">contact</p>
            <p className="text-sm">pablo garza</p>
          </div>
          <div className="flex h-40 w-28 flex-col items-center justify-center border-r-8 border-r-darkText pe-10 uppercase text-background dark:text-darkText md:w-fit">
            <p className="">social</p>
            <p className="text-sm">GitHub</p>
          </div>
        </footer>
      </Container>

      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center p-10">
        <p className="not-sr-only font-bodoni text-xl font-thin uppercase tracking-widest text-darkText opacity-10 dark:text-darkText md:text-3xl lg:text-5xl xl:text-7xl">
          pablo garza
        </p>
        <svg
          className="absolute left-[20%]"
          width="250"
          height="1"
          viewBox="0 0 250 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            y1="0.5"
            x2="250"
            y2="0.5"
            stroke="#212121"
            strokeOpacity="0.8"
          />
        </svg>

        <p className="absolute z-10 text-base uppercase md:text-xl lg:text-2xl xl:text-4xl">
          pablo garza
        </p>
        <svg
          className="absolute right-[20%]"
          width="251"
          height="8"
          viewBox="0 0 251 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M250.354 4.35355C250.549 4.15829 250.549 3.84171 250.354 3.64645L247.172 0.464466C246.976 0.269204 246.66 0.269204 246.464 0.464466C246.269 0.659728 246.269 0.976311 246.464 1.17157L249.293 4L246.464 6.82843C246.269 7.02369 246.269 7.34027 246.464 7.53553C246.66 7.7308 246.976 7.7308 247.172 7.53553L250.354 4.35355ZM0 4.5H250V3.5H0V4.5Z"
            fill="#212121"
            fillOpacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
}

export default Footer;
