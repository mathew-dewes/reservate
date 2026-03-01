"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { businessSchema } from "@/lib/schemas";

import { createBusiness, updateBusinessImage } from "@/lib/db/mutations/business"
import { useState, useTransition, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { uploadImage } from "@/lib/db/mutations/image"





export default function CreateBusinessForm() {

    const [isPending, startTransition] = useTransition();
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const router = useRouter();


    const form = useForm({
        resolver: zodResolver(businessSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            description:""
        }
    });


    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (files && files.length > 0) {
            setImage(files[0])
        }

    };



    function onSubmit(values: z.infer<typeof businessSchema>) {
        startTransition(async () => {

            const res = await createBusiness(values);


            const businessId = res.businessId;
            const slug = res.slug

            if (image && businessId) {
                setUploading(true);

                const imageUrl = await uploadImage(image, businessId);

                if (imageUrl) {
                    await updateBusinessImage(businessId, imageUrl)
                }

                setUploading(false);
            }
            if (res.success) {

                toast.success(res.message);
                router.push(`/business/${slug}`)
            } else {
                toast.error(res.message)
            }



        })
    };







    return <Card className="w-full sm:max-w-md">
        <CardHeader>
            <CardTitle>Create Business</CardTitle>
            <CardDescription>
                Fill out the required fields to advertise your business
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        control={form.control}
                        name="name"

                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    Business name:
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-title"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Business name"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="email"

                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    Email:
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-title"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Business name"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="phone"

                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    Phone:
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-title"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Business name"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="description"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-description">
                                    Description:
                                </FieldLabel>
                                <InputGroup>
                                    <InputGroupTextarea
                                        {...field}
                                        id="form-rhf-demo-description"
                                        placeholder="I'm having an issue with the login button on mobile."
                                        rows={6}
                                        className="min-h-24 resize-none"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    <InputGroupAddon align="block-end">
                                        <InputGroupText className="tabular-nums">
                                            {field.value.length}/100 characters
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                <FieldDescription>
                                    Include steps to reproduce, expected behavior, and what
                                    actually happened.
                                </FieldDescription>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>

                        )}
                    />

                    <Field>
                        <FieldLabel htmlFor="picture">Image - Optional</FieldLabel>
                        <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} />
                        <FieldDescription>Select a picture to upload.</FieldDescription>
                    </Field>
                    
                </FieldGroup>
            </form>
        </CardContent>
        <CardFooter>
            <Field orientation="horizontal">
                <Button onClick={() => form.reset()} type="button" variant="outline">
                    Reset
                </Button>
                <Button type="submit" form="form-rhf-demo">
                    {isPending ? "Submitting" : "Submit"}
                </Button>
                {uploading && <p>Uploading...</p>}
            </Field>
        </CardFooter>
    </Card>
}