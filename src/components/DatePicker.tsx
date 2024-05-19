"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const isWithinRange = (date: Date, range: DateRange) => {
  if (range.from && range.to) {
    return date >= range.from && date <= range.to;
  }
  return false;
};

type DateSelected = {
  range?: DateRange;
  isValid: boolean;
};

type DatePickerWithRangeProps = React.HTMLAttributes<HTMLDivElement> & {
  disabledDates?: Date[];
  onSelected?: (selected: DateSelected) => void;
};

export function DatePickerWithRange({
  className,
  disabledDates,
  onSelected,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 0),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-center border-2 border-customBlack text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            disabled={disabledDates}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => {
              let isValid = true;
              if (disabledDates && range?.from && range?.to) {
                if (
                  disabledDates.some((disabledDate) =>
                    isWithinRange(disabledDate, range),
                  )
                ) {
                  isValid = false;
                }
              }
              setDate(range);
              if (onSelected) onSelected({ range, isValid });
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
