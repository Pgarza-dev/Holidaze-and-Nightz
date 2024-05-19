"use client";
import Container from "@/components/Container";
import { DatePickerWithRange } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import useFetch from "@/lib/hooks/data";
import { API_ALL_BOOKINGS, API_VENUES } from "@/shared/ApiEndPoints";
import { addDays } from "date-fns";
import Link from "next/link";
import React from "react";
import { DateRange } from "react-day-picker";
import { FormEvent } from "react";
import { bookingSchema } from "@/app/forms/bookingSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
}

export default function SubmitBooking({ venuesId }: { venuesId: string }) {
  const { data, isLoading, isError } = useFetch(
    API_VENUES + `/${venuesId}?_bookings=true`,
  );
  //console.log(data);
  // validated data schema here

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      adults: 1,
      children: 0,
    },
  });

  async function handleBooking() {
    try {
      const response = await fetch(API_ALL_BOOKINGS + `/${venuesId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.getValues()),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Success:", data);
      } else {
        console.error("Failed:", data);
      }
    } catch (error) {
      console.error("Failed:", error);
    }
  }

  const [adults, setAdults] = React.useState(1);
  const [children, setChildren] = React.useState(0);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  const [isValid, setIsValid] = React.useState(true);

  const bookedDates = React.useMemo(() => {
    if (data) {
      const anyData: any = data;
      if (Array.isArray(anyData.data?.bookings)) {
        return anyData.data.bookings.reduce((acc: Date[], booking: Booking) => {
          // Specify the type of 'acc' as 'Date[]'
          const start = new Date(booking.dateFrom);
          const end = new Date(booking.dateTo);
          while (start <= end) {
            acc.push(new Date(start));
            start.setDate(start.getDate() + 1);
          }
          return acc;
        }, []);
      }
    }
    return [];
  }, [data]);

  //console.log(data);
  //console.log(bookedDates);

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
      <div className=" font-libre text-lg md:text-3xl">
        <p>LETS GET YOU SITUATED FOR YOU STAY</p>
      </div>
      <form className=" flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center gap-2 font-libre">
          <p className="text-lg md:text-2xl">Arrival / Departure</p>
          <DatePickerWithRange
            disabledDates={bookedDates}
            onSelected={(selected) => {
              setDateRange(selected.range);
              setIsValid(selected.isValid);
            }}
          />
          {!isValid && <p>Is not valid</p>}
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
        <Button type="submit" className="w-full font-libre text-2xl">
          Book
        </Button>
      </form>
    </Container>
  );
}
