"use client"

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {  getAvailableTimes, TIME_OPTIONS } from "@/lib/db/helpers";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { TZDate } from "@date-fns/tz";

type Props = {
    slug: string
    serviceId: string
    availability: {
    daysOfWeek: number;
    startTime: string;
    endTime: string;
}[],
bookings:{
    startTime: Date,
    endTime: Date
}[]


}

export default function TimeSlots({slug, serviceId, availability, bookings}:Props){

const searchParams = useSearchParams();
const router = useRouter()
const now = new Date();
const formatted = format(new Date(now), "dd-MM-yyyy");
const queryDate = searchParams.get("date") ?? formatted; 

if (!queryDate) return null;

const [day, month, year] = queryDate.split("-").map(Number);
const selectedDate = new TZDate(year, month - 1, day, "Pacific/Auckland");
const formattedDate = format(selectedDate, "dd-MM-yyyy");


const selectedDay = selectedDate.getDay();

const todaysAvailability = availability.filter(
  item => item.daysOfWeek === selectedDay
);


const availableSlots = getAvailableTimes(
  selectedDate,
  todaysAvailability, 
  TIME_OPTIONS,
  bookings,
  
  
);
    
    return (
        <div className="grid grid-cols-6 gap-5 mt-10">
            {availableSlots.map(({time, disabled})=>{
            const redirectURL = `/business/${slug}/book/${serviceId}/confirm?time=${time}&date=${formattedDate}`
                return <Card key={time} className="w-full max-w-50">
                <CardHeader>
                    <CardTitle className="text-center">{time}</CardTitle>
    
                    <CardFooter>
                        <Button onClick={()=> router.push(redirectURL)} variant={disabled ? "secondary" : "default"} disabled={disabled} className="w-full">{disabled ? "Unavailable" : "Book"}</Button>
         
           
                    </CardFooter>
                </CardHeader>
            </Card>
            })}
        
          
  
        </div>
    )
}