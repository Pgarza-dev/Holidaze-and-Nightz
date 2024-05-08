import React from "react";
import PromotionHome from "@/app/public/luxuryHouseOne.jpg";
import Container from "./Container";
import Image from "next/image";
import ViewSvg from "./ViewSvg";

function PromotionHouse() {
  return (
    <div className="">
      <div className="py-10 flex justify-center items-center">
        <ViewSvg />
      </div>

      <div className="w-full h-full bg-customBlack ">
        <Container>
          <div className="relative">
            <div className="absolute bg-customBlack font-bodoni  text-background dark:text-darkText text-base p-8 top-[30%] bg-opacity-70">
              <p className="py-2 text-lg">Homes • Rooms • Suits</p>
              <h3 className="text-4xl">Vacation anywhere, any time.</h3>
              <div className="flex justify-end py-4">
                <span className="">View all →</span>
              </div>
            </div>
            <Image
              className=" inset-0 object-cover "
              src={PromotionHome}
              alt="Image of luxury living room"
              priority
            />
          </div>
        </Container>
      </div>
    </div>
  );
}

export default PromotionHouse;
