import Link from "next/link"

export default function Navbar(){
    return (
        <div className="flex justify-between mt-10 items-center">
            <h1 className="font-bold text-xl">Reservate</h1>

            <ul className="flex gap-10 items-center">
                <Link href={'/schedule'}>Schedule</Link>
                <Link href={'/explore'}>Explore</Link>
                <Link href={'/bookings'}>Bookings</Link>
                <Link href={'/account'}>Account</Link>
  
            </ul>

        </div>
    )
}