"use server";

import prisma from "@/lib/config/prisma";



export async function upsertAvailability(businessSlug: string, values: {
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
                        businessSlug_daysOfWeek: {
                            businessSlug,
                            daysOfWeek: parseInt(dayNumber),
                        },
                    },
                    update: {
                        startTime: day.startTime,
                        endTime: day.endTime,
                    },
                    create: {
                        businessSlug,
                        daysOfWeek: parseInt(dayNumber),
                        startTime: day.startTime,
                        endTime: day.endTime,
                    },
                })

            } else {
                    await prisma.availability.deleteMany({
          where: {
            businessSlug,
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