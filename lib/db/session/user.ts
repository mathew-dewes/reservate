"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserId(){
    
        const session = await auth.api.getSession({
            headers: await headers()
        });
    
    const user = session?.user;

    if (!user) throw new Error('Unauthorized');
    return user.id
};

export async function authCheck(){
        const session =  await auth.api.getSession({
        headers: await headers()
    });
    if (!session){
        redirect('/');
        
    }
};

export async function getSession(){
    
        const session = await auth.api.getSession({
            headers: await headers()
        });
    
    return session
};