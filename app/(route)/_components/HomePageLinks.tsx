import { buttonVariants } from "@/components/ui/button";
import GoogleLoginButton from "@/components/web/GoogleLoginButton";
import { getSession } from "@/lib/db/session/user";
import Link from "next/link";


export default async function HomePageLinks(){

    const session = await getSession();


    return (
 
            
          <div className="mt-20 flex justify-center gap-5">
            {!session && <GoogleLoginButton/>}
            <Link className={buttonVariants({size: "lg"})} href={'/business'}>View Schedule</Link>
            <Link className={buttonVariants({size: "lg"})} href={'/bookings'}>Manage Bookings</Link>
            <Link className={buttonVariants({size: "lg"})} href={'/explore'}>Explore</Link>

 
  </div>
   

    )
}