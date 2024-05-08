"use client";
import React from "react";
import useFetch from "@/lib/hooks/data";
import { API_VENUES } from "@/shared/api";
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
   <div className="w-full h-full p-4">
    <svg
     className="flex justify-center items-center mx-auto animate-bounce"
     width="2"
     height="60"
     viewBox="0 0 2 93"
     fill="none"
     xmlns="http://www.w3.org/2000/svg">
     <path
      d="M1 0L0.999996 93"
      stroke="#212121"
      strokeOpacity="0.8"
     />
    </svg>

    <div className="relative font-bodoni flex flex-col justify-center items-center">
     <h1 className="lg:text-7xl not-sr-only uppercase text-customBlack text-opacity-10">
      venues
     </h1>
     <h2 className="absolute lg:text-3xl text-customBlack uppercase">
      venues
     </h2>
    </div>
    <svg
     className="flex justify-center items-center mx-auto animate-bounce"
     width="8"
     height="60"
     viewBox="0 0 8 59"
     fill="none"
     xmlns="http://www.w3.org/2000/svg">
     <path
      d="M3.64645 58.3536C3.84171 58.5488 4.15829 58.5488 4.35356 58.3536L7.53554 55.1716C7.7308 54.9763 7.7308 54.6597 7.53554 54.4645C7.34027 54.2692 7.02369 54.2692 6.82843 54.4645L4 57.2929L1.17158 54.4645C0.976313 54.2692 0.659731 54.2692 0.464468 54.4645C0.269206 54.6597 0.269206 54.9763 0.464469 55.1716L3.64645 58.3536ZM3.5 2.18557e-08L3.5 58L4.5 58L4.5 -2.18557e-08L3.5 2.18557e-08Z"
      fill="#212121"
      fillOpacity="0.8"
     />
    </svg>
   </div>

   <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 px-4 py-10 font-libre min-h-max max-w-screen-2xl">
    {data?.data?.map((venue: Venue) => (
     // console.log(venue),
     <Link
      href={`/venues/${venue?.id}`}
      key={venue?.id}
      className="dark:bg-darkText w-full h-full group">
      {venue.media && venue.media.length > 0 && (
       <Image
        src={venue?.media[0].url}
        alt={`Venue image of ${venue?.media[0].alt}`}
        className="cursor-pointer object-cover rounded-xl h-72 w-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
        width={500}
        height={500}
       />
      )}
      <div className="p-4">
       <div className="flex flex-row justify-between tracking-wider font-bold text-xl text-darkText dark:text-white">
        <h3>
         {venue?.location.city}, {venue?.location.country}
        </h3>
        <span className="flex flex-row gap-1 justify-center items-center">
         <IoMdStar />
         {venue?.rating}
        </span>
       </div>
       <div className="flex items-center justify-between mt-4 text-darkText dark:text-white text-lg">
        {/* <Link href={`/venues/${venue?.id}`}>View Venue</Link> */}
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
   <button className="relative group flex flex-col justify-center items-center mx-auto font-bodoni border-8 h-20 border-customBlack w-80">
    <p className="text-3xl lg:text-5xl uppercase text-customBlack text-opacity-10 w-96 bg-background text-center group-hover:text-opacity-100 duration-500">
     view more
    </p>
    <div className="absolute">
     <p className=" lg:text-3xl uppercase text-customBlack border-customBlack group-hover:text-opacity-10 cursor-pointer duration-300">
      view more
     </p>
    </div>
   </button>
  </>
 );
}
