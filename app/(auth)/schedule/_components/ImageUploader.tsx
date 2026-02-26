"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/superbase-client";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

export default function ImageUploader() {

    const [image, setImage] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);


    async function uploadImage(file: File): Promise<string | null> {

        const filePath = `${file.name}-${Date.now()}`
        const { error } = await supabase.storage.from("test").upload(filePath, file);

        if (error) {
            console.error("Error uploading image:", error.message);
            return null;
        }

        const { data } = await supabase.storage.from('test').getPublicUrl(filePath)

        return data.publicUrl
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (files && files.length > 0) {
            setImage(files[0])
        }

    };

    async function handleSubmit() {

        if (!image) return;

        setUploading(true);
        const imageUrl = await uploadImage(image);
        console.log("Uploaded image URL:", imageUrl);

        setUploading(false);


    }
    return (
        <Card className="w-sm mt-10">
        <Image
        height={500} width={400}
        src="https://oxrtrrekmvslunhzycfr.supabase.co/storage/v1/object/public/test/Screenshot%202026-02-13%20155256.png-1771970696627"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 dark:brightness-40"
      />
            <CardHeader>
                <CardTitle>Upload an image</CardTitle>
            </CardHeader>
            <CardContent>
                <Field>
                    <FieldLabel htmlFor="picture">Picture</FieldLabel>
                    <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} />
                    <FieldDescription>Select a picture to upload.</FieldDescription>
                </Field>
                <Button onClick={handleSubmit}>{uploading ? "Uploading..." : "Upload"}</Button>
            </CardContent>

        </Card>
    )
}