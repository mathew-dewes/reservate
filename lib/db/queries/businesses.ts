"use server";

import prisma from "@/lib/config/prisma";


export async function getAllBusinesses(){
    // Get all business for the explore page
    const businesses = await prisma.business.findMany();
    return businesses;
}