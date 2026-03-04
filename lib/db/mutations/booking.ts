"use server";

import prisma from "@/lib/config/prisma";
import { bookingSchema } from "@/lib/schemas";
import z from "zod";
import { getUserId } from "../session/user";


export async function createBooking(
    values: z.infer<typeof bookingSchema>,
    businessSlug: string,
    serviceId: string,
    date: string | null,
    time: string | null) {

    try {

        const userId = await getUserId();
        const parsed = bookingSchema.safeParse(values);

        if (!date || !time) {
            throw new Error("Date or time missing");
        }

        const [day, month, year] = date.split("-").map(Number);
        const [hours, minutes] = time.split(":").map(Number);
        const startTime = new Date(year, month - 1, day, hours, minutes, 0);

        // Example: 30-minute duration
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + 30);

        if (!parsed.success) {
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        };

        if (!date || !time) {
            throw new Error('Validation failed');
        }

        await prisma.bookings.create({
            data: {
                customerId: userId,
                businessSlug,
                customerEmail: parsed.data.customerEmail,
                customerName: parsed.data.customerName,
                customerPhone: parsed.data.customerPhone ?? "",
                serviceId,
                startTime,
                endTime,
                status: "PENDING",   // default
                source: "ONLINE",    // default




            }
        })
        
        return {success: true, message: "Success"}

    } catch (error) {

        console.log(error);


    }

}