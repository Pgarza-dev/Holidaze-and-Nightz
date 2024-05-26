import Image from "next/image";
import Link from "next/link";
import { IoMdStar } from "react-icons/io";

const DisplayUserBookings = ({ userBookings }: { userBookings: any[] }) => {
  return (
    <div className="flex w-full flex-col gap-1 rounded-xl bg-customBlack p-4">
      {userBookings.map((booking) => {
        const currentDate = new Date();
        const bookingDateFrom = new Date(booking?.dateFrom);
        const bookingDateTo = new Date(booking?.dateTo);
        const isExpired = currentDate > bookingDateTo;

        return (
          <Link href={`/venues/${booking.venue.id}`} key={booking.id}>
            <div
              key={booking.id}
              className={`flex h-full w-full cursor-pointer flex-row justify-evenly rounded-lg bg-customBlack p-2 text-customWhite transition-colors duration-300 hover:bg-customWhite hover:text-customBlack hover:shadow-lg ${
                isExpired ? "opacity-50 hover:opacity-100" : ""
              }`}
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
                <p>
                  Booked {new Date(booking?.dateFrom).toLocaleDateString()} /{" "}
                  {new Date(booking?.dateTo).toLocaleDateString()}
                </p>
                {isExpired ? (
                  <p className="font-semibold text-red-500">Expired</p>
                ) : (
                  <p className="inline-flex items-center">
                    {booking?.venue.rating > 0 ? (
                      Array.from(
                        { length: booking.venue.rating },
                        (_, index) => (
                          <IoMdStar className="text-yellow-500" key={index} />
                        ),
                      )
                    ) : (
                      <span className="italic">"Not rated yet"</span>
                    )}
                  </p>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default DisplayUserBookings;
