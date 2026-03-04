"use client"

import { Button } from "@/components/ui/button";
import { publishBusiness } from "@/lib/db/mutations/business";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function PublishButton({businessSlug, hasServices}:{businessSlug: string, hasServices: boolean}){
        const [isPending, startTransition] = useTransition();
        const router = useRouter()

        function handlePublish(){
            startTransition((async()=>{
                const res = await publishBusiness(businessSlug);

                if (res.success){
                    toast.success(res.message);
                    router.push('/explore')
                } else {
                    toast.error(res.message)
                }
            }))
        }
    return(
        <Button type="button" disabled={isPending || !hasServices} onClick={handlePublish}>{isPending ? "Publishing" : "Publish"}</Button>
    )
}