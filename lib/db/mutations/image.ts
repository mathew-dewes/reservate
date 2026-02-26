import { supabaseAdmin } from "@/lib/supabase-admin";



export async function uploadImage(file: File): Promise<string | null> {

        const filePath = `${file.name}-${Date.now()}`
        const { error } = await supabaseAdmin.storage.from("test").upload(filePath, file);

        if (error) {
            console.error("Error uploading image:", error.message);
            return null;
        }

        const { data } = await supabaseAdmin.storage.from('test').getPublicUrl(filePath)

        return data.publicUrl
    }