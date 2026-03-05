"use client";

import { Button } from "@/components/ui/button";
import { deleteBusiness } from "@/lib/db/mutations/business";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { toast } from "sonner";

export default function DeleteBusinessButton({businessSlug}:{businessSlug: string}){
    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    function handleDelete(){
        startTransition(async()=>{
            const res = await deleteBusiness(businessSlug);

            if (res.success){
                toast.success(res.message);
                router.push('/dashboard')
            } else {
                toast.error(res.message)
            }
        })
    }
return (
    <Button disabled={isPending} onClick={handleDelete}>{isPending ? "Deleting" : "Delete"}</Button>
)
}