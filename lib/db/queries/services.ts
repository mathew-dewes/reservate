"use server";

import prisma from "@/lib/config/prisma";

export async function getServices(businessId: string){
    const services = await prisma.service.findMany({
        where:{
            businessId
                },
                select:{
                    name: true,
                    description:true,
                    price: true,
                    id: true,
                    duration:true
                }
    })

    return services
}