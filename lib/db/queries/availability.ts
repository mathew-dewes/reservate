"use server";

import prisma from "@/lib/config/prisma";

export async function getBusinessAvailability(slug: string){

    const availability = await prisma.availability.findMany({
        where:{business:{
            slug
        }},
        select:{
            daysOfWeek: true,
            startTime: true,
            endTime: true
        }
    });

    return availability;

}