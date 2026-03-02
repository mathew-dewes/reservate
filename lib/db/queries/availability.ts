"use server";

import prisma from "@/lib/config/prisma";

export async function getBusinessAvailability(businessId: string){

    const availability = await prisma.availability.findMany({
        where:{businessId},
        select:{
            daysOfWeek: true,
            startTime: true,
            endTime: true
        }
    });

    return availability;

}