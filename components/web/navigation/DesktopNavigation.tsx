"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import { usePathname, useRouter } from "next/navigation";
import { navLinks } from "@/lib/constants";
import { authClient, signInWithGoogle } from "@/lib/auth-client";
import { toast } from "sonner";

const { useSession } = authClient;

export default function DesktopNavigation(){

      const pathname = usePathname();
      const router = useRouter();

        const { data: session, refetch} = useSession();

      function isActive(path: string){
        return pathname == path;

      };


 
    return <ul className="flex gap-5 items-center font-medium">
        {navLinks.map((link, key)=>{
            return    <Link key={key} className={cn(
                    buttonVariants({ variant: "ghost", size: "lg", className: `${isActive(link.href) ? 'bg-primary text-white pointer-events-none' : ''}` }))} href={link.href}>{link.name}</Link>
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


                                  <Button hidden={!!session} type="button"  onClick={signInWithGoogle}>Google</Button>

                <ThemeToggle />



            </ul>
}