"use server";

import z from "zod";
import { getUserId } from "../session/user";
import { businessSchema } from "@/lib/schemas";
import prisma from "@/lib/config/prisma";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";



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
            },
            select:{
                id:true,
                name: true
            }
        });

        revalidatePath('/explore');

        return {success: true, message: `${business.name} has been added`, businessId:business.id}
        
    } catch (error) {

        console.error('Create business error', error);

        return {success: false, message: "There was an error"}
        
    }


    

    
};

export async function updateBusinessImage(businessId: string, imageUrl: string){
    const userId = await getUserId();
    try {
        await prisma.business.update({
            where:{
                id: businessId, userId
            },
            data:{
                logoUrl: imageUrl
            }
        });

        return {success: true}
    } catch (error) {
        console.log(error);
        
           return {success: false}
    }
}

export async function deleteBusiness(businessId: string){
    const userId = await getUserId();

    try {
        const business = await prisma.business.delete({
            where:{userId, id: businessId},
            select:{
                name: true
            }
        });

        const folder = businessId;
        const {data: files, error: listError} = await supabaseAdmin.storage.from('business-images').list(folder);

        if (listError){
            console.error('Error listing files:', listError.message)
        };

        if (files && files.length > 0){
            const paths = files.map(file => `${folder}/${file.name}`);
            const {error: removeError} = await supabaseAdmin.storage.from('business-images').remove(paths);

            if (removeError) console.error("Error deleting files:", removeError.message)
        }

        

        revalidatePath('/explore');
        return {success: true, message: `${business.name} was deleted`}
    } catch (error) {
        console.log('Delete failed:', error);
        return {success: false, message: 'Delete failed'}
        
    }
}