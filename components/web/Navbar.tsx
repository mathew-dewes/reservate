
import DesktopNavigation from "./navigation/DesktopNavigation"

export default function Navbar() {
    return (
        <div className="flex justify-between mt-10 items-center">
            <h1 className="font-bold text-xl">Reservate</h1>

          <DesktopNavigation/>

        </div>
    )
}