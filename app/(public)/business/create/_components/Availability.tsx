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
import { TIME_OPTIONS } from "@/lib/db/helpers"
import { zodResolver } from "@hookform/resolvers/zod"
import { availabilitySchema } from "@/lib/schemas"
import z from "zod"
import { upsertAvailability } from "@/lib/db/mutations/availability"
import { startTransition } from "react"
import { toast } from "sonner"

const DAYS = [
    { label: "Sunday", value: 0 },
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
]



export default function Availability({businessId}:{businessId: string}) {
    const form = useForm<z.infer<typeof availabilitySchema>>({
        resolver: zodResolver(availabilitySchema),
        defaultValues: {
            days: DAYS.reduce((acc, day) => {
                acc[day.value] = {
                    open: day.value >= 1 && day.value <= 5,
                    startTime: "09:00",
                    endTime: "17:00",
                }
                return acc
            }, {} as Record<number, { open: boolean; startTime: string; endTime: string }>)
        }
    });

    const daysValues = useWatch({
  control: form.control,
  name: "days", 
})

    function onSubmit(values: z.infer<typeof availabilitySchema>) {
        startTransition((async()=>{
            const res = await upsertAvailability(businessId,values);

            if (res.success){
                toast.success(res.message)
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

            <Button type="submit" className="mt-5">
                Update
            </Button>
        </form>
    )
}