"use server";

import { bookingSchema } from "@/lib/schemas";
import z from "zod";

export async function createBooking(values: z.infer<typeof bookingSchema>){

    try {
             const parsed = bookingSchema.safeParse(values);

        if (!parsed.success){
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        };
    } catch (error) {

        console.log(error);
        
        
    }

}