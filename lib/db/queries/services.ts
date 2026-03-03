"use server";

import prisma from "@/lib/config/prisma";

export async function getServices(slug: string){
    const services = await prisma.service.findMany({
        where:{
 
            business:{
                slug
            }
                },
                select:{
                    name: true,
                    description:true,
                    price: true,
                    id: true,
                    duration:true
                }
    });


const serializedServices = services.map(s => ({
  ...s,
  price: s.price.toNumber()
}));

    return serializedServices
};



export async function getService(serviceId: string){
    const service = await prisma.service.findUnique({
        where:{
            id: serviceId
        },
        select:{
            name:true,
            id: true
        }
    });

    return service
}