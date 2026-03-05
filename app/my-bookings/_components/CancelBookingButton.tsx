"use client";

import { Button } from "@/components/ui/button";
import { cancelBooking } from "@/lib/db/mutations/booking";
import { useTransition } from "react";
import { toast } from "sonner";

export default function CancelBookingButton({bookingId}:{bookingId: string}){
        const [isPending, startTransition] = useTransition();
    

        function handleCancel(){
            startTransition((async()=>{
                const res = await cancelBooking(bookingId);

                if (res.success){
                    toast.success(res.message)
                } else {
                    toast.error(res.message)
                }
            })) 

        }
    return(
        <Button onClick={handleCancel}>{isPending ? "Cancelling" : "Cancel"}</Button>
    )
}