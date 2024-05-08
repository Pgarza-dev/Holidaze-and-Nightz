"use client"; // The Slider is a third-party library that is not compatible with the server-side rendering. So, we need to use the client-side rendering for this component.
import React from "react";
import Image from "next/image";
import luxuryHouseOne from "@/app/public/luxuryHouseOne.jpg";
import luxuryHouseTwo from "@/app/public/luxuryHouseTwo.jpg";
import luxuryHouseThree from "@/app/public/luxuryHouseThree.jpg";
import luxuryHouseFour from "@/app/public/luxuryHouseFour.jpg";
import luxuryHouseFive from "@/app/public/landing.jpg";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Container from "./Container";

const images = [
  luxuryHouseOne,
  luxuryHouseTwo,
  luxuryHouseThree,
  luxuryHouseFour,
  luxuryHouseFive,
];

const houseLocations = [
  "Barcelona, Spain",
  "London, UK",
  "San Francisco, USA",
  "Edinburgh, Scotland",
  "Paris, France",
];

const imageTitles = ["RELAX", "LIVE", "EXPLORE", "FAMILY", "FUN"];

function CarouselSection() {
  return (
    <div className="bg-customBlack overflow-hidden">
      <Container>
        <Carousel
          opts={{
            align: "center",
          }}
          className="w-full max-w-9xl ms-40 bg-customBlack">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-2/5 cursor-pointer">
                <div className="p-8 border-l-8">
                  <Card className="border-none">
                    <CardContent className="flex aspect-square items-center  justify-center p-0">
                      <div className="absolute font-bodoni p-4 md:p-6 lg:p-7 xl:p-10 bg-customBlack bg-opacity-65 text-background dark:text-darkText text-base md:text-lg lg:text-xl xl:text-4xl">
                        {imageTitles[index % images.length]}
                      </div>
                      <Image
                        src={images[index % images.length]}
                        alt={`House ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={500}
                        height={500}
                        priority={true}
                      />
                    </CardContent>
                    <div className="font-libre bg-customBlack text-background dark:text-darkText text-base md:text-lg lg:text-xl flex flex-row justify-between pt-6">
                      <div className=" flex flex-col">
                        {houseLocations[index % houseLocations.length]}
                        <span className="hover:underline underline-offset-8 cursor-pointer">
                          More →
                        </span>
                      </div>
                      <span className="  ">17-05</span>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="cursor-pointer" />
          <CarouselNext className="cursor-pointer" />
        </Carousel>
      </Container>
    </div>
  );
}

export default CarouselSection;
