"use server";

import prisma from "@/lib/config/prisma";


export async function getAllBusinesses(){
    // Get all business for the explore page
    const businesses = await prisma.business.findMany({
        where:{
            publish: true
        }
    });
    return businesses;
};

export async function getBusiness(businessSlug: string){
    
    const business = await prisma.business.findUnique({
        where:{
            slug: businessSlug,
      
        },
        select:{
            email:true,
            imageUrl: true,
            name: true,
            phone: true,
            description: true,
            userId:true,
            publish: true,
            id: true
        }
    });

    return business;
};

export async function getBusinessName(businessSlug: string){
    
    const business = await prisma.business.findUnique({
        where:{
            slug: businessSlug,
      
        },
        select:{
        
            name: true,
           
        }
    });

    return business;
};



export async function getBusinessDetails(businessSlug: string){
        const business = await prisma.business.findUnique({
        where:{
            slug: businessSlug,
      
        },
        select:{
            email:true,
            imageUrl: true,
            name: true,
            phone: true,
            description: true,
            id:true,
            _count:{
                select:{
                    services: true
                }
            }
  
        }
    });

    return business;
}


export async function getUserBusinesses(userId:string){

    const businesses = await prisma.business.findMany({
        where:{userId},
        select:{
            publish:true,
            id: true,
            name: true,
            imageUrl: true,
            slug: true
        },
        orderBy:{
            publish: "asc"
        }
    });

    return businesses;
}