import BookingForm from "@/components/forms/BookingForm";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

interface BookingProps {
  params: {
    venuesId?: string;
  };
}

function Booking({ params: { venuesId } }: BookingProps) {
  const accessToken = cookies().get("accessToken")?.value;

  if (!venuesId) {
    return notFound();
  }

  if (!accessToken) {
    return redirect("/login");
  }

  console.log(venuesId);

  return <BookingForm venuesId={venuesId} accessToken={accessToken} />;
}

export default Booking;
