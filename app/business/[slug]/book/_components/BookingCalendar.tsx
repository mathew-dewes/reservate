"use client"

import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns/format"
import { enNZ } from "date-fns/locale"
import { usePathname, useRouter, useSearchParams } from "next/navigation"



export default function BookingCalendar({availability}:{availability: {
    daysOfWeek: number;
    startTime: string;
    endTime: string;
}[]}) {
    const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams();

  const openDays = availability.map(d => d.daysOfWeek)

    function handleSelect(date: Date | undefined) {
    if (!date) return

    const params = new URLSearchParams(searchParams.toString())

    const formatted = format(date, "dd-MM-yyyy")

    params.set("date", formatted)

    router.replace(`${pathname}?${params.toString()}`, {scroll: false})
  }
  return <Calendar   disabled={(date) => {
    const today = new Date();
    today.setHours(0,0,0,0)

    const isPast = date < today
    const isClosed = !openDays.includes(date.getDay())

    return isPast || isClosed
  }} locale={enNZ} timeZone="Pacific/Auckland" mode="single" onSelect={handleSelect} className="rounded-lg border mx-auto" />
}
