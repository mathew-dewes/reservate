"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { addService } from "@/lib/db/mutations/service";
import { serviceSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function ServiceForm(){
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(serviceSchema),
        defaultValues:{
            name: "",
            description: "",
            price: ""
        }
    });

    function onSubmit(values: z.infer<typeof serviceSchema>){
        startTransition(async()=>{

            await addService(values)
            
        })
    }

    return <Card className="w-full sm:max-w-md">
             <CardHeader>
            <CardTitle>Add Service</CardTitle>
                   <CardDescription>
                Fill out the required fields to link a service to your business
            </CardDescription>
                    </CardHeader>
     
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                </FieldGroup>
                </form>

            </CardContent>

    </Card>

}