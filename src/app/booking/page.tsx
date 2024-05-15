import React from "react";
import Container from "@/components/Container";
import { DatePickerWithRange } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// create client component which is a form for...
// the create new file called submitBookingAction.ts then mark as "use Serer on top of file"
// then import to createVenuesForm


function Booking() {
  return (
    <Container className="flex flex-col items-center justify-center">
      <div className="relative flex flex-col items-center justify-center p-10 font-bodoni">
        <h1 className="not-sr-only text-5xl uppercase text-customBlack text-opacity-10 md:text-7xl">
          Booking
        </h1>
        <h2 className="absolute text-2xl uppercase text-customBlack dark:text-customWhite md:text-3xl">
          Booking
        </h2>
      </div>
      <div className=" flex flex-col gap-4">
        <div className=" font-libre text-lg md:text-3xl">
          <p>LETS GET YOU SITUATED FOR YOU STAY</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 font-libre">
          <p className="text-lg md:text-2xl">Arrival / Departure</p>
          <DatePickerWithRange />
        </div>
        <div className="flex flex-row justify-center gap-6">
          <div className="flex flex-row items-center gap-2 border-b-2 border-customBlack font-libre">
            <p className="text-lg uppercase md:text-2xl">adults</p>
            <input
              type="number"
              className="h-10 w-10 rounded-md border-2 border-none bg-background ps-2 text-center text-lg text-customBlack md:text-2xl"
              placeholder="1"
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-2 border-b-2 border-customBlack font-libre">
            <p className="text-lg uppercase md:text-2xl">children</p>
            <input
              type="number"
              className="h-10 w-10 rounded-md border-2 border-none bg-background ps-2 text-center text-lg text-customBlack md:text-2xl"
              placeholder="0 "
            />
          </div>
        </div>
        <Link href="/checkout">
          <Button className="w-full font-libre text-2xl">Book</Button>
        </Link>
      </div>
    </Container>
  );
}

export default Booking;
