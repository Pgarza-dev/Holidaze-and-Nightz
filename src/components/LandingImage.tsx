import React from "react";
import Image from "next/image";
import landingImage from "@/app/public/landing.jpg";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

function LandingImage() {
  return (
    <>
      <div className="relative -top-44 z-0 flex items-center justify-center">
        <div className="absolute flex flex-col items-center justify-center gap-20">
          <h1 className="w-full text-center font-bodoni text-2xl font-thin text-background dark:text-darkText md:text-4xl md:tracking-widest lg:text-6xl lg:tracking-widest xl:text-9xl xl:tracking-wide">
            HOLI•DAZE & NIGHTS
          </h1>
          <div className="flex flex-row">
            <RiDoubleQuotesL className="text-3xl text-background dark:text-customWhite" />
            <h4 className="px-2 py-3 text-center font-libre text-base font-thin tracking-widest text-background dark:text-darkText md:block md:text-2xl xl:text-3xl">
              Exquisite service, unparalleled luxury
            </h4>
            <RiDoubleQuotesR className="text-3xl text-background dark:text-customWhite" />
          </div>
        </div>

        <Image
          className=" inset-0 h-screen object-cover "
          src={landingImage}
          alt="Image of luxury living room"
          priority
        />
      </div>
    </>
  );
}

export default LandingImage;
