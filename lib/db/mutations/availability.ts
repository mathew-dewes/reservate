"use server";

import prisma from "@/lib/config/prisma";



export async function upsertAvailability(businessId: string, values: {
    days:{open: boolean, startTime: string, endTime: string}[]
}) {

    console.log(values);
    

    const days = values.days;



    try {

        for (const dayNumber in days) {
            const day = days[dayNumber]
            if (day.open) {
                await prisma.availability.upsert({
                    where: {
                        businessId_daysOfWeek: {
                            businessId,
                            daysOfWeek: parseInt(dayNumber),
                        },
                    },
                    update: {
                        startTime: day.startTime,
                        endTime: day.endTime,
                    },
                    create: {
                        businessId,
                        daysOfWeek: parseInt(dayNumber),
                        startTime: day.startTime,
                        endTime: day.endTime,
                    },
                })

            } else {
                    await prisma.availability.deleteMany({
          where: {
            businessId,
            daysOfWeek: parseInt(dayNumber),
          },
        });
            }



        };

        return { success: true, message: "Availability has been updated" }

    } catch (error) {
        console.log('There was an error updating business availability:', error);

        return { success: false, message: "Availability failed to update" }

    }


}