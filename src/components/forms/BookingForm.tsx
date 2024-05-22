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
import { bookingFormSchema } from "@/app/forms/bookingFormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { date, z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Venue } from "@/shared/types/venue";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

type Booking = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
};

export default function BookingForm({
  venuesId,
  accessToken,
}: {
  venuesId: string;
  accessToken: string;
}) {
  const { toast } = useToast();
  const { data, isLoading, isError } = useFetch(
    API_VENUES + `/${venuesId}?_bookings=true`,
  );
  //console.log(data);
  // validated data schema here

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      adults: "",
      children: "",
    },
  });
  console.log(data);

  async function handleBooking(bookingData: {
    dateFrom: string;
    dateTo: string;
    guests: number;
    venueId: string;
  }) {
    try {
      const response = await fetch(API_ALL_BOOKINGS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": process.env.NEXT_PUBLIC_NOROFF_API_KEY || "",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Booking Successful",
          description: "Your Venue booked successfully!",
          duration: 3000,
          variant: "default",
          action: <ToastAction altText="Booking successful">Close</ToastAction>,
        });
        console.log("Success:", data);
      } else {
        toast({
          title: "Oops something went wrong!",
          description: "Please try again",
          duration: 3000,
          variant: "destructive",
          action: (
            <ToastAction altText="Booking unsuccessful">Close</ToastAction>
          ),
        });
        console.error("Failed:", data);
      }
    } catch (error) {
      console.error("Failed:", error);
    }
  }
  console.log(accessToken);

  const [adults, setAdults] = React.useState(1);
  const [children, setChildren] = React.useState(0);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  const [isValid, setIsValid] = React.useState(true);

  function onSubmit(values: z.infer<typeof bookingFormSchema>) {
    if (!dateRange?.from || !dateRange?.to) {
      alert("Please select a date range");
      return;
    }
    const transformedValues = {
      dateFrom: dateRange.from.toISOString(),
      dateTo: dateRange.to.toISOString(),
      guests: Number(values.adults) + Number(values.children), // Convert guests to number
      venueId: venuesId,
    };
    handleBooking(transformedValues);

    console.log(transformedValues);
  }

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
      <span className="text-red-500">
        {/* Maximum guest: {data?.data?.maxGuests} */}
      </span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-4"
        >
          <div className="flex flex-col items-center justify-center gap-2 font-libre">
            <p className="text-lg md:text-2xl">Arrival / Departure</p>
            <DatePickerWithRange
              disabledDates={bookedDates}
              onSelected={(selected) => {
                setDateRange(selected.range);
                setIsValid(selected.isValid);
              }}
            />
            {!isValid && (
              <p className="rounded-md border-2 border-red-500 p-1 text-xl text-red-500">
                Oops! One or more of your selected days is already fully booked.
                Please select another. 😊
              </p>
            )}
          </div>

          <FormField
            control={form.control}
            name="adults"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between gap-2 border-b-2 border-customBlack font-libre">
                <FormLabel className="text-lg md:text-2xl">Adults</FormLabel>
                <FormControl>
                  <Input
                    className="h-10 w-10 rounded-md border-2 border-none bg-background ps-2 text-center text-lg text-customBlack md:text-2xl"
                    placeholder="1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="children"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between gap-2 border-b-2 border-customBlack font-libre">
                <FormLabel className="text-lg md:text-2xl">Children</FormLabel>
                <FormControl>
                  <Input
                    className="h-10 w-10 rounded-md border-2 border-none bg-background ps-2 text-center text-lg text-customBlack md:text-2xl"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full font-libre text-2xl">
            Book
          </Button>
        </form>
      </Form>
      {/* 
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
      </Form> */}
    </Container>
  );
}
