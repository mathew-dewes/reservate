"use server";

import prisma from "@/lib/config/prisma";
import { getUserId } from "../session/user";

export async function getUserBookings(){
    const userId = await getUserId();

    const bookings = await prisma.bookings.findMany({
        where:{
            customerId: userId,
            status: {
                not: "CANCELLED"
            }
        },
        select:{
            id:true,
            startTime:true,
            endTime:true,
            
            business:{
                select:{
                    name:true,
                    email:true,
                    phone:true,
                    user:{
                        select:{
                            name:true
                        }
                    }

                }
            },
            service:{
                select:{
                    name:true,
                    price:true,
                    description:true
                }
            }
        },
        orderBy:{
            createdAt:"asc"
        }
    });

    return bookings;
};


export async function getServiceBookingTimes(serviceId: string){
      const serviceBookings = await prisma.bookings.findMany({
        where:{
            serviceId,
            status: {
                not:"CANCELLED"
            }
        },
        select:{
            startTime:true,
            endTime: true
        }
    });

    return serviceBookings
}