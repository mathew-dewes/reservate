"use client";

import { Button } from "@/components/ui/button";
import { removeService } from "@/lib/db/mutations/service";
import { useTransition } from "react";
import { toast } from "sonner";

export default function RemoveServiceButton({serviceId, slug}:{serviceId: string, slug: string}){
        const [isPending, startTransition] = useTransition()

        function handleDelete(){
            startTransition((async()=>{
                const res = await removeService(serviceId, slug);
                     if (res.success){
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
            }))
        };

            return <Button disabled={isPending} onClick={handleDelete}>{isPending ? "Removing" : "Remove Service"}</Button>
}