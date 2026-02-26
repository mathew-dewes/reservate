"use server";

import z from "zod";
import { getUserId } from "../session/user";
import { businessSchema } from "@/lib/schemas";
import prisma from "@/lib/config/prisma";
import { revalidatePath } from "next/cache";


export async function createBusiness(values: z.infer<typeof businessSchema>){
    const userId = await getUserId();

    try {

        const parsed = businessSchema.safeParse(values);

        if (!parsed.success){
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        };

        const business = await prisma.business.create({
            data:{
                userId,
                name: parsed.data.name,
                email: parsed.data.email,
                logoUrl: "1233",
                phone: parsed.data.phone,
                slug: parsed.data.name
            }
        });

        revalidatePath('/explore');

        return {success: true, message: `${business.name} has been added`}
        
    } catch (error) {

        console.error('Create business error', error);

        return {success: false, message: "There was an error"}
        
    }


    

    
}