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
};

export async function getServiceNames(slug: string){
    const services = await prisma.service.findMany({
        where:{
            business:{
                slug
            }
        },
        select:{
            name:true,
            id:true
        }
    });

    return services;

};

export async function getServiceName(serviceId: string){
    const service = await prisma.service.findUnique({
        where:{id: serviceId}
    });

    return service?.name
}

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