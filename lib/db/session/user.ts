"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getUserId(){
    
        const session = await auth.api.getSession({
            headers: await headers()
        });
    
    const user = session?.user;

    if (!user) throw new Error('Unauthorized');
    return user.id
};