"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import { usePathname, useRouter } from "next/navigation";
import { navLinks } from "@/lib/constants";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import GoogleLoginButton from "../GoogleLoginButton";

const { useSession } = authClient;

export default function DesktopNavigation(){

      const pathname = usePathname();
      const router = useRouter();

        const { data: session, refetch} = useSession();

      function isActive(path: string){
        return pathname.startsWith(path);

      };



 
    return <ul className="flex gap-5 items-center font-medium">
        {navLinks.map((link, key)=>{
                  const show = session || link.href === "/explore"
            return (
            <li 
            key={key}
            className={cn(
            "transition-all duration-300 ease-out transform",
            show
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none absolute"
          )}>
          <Link 
            hidden={!session && link.href !== "/explore"} 
            
            className={cn(
                    buttonVariants({ variant: `${isActive(link.href) ? "default" : "ghost"}`, size: "lg"}))} 
                    href={link.href}>{link.name}</Link>
            </li>
  )
        })}
                        <Button hidden={!session} onClick={() => authClient.signOut({
                            fetchOptions: {
                                onSuccess: () => {
                                    toast.success("Logged out successfully!");
                                    refetch()
                                    router.refresh();
                                    router.push('/');

                                },
                                onError: (error) => {
                                    toast.error(error.error.message)
                                }
                            }
                        })}>Logout</Button>
                       <GoogleLoginButton hide={!session} size="lg"/>
               


                <ThemeToggle />



            </ul>
}