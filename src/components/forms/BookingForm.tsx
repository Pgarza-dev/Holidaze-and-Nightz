"use client";
import Container from "@/components/Container";
import { DatePickerWithRange } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import useFetch from "@/lib/hooks/data";
import { API_ALL_BOOKINGS, API_VENUES } from "@/shared/ApiEndPoints";
import { addDays } from "date-fns";
import React from "react";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import { bookingFormSchema } from "@/app/forms/bookingFormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { date, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Venue } from "@/shared/types/venue";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

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
  const { data, isLoading, isError } = useFetch(
    API_VENUES + `/${venuesId}?_bookings=true`,
  );
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <span className="loader "></span>
        <span>Loading</span>
      </div>
    );
  }

  if (isError) {
    return <span>Oops, something is wrong!</span>;
  }
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      adults: "",
      children: "",
    },
  });

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

  function onSubmit(values: z.infer<typeof bookingFormSchema>) {
    if (!dateRange?.from || !dateRange?.to) {
      toast({
        title: "Oops! You forgot to select a date.",
        description: "Please select a date range",
        duration: 6000,
        variant: "destructive",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      return;
    }
    const transformedValues = {
      dateFrom: dateRange.from.toISOString(),
      dateTo: dateRange.to.toISOString(),
      guests: Number(values.adults) + Number(values.children),
      venueId: venuesId,
    };
    handleBooking(transformedValues);
    router.push(`/profile`);
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

  return (
    <>
      <div className="flex flex-row  gap-2 p-2 text-xs  dark:text-customWhite dark:text-opacity-50">
        <Link
          href="/"
          className=" justify-start hover:text-customWhite hover:text-opacity-100 hover:underline hover:underline-offset-2"
        >
          Home &gt;
        </Link>
        <Link
          href="/venues"
          className="justify-start hover:text-customWhite hover:text-opacity-100  hover:underline hover:underline-offset-2"
        >
          All Venues &gt;
        </Link>
        <Link
          href={`/venues/${venuesId}`}
          className="justify-start hover:text-customWhite hover:text-opacity-100 hover:underline hover:underline-offset-2"
        >
          Previous Venue &gt;
        </Link>
        <Link
          href="/profile"
          className="justify-start hover:text-customWhite hover:text-opacity-100 hover:underline hover:underline-offset-2"
        >
          Profile &gt;
        </Link>
      </div>
      <Container className="flex flex-col items-center justify-center gap-6 align-middle">
        <div className="relative flex flex-col items-center justify-center p-10 font-bodoni">
          <h1 className="not-sr-only text-5xl uppercase text-customBlack text-opacity-10 dark:text-customWhite dark:opacity-20 md:text-7xl">
            Booking
          </h1>
          <h2 className="absolute text-2xl uppercase text-customBlack dark:text-customWhite md:text-3xl lg:text-5xl">
            Booking
          </h2>
        </div>
        <div className=" font-libre text-lg md:text-3xl">
          <p>LETS GET YOU SITUATED FOR YOU STAY</p>
        </div>

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
                <p className="rounded-md border-2 border-red-500 bg-red-500 p-1 text-xl text-customWhite">
                  Oops! One or more of your selected days is already fully
                  booked. Please select another. 😊
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
                      className="h-10 w-10 rounded-md border-2 border-none bg-background ps-2 text-center text-lg text-customBlack dark:text-customWhite md:text-2xl"
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
                  <FormLabel className="text-lg md:text-2xl">
                    Children
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-10 w-10 rounded-md border-2 border-none bg-background ps-2 text-center text-lg text-customBlack dark:text-customWhite md:text-2xl"
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
      </Container>
    </>
  );
}
