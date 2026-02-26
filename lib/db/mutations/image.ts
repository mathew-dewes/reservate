import { supabaseAdmin } from "@/lib/supabase-admin";
import { randomUUID } from "node:crypto";
import { authCheck } from "../session/user";



export async function uploadImage(file: File, businessId: string): Promise<string | null> {

    await authCheck()

        const fileName = `${randomUUID()}.webp`;
        const path = `${businessId}/${fileName}`
        const { error } = await supabaseAdmin.storage.from("business-images").upload(path, file);

        if (error) {
            console.error("Error uploading image:", error.message);
            return null;
        }

        const { data } = await supabaseAdmin.storage.from('business-images').getPublicUrl(path)

        return data.publicUrl
    }