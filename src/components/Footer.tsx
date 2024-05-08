import React from "react";
import Container from "./Container";

function Footer() {
  return (
    <div className="w-full h-full py-10 font-bodoni">
      <Container className="bg-customBlack ">
        <footer className="flex flex-col md:flex md:flex-row items-center justify-center gap-8 h-ful w-full">
          {/* <div className="p-5">
            <p className="text-background text-2xl dark:text-darkText h-40 flex flex-col items-center justify-center">
              HOLI•DAZE & NIGHTS
            </p>
          </div> */}
          <div className="text-background dark:text-darkText uppercase border-r-8 border-l-0 md:border-l-8 border-r-darkText px-10 h-40 flex flex-col items-center justify-center w-28 md:w-fit">
            <p className="">address</p>
            <p className="text-sm">Oslo, Norway</p>
          </div>
          <div className="text-background dark:text-darkText uppercase border-r-8 border-r-darkText pe-10 h-40 flex flex-col items-center justify-center w-28 md:w-fit">
            <p className="">contact</p>
            <p className="text-sm">pablo garza</p>
          </div>
          <div className="text-background dark:text-darkText uppercase border-r-8 border-r-darkText pe-10 h-40 flex flex-col items-center justify-center w-28 md:w-fit">
            <p className="">social</p>
            <p className="text-sm">GitHub</p>
          </div>
        </footer>
      </Container>

      <div className="relative flex flex-col justify-center items-center max-w-7xl h-full mx-auto p-10">
        <p className="not-sr-only tracking-widest font-bodoni text-xl md:text-2xl lg:text-4xl xl:text-7xl font-thin text-darkText uppercase opacity-10 dark:text-darkText">
          pablo garza
        </p>
        <svg
          className="absolute left-[20%]"
          width="250"
          height="1"
          viewBox="0 0 250 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <line
            y1="0.5"
            x2="250"
            y2="0.5"
            stroke="#212121"
            strokeOpacity="0.8"
          />
        </svg>

        <p className="absolute text-base lg:text-2xl xl:text-4xl uppercase">
          pablo garza
        </p>
        <svg
          className="absolute right-[20%]"
          width="251"
          height="8"
          viewBox="0 0 251 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
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
