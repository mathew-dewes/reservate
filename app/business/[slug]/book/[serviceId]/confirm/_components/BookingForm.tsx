"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { createBooking } from "@/lib/db/mutations/booking";
import { bookingSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import z from "zod";
import { toast } from "sonner";

type Props = {
    customerName: string
    customerEmail: string
    businessSlug: string
    serviceId: string
}

export default function BookingForm({ customerName, customerEmail, businessSlug, serviceId }: Props) {
    const [isPending, startTransition] = useTransition();
    const params = useSearchParams();
    const router = useRouter()

    const bookingDate = params.get("date");
    const bookingTime = params.get("time");





    const form = useForm({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            customerName,
            customerEmail,
            customerPhone: undefined
        
   


        }
    });

    function onSubmit(values: z.infer<typeof bookingSchema>) {
        if (!bookingDate || !bookingTime) return;



        startTransition((async () => {
            const res = await createBooking(values, businessSlug, serviceId, bookingDate, bookingTime);

            if (res?.success) {
                toast.success(res.message);
                router.push('/dashboard')
            }
        }))


    }
    return <Card className="w-full sm:max-w-md">
        <CardHeader>
            <CardTitle>Create Booking</CardTitle>
            <CardDescription>
                Fill out the required fields to place booking
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form id="bookingForm" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        control={form.control}
                        name="customerName"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>
                                    Full name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter full name"
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
                        name="customerEmail"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>
                                    Email
                                </FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter email address"
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
                        name="customerPhone"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>
                                    Phone number
                                </FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter phone number"
                                    autoComplete="off"
                                    type="tell"
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
        <CardFooter>
            <Field orientation={"horizontal"}>
                <Button form="bookingForm" type="submit">{isPending ? "Submitting" : "Submit"}</Button>

            </Field>
        </CardFooter>
    </Card>
}