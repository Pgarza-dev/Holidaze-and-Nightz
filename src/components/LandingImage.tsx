import React from "react";
import Image from "next/image";
import landingImage from "@/app/public/landing.jpg";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

function LandingImage() {
  return (
    <>
      <div className="relative flex justify-center items-center -top-44 z-0">
        <div className="absolute flex flex-col justify-center items-center gap-20">
          <h1 className="md:tracking-widest lg:tracking-widest xl:tracking-wide font-bodoni text-2xl md:text-4xl lg:text-6xl xl:text-9xl font-thin text-center w-full text-background dark:text-darkText">
            HOLI•DAZE & NIGHTS
          </h1>
          <div className="flex flex-row">
            <RiDoubleQuotesL className="text-3xl text-background" />
            <h4 className="py-3 font-libre px-2 text-base md:text-lg xl:text-2xl tracking-widest font-thin text-center md:block text-background dark:text-darkText">
              Exquisite service, unparalleled luxury
            </h4>
            <RiDoubleQuotesR className="text-3xl text-background" />
          </div>
        </div>

        <Image
          className=" object-cover inset-0 h-screen "
          src={landingImage}
          alt="Image of luxury living room"
          priority
        />
      </div>
    </>
  );
}

export default LandingImage;
