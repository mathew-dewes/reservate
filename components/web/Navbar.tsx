
import Link from "next/link"
import DesktopNavigation from "./navigation/DesktopNavigation"

export default function Navbar() {
    return (
        <div className="flex justify-between mt-10 items-center">
            <Link href={'/'}><h1 className="font-bold text-xl hover:text-primary">Reservate</h1></Link>
           

          <DesktopNavigation/>

        </div>
    )
}