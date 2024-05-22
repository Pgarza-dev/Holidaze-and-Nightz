import Image from "next/image";
import { IoMdStar } from "react-icons/io";

const DisplayUserBookings = ({ userBookings }: { userBookings: any[] }) => {
  return (
    <div className="flex w-full flex-col gap-1 rounded-xl bg-customBlack p-1">
      {userBookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-customBlackWhite border-2-customBlack flex h-full w-full cursor-pointer flex-row justify-evenly rounded-lg bg-customBlack p-4 text-customWhite transition-colors duration-300 hover:bg-customWhite hover:text-customBlack hover:shadow-lg "
        >
          <div>
            <Image
              width={150}
              height={150}
              src={booking?.venue.media[0].url}
              alt={booking?.venue.media.alt}
            />
          </div>
          <div>
            <h2>{booking?.venue.name}</h2>
            <p>Price per night: ${booking?.venue.price}</p>
            <p>Guests: {booking?.venue.maxGuests}</p>
            <p>Booked from: {booking?.checkIn}</p>
            <p>Booked to: {booking?.checkOut}</p>
            <p className="inline-flex items-center">
              {booking?.venue.rating > 0 ? (
                Array.from({ length: booking.venue.rating }, (_, index) => (
                  <IoMdStar className="text-yellow-500" key={index} />
                ))
              ) : (
                <p>Not rated yet</p>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayUserBookings;
