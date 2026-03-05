import { Button } from "@/components/ui/button";
import UpcomingBookingCard from "./UpcomingBookingCard";
import BusinessesFilter from "./BusinessFilter";
import { getUpcomingUserBookings } from "@/lib/db/queries/bookings";
import { format } from "date-fns";

export default async function UpcomingBookings() {

    const bookings = await getUpcomingUserBookings();


    return (
        <div>
            <div className="flex items-center gap-5">
                <h2 className="text-lg font-bold">Upcoming Bookings</h2>
                <BusinessesFilter />
            </div>


            <div className="flex gap-10 mt-3">
                {bookings.map((booking) => {

                    const startDate = format(booking.startTime, "dd/MM/yy - hh:mm a")
                    return <UpcomingBookingCard
                        customerName={booking.customerName}
                        customerEmail={booking.customerEmail}
                        customerPhone={booking.customerPhone}
                        serviceName={booking.service.name}
                        startTime={startDate}
                        key={booking.id} />
                })}



            </div>
            <Button className="mt-10">View All Bookings</Button>

        </div>
    )
}