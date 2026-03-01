
import { buttonVariants } from "@/components/ui/button";
import GoogleLoginButton from "@/components/web/GoogleLoginButton";
import { getSession } from "@/lib/db/session/user";
import Link from "next/link";


export default async function Page() {

    const session = await getSession();
    
return(

<div>
  <div className="text-center mt-10">
  <h1>Reservate</h1>
  <p className="mt-1">In order to make booking you must sign with google below</p>
  </div>

          <div className="mt-20 flex justify-center gap-5">
            {!session && <GoogleLoginButton/>}
            {session && <Link className={buttonVariants({size: "lg"})} href={'/business'}>View Schedule</Link>}
            {session && <Link className={buttonVariants({size: "lg"})} href={'/bookings'}>Manage Bookings</Link> }
            <Link className={buttonVariants({size: "lg"})} href={'/explore'}>Explore</Link>

 
  </div>

</div>
)

}