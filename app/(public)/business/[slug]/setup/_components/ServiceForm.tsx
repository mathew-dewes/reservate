"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { addService } from "@/lib/db/mutations/service";
import { serviceSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
export default function ServiceForm({ businessId, slug }: { businessId: string, slug: string }) {

    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            name: "",
            description: "",
            duration: 30
        }
    });

    function onSubmit(values: z.infer<typeof serviceSchema>) {
        startTransition(async () => {

            const res = await addService(values, businessId, slug);

            if (res.success) {
                toast.success(res.message);
                form.reset()
            } else {
                toast.error(res.message)
            }

        })
    }
    return (
        <div>
            <Card size="sm" className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Services</CardTitle>
                    <CardDescription>
                        This card uses the small size variant.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="w-1/2" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                control={form.control}
                                name="name"

                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            Service name:
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
                            <Controller
                                control={form.control}
                                name="price"


                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            Price (Optional):
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="number"
                                            onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
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
                                name={"duration"}
                                render={({ field }) => {
                                    return <Field>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            Service duration:
                                        </FieldLabel>
                                        <Select
                                            value={String(field.value)}
                                            onValueChange={(val) => field.onChange(Number(val))}
                                        >
                                            <SelectTrigger className="w-full max-w-48">
                                                <SelectValue placeholder="Service duration" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Service duration</SelectLabel>
                                                    {[30, 60, 90, 120, 150, 180].map((time) => (
                                                        <SelectItem key={time} value={String(time)}>{time + " mins"}</SelectItem>
                                                    ))}

                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                }} />
                        </FieldGroup>
                        <div className="mt-3">
                            {isPending ? <Button className="w-1/2" variant="secondary" disabled>
                                Downloading
                                <Spinner data-icon="inline-start" />
                            </Button> : <Button className="w-1/2">Submit</Button>}
                        </div>


                    </form>
                </CardContent>

            </Card>

        </div>
    )
}