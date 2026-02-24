"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constants";

export default function DesktopNavigation(){

      const pathname = usePathname();

      function isActive(path: string){
        return pathname == path;

      }
    return <ul className="flex gap-5 items-center font-medium">
        {navLinks.map((link, key)=>{
            return    <Link key={key} className={cn(
                    buttonVariants({ variant: "ghost", size: "lg", className: `${isActive(link.href) ? 'bg-primary text-white pointer-events-none' : ''}` }))} href={link.href}>{link.name}</Link>
        })}

                <ThemeToggle />



            </ul>
}