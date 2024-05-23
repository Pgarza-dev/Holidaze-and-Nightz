"use client";
import React from "react";
import useFetch from "@/lib/hooks/data";
import { API_VENUES } from "@/shared/ApiEndPoints";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { IoMdStar } from "react-icons/io";
import { Venue } from "@/shared/types/venue";

export default function Venues() {
  const { data, isLoading, isError } = useFetch(API_VENUES);

  if (isLoading) return <span className="loader"></span>;

  if (isError) return <span>Oops, something is wrong!</span>;

  return (
    <>
      <div className="h-full w-full p-4">
        <svg
          className="mx-auto flex items-center justify-center"
          width="2"
          height="60"
          viewBox="0 0 2 93"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 0L0.999996 93" stroke="#212121" strokeOpacity="0.8" />
        </svg>

        <div className="relative flex flex-col items-center justify-center font-bodoni">
          <h1 className=" text-3xl uppercase text-customBlack text-opacity-10 md:text-5xl lg:text-7xl">
            Holidaze & Nightz
          </h1>
          <h2 className="absolute text-lg uppercase text-customBlack md:text-2xl lg:text-3xl">
            Holidaze & Nightz
          </h2>
        </div>
        <svg
          className="mx-auto flex items-center justify-center"
          width="8"
          height="60"
          viewBox="0 0 8 59"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.64645 58.3536C3.84171 58.5488 4.15829 58.5488 4.35356 58.3536L7.53554 55.1716C7.7308 54.9763 7.7308 54.6597 7.53554 54.4645C7.34027 54.2692 7.02369 54.2692 6.82843 54.4645L4 57.2929L1.17158 54.4645C0.976313 54.2692 0.659731 54.2692 0.464468 54.4645C0.269206 54.6597 0.269206 54.9763 0.464469 55.1716L3.64645 58.3536ZM3.5 2.18557e-08L3.5 58L4.5 58L4.5 -2.18557e-08L3.5 2.18557e-08Z"
            fill="#212121"
            fillOpacity="0.8"
          />
        </svg>
      </div>

      <Container className="grid min-h-max max-w-screen-2xl grid-cols-1 gap-4 px-4 py-10 font-libre md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        {data?.data?.map((venue: Venue) => (
          <Link
            href={`/venues/${venue?.id}`}
            key={venue?.id}
            className="group h-full w-full dark:bg-darkText"
          >
            {venue.media && venue.media.length > 0 && (
              <Image
                src={venue?.media[0].url}
                alt={`Venue image of ${venue?.media[0].alt}`}
                className="h-72 w-full cursor-pointer rounded-xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                width={500}
                height={500}
              />
            )}
            <div className="p-4">
              <div className="flex flex-row justify-between text-xl font-bold tracking-wider text-darkText dark:text-white">
                <h3>
                  {venue?.location.city}, {venue?.location.country}
                </h3>
                <span className="flex flex-row items-center justify-center gap-1">
                  <IoMdStar />
                  {venue?.rating}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-lg text-darkText dark:text-white">
                <div>
                  <span className="font-bold">${venue?.price}</span>
                  <span> / night</span>
                </div>

                <span>{venue?.maxGuests} guests</span>
              </div>
            </div>
          </Link>
        ))}
      </Container>
      <button className="group relative mx-auto flex h-20 w-80 flex-col items-center justify-center border-8 border-customBlack font-bodoni">
        <p className="w-96 bg-background text-center text-3xl uppercase text-customBlack text-opacity-10 duration-500 group-hover:text-opacity-100 lg:text-5xl">
          view more
        </p>
        <div className="absolute">
          <p className=" cursor-pointer border-customBlack uppercase text-customBlack duration-300 group-hover:text-opacity-10 lg:text-3xl">
            view more
          </p>
        </div>
      </button>
    </>
  );
}
