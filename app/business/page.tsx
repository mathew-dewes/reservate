import { Separator } from "@/components/ui/separator";
import MyBusinesses from "./_components/MyBusinesses";
import UpcomingBookings from "./_components/UpcomingBookings";




export default async function schedulePage(){

    
    return (
        <div>
   
            <div className="flex flex-col gap-5 mt-5">
            <MyBusinesses/>
            <Separator/>
            <UpcomingBookings/>
              
            </div>
      

        </div>
    )
}