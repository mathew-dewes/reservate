import { Separator } from "@/components/ui/separator";
import MyBusinesses from "./_components/MyBusinesses";
import UpcomingBookings from "./_components/UpcomingBookings";

export default function page(){
    return (
        <div>
            <p>Dashboard:</p>
             <div className="flex flex-col gap-5 mt-5">
            <MyBusinesses/>
            <Separator/>
            <UpcomingBookings/>
              
            </div>
      
        </div>
    )
}