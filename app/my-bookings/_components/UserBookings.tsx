
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { decimalToMoney } from "@/lib/db/helpers";
import { getUserBookings } from "@/lib/db/queries/bookings";
import { format } from "date-fns";
import CancelBookingButton from "./CancelBookingButton";

export default async function UserBookings() {

    const userBooking = await getUserBookings();


    console.log(userBooking);

    if (userBooking.length == 0){
        return <p>You have no bookings</p>
    }

    return (
        <div className="space-y-3">
            {userBooking.map((booking) => {

                const startDate = format(booking.startTime, "dd/MM/yy - hh:mm a")
                return <Card key={booking.id} size="sm" className="w-full max-w-lg">
                    <CardHeader>
                        <CardTitle>{booking.service.name}</CardTitle>
                        <CardDescription>
                       {booking.service.description}
                        </CardDescription>

                    </CardHeader>
                    <CardContent>
                         <p className="font-semibold">{booking.business.name}</p>
                            <div className="mt-1">
                                <p>Contact: {booking.business.user.name}</p>
                                <p>Email: {booking.business.email}</p>
                                {booking.business.phone && <p>Phone: {booking.business.phone}</p>}




                            </div>

                        <div className="mt-3">
                            <p>Date: {startDate}</p>
                            <p>Cost: {decimalToMoney(booking.service.price)}</p>


                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex gap-1">
                            <CancelBookingButton bookingId={booking.id}/>
                        </div>

                    </CardFooter>
                </Card>
            })}

        </div>
    )
}