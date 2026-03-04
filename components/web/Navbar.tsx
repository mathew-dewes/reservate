
import Link from "next/link"
import DesktopNavigation from "./navigation/DesktopNavigation"
import { UserAvatar } from "./UserAvatar"

export default function Navbar() {
    return (
        <div className="flex justify-between mt-10 items-center mb-5">
            <div className="flex items-center gap-3">
            <Link href={'/dashboard'}><h1 className="font-bold text-xl hover:text-primary">Reservate</h1></Link>
            <UserAvatar />
            </div>
           
         <DesktopNavigation/>

        </div>
    )
}