"use server";

import { serviceSchema } from "@/lib/schemas";
import z from "zod";

export async function addService(values: z.infer<typeof serviceSchema>){



    const parsed = serviceSchema.safeParse(values);
      if (!parsed.success){
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        }

    console.log(values);

    

}