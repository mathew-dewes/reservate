"use server";

import prisma from "@/lib/config/prisma";


export async function getAllBusinesses(){
    // Get all business for the explore page
    const businesses = await prisma.business.findMany();
    return businesses;
};

export async function getBusiness(businessSlug: string){
    
    const business = await prisma.business.findUnique({
        where:{
            slug: businessSlug
        }
    });

    return business;
};


export async function getUserBusinesses(userId:string){

    const businesses = await prisma.business.findMany({
        where:{userId}
    });

    return businesses;
}