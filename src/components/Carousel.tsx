"use client"; // The Slider is a third-party library that is not compatible with the server-side rendering. So, we need to use the client-side rendering for this component.
import React from "react";
import Image from "next/image";
import luxuryHouseOne from "@/app/public/luxuryHouseOne.jpg";
import luxuryHouseTwo from "@/app/public/luxuryHouseTwo.jpg";
import luxuryHouseThree from "@/app/public/luxuryHouseThree.jpg";
import luxuryHouseFour from "@/app/public/luxuryHouseFour.jpg";
import luxuryHouseFive from "@/app/public/landing.jpg";
import Link from "next/link";

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
    <div className="w-full bg-customBlack">
      <Container>
        <Carousel
          opts={{
            align: "start",
          }}
          className="ms-10 max-w-fit bg-customBlack"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="cursor-pointer md:basis-1/2 lg:basis-1/3 xl:basis-2/5"
              >
                <div className="border-l-8 border-customWhite p-8 dark:border-customWhite">
                  <Card className="border-none">
                    <CardContent className="flex aspect-square items-center  justify-center p-0">
                      <div className="absolute bg-customBlack bg-opacity-65 p-4 font-bodoni text-base text-background dark:text-darkText md:p-6 md:text-lg lg:p-7 lg:text-xl xl:p-10 xl:text-4xl">
                        {imageTitles[index % images.length]}
                      </div>
                      <Image
                        src={images[index % images.length]}
                        alt={`House ${index + 1}`}
                        className="h-full w-full object-cover"
                        width={500}
                        height={500}
                        priority={true}
                      />
                    </CardContent>
                    <div className="flex flex-row justify-between bg-customBlack pt-6 font-libre text-base text-background dark:text-darkText md:text-lg lg:text-xl">
                      <div className=" flex flex-col">
                        {houseLocations[index % houseLocations.length]}
                        <Link
                          href="/venues"
                          className="cursor-pointer underline-offset-8 hover:underline"
                        >
                          More →
                        </Link>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="cursor-pointer" />
          <CarouselPrevious className="cursor-pointer" />
        </Carousel>
      </Container>
    </div>
  );
}

export default CarouselSection;
