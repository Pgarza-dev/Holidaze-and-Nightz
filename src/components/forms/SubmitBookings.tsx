"use client";
import Container from "@/components/Container";
import { DatePickerWithRange } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import useFetch from "@/lib/hooks/data";
import { API_VENUES, API_VENUES_SINGLE_BOOKINGS } from "@/shared/ApiEndPoints";
import { addDays } from "date-fns";
import Link from "next/link";
import React from "react";
import { DateRange } from "react-day-picker";
import { FormEvent } from "react";
import { bookingSchema } from "@/app/forms/bookingSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
}

export default function SubmitBooking({ venuesId} : {venuesId: string}) {
  const { data, isLoading, isError } = useFetch(API_VENUES + `/${venuesId}?_bookings=true`);
// validated data schemma here
  console.log(data);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      adults: 1,
      children: 0,
    },
  });

  const [adults, setAdults] = React.useState(1);
  const [children, setChildren] = React.useState(0);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const bookedDates = React.useMemo(() => {
    if (data && Array.isArray(data.data)) {
      return data.data.reduce((acc: Date[], booking) => {
        // Specify the type of 'acc' as 'Date[]'
        const start = new Date((booking as Booking).dateFrom);
        const end = new Date((booking as Booking).dateTo);
        while (start <= end) {
          acc.push(new Date(start));
          start.setDate(start.getDate() + 1);
        }
        return acc;
      }, []);
    }
    return [];
  }, [data]);
  console.log(bookedDates);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!dateRange?.from || !dateRange?.to) {
      alert("Please select a date range");
      return;
    }
  };

  const bookingData = {
    dateFrom: dateRange?.from?.toISOString() ?? "",
    dateTo: dateRange?.to?.toISOString() ?? "",
    guests: adults + children,
  };
  console.log(bookingData);

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
      <form className=" flex flex-col gap-4">
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
          <Button type="submit" className="w-full font-libre text-2xl">
            Book
          </Button>
        </Link>
      </form>
    </Container>
  );
}
