'use client'
import React from 'react'
import Container from '@/components/Container'
import { DatePickerWithRange } from '@/components/DatePicker'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Booking() {
  return (
    <Container className="flex justify-center flex-col items-center">
      <div className="relative font-bodoni flex flex-col justify-center items-center p-10">
        <h1 className="text-5xl md:text-7xl not-sr-only uppercase text-customBlack text-opacity-10">
          Booking
        </h1>
        <h2 className="absolute text-2xl md:text-3xl text-customBlack dark:text-customWhite uppercase">
          Booking
        </h2>
      </div>
      <div className=" flex flex-col gap-4">
        <div className=" text-lg md:text-3xl font-libre">
          <p>LETS GET YOU SITUATED FOR YOU STAY</p>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center font-libre">
          <p className="text-lg md:text-2xl">Arrival / Departure</p>
          <DatePickerWithRange />
        </div>
        <div className="flex flex-row justify-center gap-6">
          <div className="flex flex-row items-center gap-2 font-libre border-b-2 border-customBlack">
            <p className="text-lg md:text-2xl uppercase">adults</p>
            <input
              type="number"
              className="w-10 h-10 border-2 text-lg md:text-2xl text-center rounded-md ps-2 bg-background text-customBlack border-none"
              placeholder="1"
            />
          </div>
          <div className="flex flex-row justify-center items-center gap-2 font-libre border-b-2 border-customBlack">
            <p className="text-lg uppercase md:text-2xl">children</p>
            <input
              type="number"
              className="w-10 h-10 border-2 text-lg md:text-2xl rounded-md text-center ps-2 bg-background text-customBlack border-none"
              placeholder="0 "
            />
          </div>
        </div>
        <Link href="/checkout">
          <Button className="w-full font-libre text-2xl">Book</Button>
        </Link>
      </div>
    </Container>
  )
}

export default Booking
