import SubmitBooking from "@/components/forms/SubmitBookings";
import { notFound } from "next/navigation";

interface BookingProps {
  params: {
    venuesId?: string;
  };
}

function Booking({ params: { venuesId } }: BookingProps) {
  if (!venuesId) {
    return notFound();
  }
  console.log(venuesId);

  return <SubmitBooking venuesId={venuesId} />;
}

export default Booking;
