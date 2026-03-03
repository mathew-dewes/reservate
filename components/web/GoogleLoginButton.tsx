"use client";

import { signInWithGoogle } from "@/lib/auth-client";
import { Button } from "../ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";



export default function GoogleLoginButton({ size = "lg", hide }:
    { size?: string, hide: boolean }
) {

    const [isPending, setIsPending] = useState(false);

    async function signIn() {
        setIsPending(true)
            try {
                const res = await signInWithGoogle();
                if (res?.success) {
                    toast.success(res.message);
    
                } else {
                    setIsPending(false)
                    toast.error(res?.message || "Failed to sign in") 
                }
            } catch {
                toast.error('Something went wrong!')
            } finally {
              
            }

      
    }
    return (
        <Button disabled={isPending} className={cn(
            "transition-all duration-300 ease-out transform",
            hide
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none absolute"
        )} type="button" onClick={signIn} size={size == "lg" ? "lg" : "sm"} variant={"outline"}>
            <Image height={15} width={15} alt="Google logo" src={'/google.png'} />
        Login With Google {isPending && <Spinner/>}</Button>
    )
} 