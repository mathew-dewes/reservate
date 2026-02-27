"use client";

import { signInWithGoogle } from "@/lib/auth-client";
import { Button } from "../ui/button";
import Image from "next/image";

export default function GoogleLoginButton({size = "lg"}:
    { size?: string}
){
    return (
          <Button type="button" onClick={signInWithGoogle} size={size == "lg" ? "lg" : "sm"} variant={"outline"}>
      <Image height={15} width={15} alt="Google logo" src={'/google.png'}/>
      Login With Google</Button>
    )
} 