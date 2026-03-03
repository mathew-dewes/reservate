"use server";

import prisma from "@/lib/config/prisma";
import { serviceSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import z from "zod";
import { getUserId } from "../session/user";

export async function addService(values: z.infer<typeof serviceSchema>, businessId: string, slug: string){



    const parsed = serviceSchema.safeParse(values);
    const userId = await getUserId()

    try {
             if (!parsed.success){
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        }

        const service = await prisma.service.create({
            data:{
                businessId,
                name: parsed.data.name,
                description: parsed.data.description,
                price: parsed.data.price,
                userId,
                duration: parsed.data.duration
            }
        });

        revalidatePath(`/business/${slug}/setup`)

    
 

        return {success: true, message: service.name + " has been added to services"}

    } catch (error) {
        
        console.log('There was an error creating service:', error);
        return {success: false, message: "There was an error creating service"}
        
        
    }
 

    

};

export async function removeService(serviceId: string, slug: string){
    const userId = await getUserId();

    try {
           const service = await prisma.service.delete({
        where:{
            id: serviceId, userId

        },
        select: {name: true}
    });

     revalidatePath(`/business/${slug}/setup`);

     return {success: true, message: service.name + " was removed"}
    } catch (error) {
        console.log("There was an error removing the service:", error);

        return {success: false, message: "There was an error removing the service"}
        
    }
  
}