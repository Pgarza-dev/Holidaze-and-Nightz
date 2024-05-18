"use client";
import Container from "@/components/Container";
import Image from "next/image";
import React from "react";
import { API_VENUES } from "@/shared/ApiEndPoints";
import useFetch from "@/lib/hooks/data";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IoMdStar } from "react-icons/io";
import { CiWifiOn } from "react-icons/ci";
import { MdPets } from "react-icons/md";
import { CiParking1 } from "react-icons/ci";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { LiaCitySolid } from "react-icons/lia";
import { IoMdGlobe } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { BsHouse } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type VenueProps = {
  params: { [key: string]: string | string[] | undefined };
};
type Media = { url: string; alt: string };

export default function VenueDetails({ params }: VenueProps) {
  const venueId = params.venuesId as string;
  const { data, isLoading, isError } = useFetch(API_VENUES + `/${venueId}`);
  console.log(data);

  if (isLoading) return <span className="loader"></span>;

  if (isError) return <span>Oops, something is wrong!</span>;

  const venue: any = data?.data;

  return (
    <>
      <Container>
        <div className="flex h-auto w-full items-center p-4 py-10 font-bold">
          <div className="relative flex flex-col items-center justify-center font-bodoni">
            <h1 className="not-sr-only uppercase text-customBlack text-opacity-10 lg:text-7xl">
              location
            </h1>
            <h2 className="absolute uppercase text-customBlack lg:text-3xl">
              location
            </h2>
          </div>
          <svg
            width="95"
            height="8"
            viewBox="0 0 95 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M94.3536 4.35355C94.5488 4.15829 94.5488 3.84171 94.3536 3.64645L91.1716 0.464466C90.9763 0.269204 90.6597 0.269204 90.4645 0.464466C90.2692 0.659728 90.2692 0.976311 90.4645 1.17157L93.2929 4L90.4645 6.82843C90.2692 7.02369 90.2692 7.34027 90.4645 7.53553C90.6597 7.7308 90.9763 7.7308 91.1716 7.53553L94.3536 4.35355ZM0 4.5H94V3.5H0V4.5Z"
              fill="#212121"
              fillOpacity="0.8"
            />
          </svg>
        </div>
        <section className="mx-auto flex flex-col-reverse items-center justify-center gap-2 lg:flex-row">
          <div className=" relative flex w-full flex-col items-center gap-3 border-8 border-customBlack bg-background p-4 font-libre text-base text-customBlack dark:text-darkText lg:h-96 lg:w-96">
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-background lg:w-[25rem] lg:border-2 lg:border-background">
              <h2 className="font-bold md:p-6 md:text-lg lg:p-7 lg:text-xl xl:p-10 xl:text-4xl">
                {venue?.location?.city}, {venue?.location?.country}
              </h2>
              <p className=" overflow-y-scroll overscroll-contain px-8 pb-6 text-base xl:text-lg">
                {venue?.description}
              </p>{" "}
              <Button className="border-2 bg-customBlack text-2xl text-customWhite duration-300 hover:ring-2 hover:ring-customBlack hover:dark:bg-customWhite hover:dark:text-customBlack">
                <Link href={`/venues/${venueId}/bookings`}>Book</Link>
              </Button>
            </div>
          </div>
          <Carousel
            opts={{
              align: "center",
            }}
            className="max-w-9xl w-full pb-5"
          >
            <CarouselContent className="">
              {venue?.media?.map((mediaItem: Media, index: number) => (
                <CarouselItem
                  key={index}
                  className="m-auto cursor-pointer md:basis-1/2 lg:basis-2/3 xl:basis-2/4"
                >
                  <div className="">
                    <Card className="">
                      <CardContent className="m-0 aspect-square border-none p-0">
                        <Image
                          key={mediaItem.url}
                          src={mediaItem.url}
                          alt={mediaItem.alt}
                          width={800}
                          height={500}
                          className="h-full w-full object-cover"
                        />
                      </CardContent>
                    </Card>
                    <div className="flex flex-row justify-between border-customBlack p-4 font-libre text-base text-customBlack ">
                      <div className=" flex flex-col">
                        <div className="inline-flex gap-2">
                          <p className="">{venue?.location.city},</p>
                          <p>{venue?.location.country}</p>
                        </div>
                        <span className="cursor-pointer underline-offset-8 hover:underline">
                          More →
                        </span>
                      </div>
                      <span className="">
                        {new Date(venue?.created).toISOString().split("T")[0]}
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer" />
            <CarouselNext className="cursor-pointer" />
          </Carousel>
        </section>
        <article className="mx-auto flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden pt-8 font-libre text-lg md:h-32 md:flex-row md:justify-start">
          <div className="relative flex flex-row items-center justify-center uppercase">
            <svg
              className="hidden md:block"
              width="46"
              height="2"
              viewBox="0 0 46 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.00402832 1H46.004"
                stroke="#212121"
                strokeOpacity="0.8"
              />
            </svg>

            <p className="font-bold text-customBlack text-opacity-10 lg:text-3xl xl:text-6xl">
              amenities
            </p>
            <p className="absolute font-bold lg:text-lg xl:text-3xl">
              amenities
            </p>
            <svg
              className="hidden md:block"
              width="46"
              height="8"
              viewBox="0 0 74 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M73.3576 4.35355C73.5528 4.15829 73.5528 3.84171 73.3576 3.64645L70.1756 0.464466C69.9803 0.269204 69.6638 0.269204 69.4685 0.464466C69.2732 0.659728 69.2732 0.976311 69.4685 1.17157L72.2969 4L69.4685 6.82843C69.2732 7.02369 69.2732 7.34027 69.4685 7.53553C69.6638 7.7308 69.9803 7.7308 70.1756 7.53553L73.3576 4.35355ZM0.00402832 4.5H73.004V3.5H0.00402832V4.5Z"
                fill="#212121"
                fillOpacity="0.8"
              />
            </svg>
          </div>

          <div className="flex h-full w-52 cursor-default flex-col items-start justify-center overflow-hidden border-r-8 border-customBlack md:w-1/5">
            <p className="inline-flex items-center justify-center gap-6 duration-300 hover:text-xl">
              <BsHouse className="" />
              {venue?.name}
            </p>
            <p className="inline-flex items-center justify-center gap-6 duration-300 hover:text-xl">
              <IoPersonOutline />
              <p>Guests: {venue?.maxGuests}</p>
            </p>
            <span className="flex flex-row items-center gap-6 duration-300 hover:text-xl">
              <IoMdStar />
              <p>Rated: {venue?.rating}</p>
            </span>
          </div>

          <div className="flex h-full w-52 cursor-default flex-col items-start justify-center overflow-hidden border-r-8 border-customBlack md:w-1/5">
            {venue?.meta?.wifi ? (
              <p className="flex flex-row items-center justify-center gap-6 duration-300 hover:text-xl ">
                <CiWifiOn /> Wifi: Yes
              </p>
            ) : (
              <p className="flex flex-row items-start gap-6 duration-300 hover:text-xl">
                <CiWifiOn /> Wifi: No
              </p>
            )}
            {venue?.meta?.pets ? (
              <p className="flex flex-row items-center justify-center gap-6 duration-300 hover:text-xl">
                <MdPets /> Pets: Yes
              </p>
            ) : (
              <p className="flex flex-row items-center justify-center gap-6 duration-300 hover:text-xl">
                <MdPets /> Pets: No
              </p>
            )}
            {venue?.meta?.parking ? (
              <p className="flex flex-row items-center justify-center gap-6 duration-300 hover:text-xl">
                <CiParking1 /> Parking: Yes
              </p>
            ) : (
              <p className="flex flex-row items-center justify-center gap-6 duration-300 hover:text-xl">
                <CiParking1 /> Parking: No
              </p>
            )}
            {venue?.meta?.breakfast ? (
              <p className="flex flex-row items-center justify-center gap-6 duration-300 hover:text-xl">
                <MdOutlineFreeBreakfast /> Breakfast: Yes
              </p>
            ) : (
              <p className="flex flex-row items-center justify-center gap-6 duration-300 hover:text-xl">
                <MdOutlineFreeBreakfast /> Breakfast: No
              </p>
            )}
          </div>
          <div className="flex h-full w-52 cursor-default flex-col items-start justify-center overflow-hidden border-r-8 border-customBlack md:w-1/4">
            {venue?.location?.address ? (
              <p className="inline-flex items-center gap-6 duration-300 hover:text-xl">
                <IoLocationOutline />
                Address: {venue?.location?.address}
              </p>
            ) : (
              <p className="inline-flex items-center gap-6 duration-300 hover:text-xl">
                <IoLocationOutline />
                Address: Not Available
              </p>
            )}
            {venue?.location?.city ? (
              <p className="inline-flex items-center gap-6 duration-300 hover:text-xl">
                <LiaCitySolid />
                City: {venue?.location?.city}
              </p>
            ) : (
              <p className="inline-flex items-center gap-6 duration-300 hover:text-xl">
                <LiaCitySolid />
                City: Not Available
              </p>
            )}
            {venue?.location?.country ? (
              <p className="inline-flex items-center gap-6 duration-300 hover:text-xl">
                <IoMdGlobe />
                {venue?.location?.continent}
              </p>
            ) : (
              <p className="inline-flex items-center gap-6 duration-300 hover:text-xl">
                <IoMdGlobe />
                Not Available
              </p>
            )}
          </div>
        </article>
      </Container>
    </>
  );
}
