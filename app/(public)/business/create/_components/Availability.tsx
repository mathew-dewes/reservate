"use client"

import { Controller, useForm, useWatch } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DAYS, TIME_OPTIONS } from "@/lib/db/helpers"
import { zodResolver } from "@hookform/resolvers/zod"
import { availabilitySchema } from "@/lib/schemas"
import z from "zod"
import { upsertAvailability } from "@/lib/db/mutations/availability"
import { startTransition } from "react"
import { toast } from "sonner"
import { CircleAlert } from "lucide-react"



type Props = {
    businessId: string
    savedValues: {
        daysOfWeek: number
        startTime: string
        endTime: string
    }[]
};

function buildDays(savedValues: Props["savedValues"]) {
    const defaults = Array.from({ length: 7 }, (_, index) => ({
        daysOfWeek: index,
        open: false,
        startTime: "09:00",
        endTime: "17:00",
    }));

    savedValues.forEach((day) => {
        defaults[day.daysOfWeek] = {
            ...day,
            open: true,
        };
    });

    return defaults;
}



export default function Availability({ businessId, savedValues }: Props) {
    const form = useForm<z.infer<typeof availabilitySchema>>({
        resolver: zodResolver(availabilitySchema),
        defaultValues: {
            days: buildDays(savedValues)
        }
    });

    const daysValues = useWatch({
        control: form.control,
        name: "days",
    })

    function onSubmit(values: z.infer<typeof availabilitySchema>) {
        startTransition((async () => {

            const res = await upsertAvailability(businessId, values);

            if (res.success) {
                toast.success(res.message);
                 form.reset(values)
            } else {
                toast.error(res.message)
            }
        }))



    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Table className="w-1/2 bg-card border-foreground/10 border">
                <TableHeader>
                    <TableRow>
                        <TableHead>Work Days</TableHead>
                        <TableHead>OPEN</TableHead>
                        <TableHead>Start time</TableHead>
                        <TableHead>End time</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {DAYS.map((day) => {
                        const isEnabled = daysValues?.[day.value]?.open ?? false

                        return (
                            <TableRow key={day.value}>
                                <TableCell className="font-medium">
                                    {day.label}
                                </TableCell>

                                <TableCell>
                                    <Controller
                                        name={`days.${day.value}.open`}
                                        control={form.control} render={({ field }) => (
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        )}
                                    />

                                </TableCell>

                                <TableCell>
                                    <Controller
                                        control={form.control}
                                        name={`days.${day.value}.startTime`}
                                        render={({ field }) => {
                                            return <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                disabled={!isEnabled}
                                            >
                                                <SelectTrigger className="w-full max-w-48">
                                                    <SelectValue placeholder="Start time" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Start time</SelectLabel>
                                                        {TIME_OPTIONS.map((time) => (
                                                            <SelectItem key={time} value={time}>{time}</SelectItem>
                                                        ))}

                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        }} />

                                </TableCell>
                                <TableCell>
                                    <Controller
                                        control={form.control}
                                        name={`days.${day.value}.endTime`}
                                        render={({ field }) => {
                                            return <Select
                                                value={field.value}
                                                onValueChange={field.onChange}


                                                disabled={!isEnabled}
                                            >
                                                <SelectTrigger className="w-full max-w-48">
                                                    <SelectValue placeholder="Start time" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Start time</SelectLabel>
                                                        {TIME_OPTIONS.map((time) => (
                                                            <SelectItem key={time} value={time}>{time}</SelectItem>
                                                        ))}

                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        }} />

                                </TableCell>



                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
       
                <div className="flex gap-2 items-center mt-5">
    <Button type="submit" disabled={!form.formState.isDirty} >
                    Update
                </Button>
                     {form.formState.isDirty && (
                    <div className="flex items-center gap-1.5">
                    <CircleAlert size={20} />
                        <p className="text-sm text-yellow-500">
                            You have unsaved changes
                        </p>
                    </div>

                )}
                </div>
            
         

        </form>
    )
}