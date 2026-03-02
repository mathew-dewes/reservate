"use client";

import { Button } from "@/components/ui/button";
import { publishBusiness } from "@/lib/db/mutations/business";
import { useTransition } from "react";
import { toast } from "sonner";

export default function PublishButton({ slug }: { slug: string }) {
    const [isPending, startTransition] = useTransition();

    function publish() {
        startTransition((async () => {

            const res = await publishBusiness(slug);
            if (res.success) {
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }


        }))
    }

    return (
        <Button disabled={isPending} onClick={publish}>
            {isPending ? "Publshing..." : "Publish"}
        </Button>
    )
}