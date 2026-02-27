import { Button } from "@/components/ui/button";
import UpcomingBookingCard from "./UpcomingBookingCard";
import BusinessesFilter from "./BusinessFilter";

export default function UpcomingBookings(){
    return (
        <div>
    <div className="flex items-center gap-5">
<h2 className="text-lg font-bold">Upcoming Bookings</h2>
     <BusinessesFilter/>
            </div>
            
            
            <div className="flex gap-10 mt-3">
<UpcomingBookingCard/>
<UpcomingBookingCard/>
<UpcomingBookingCard/>
<UpcomingBookingCard/>

            </div>
            <Button className="mt-10">View All Bookings</Button>
           
        </div>
    )
}