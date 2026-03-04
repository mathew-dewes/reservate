"use client"

import { buttonVariants } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {  getAvailableTimes, TIME_OPTIONS } from "@/lib/db/helpers";
import { format } from "date-fns";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TZDate } from "@date-fns/tz";

type Props = {
    slug: string
    serviceId: string
    availability: {
    daysOfWeek: number;
    startTime: string;
    endTime: string;
}[];


}

export default function TimeSlots({slug, serviceId, availability}:Props){

const searchParams = useSearchParams();
const now = new Date();
const formatted = format(new Date(now), "dd-MM-yyyy");
const queryDate = searchParams.get("date") ?? formatted; 

if (!queryDate) return null;

const [day, month, year] = queryDate.split("-").map(Number);
const selectedDate = new TZDate(year, month - 1, day, "Pacific/Auckland");


const selectedDay = selectedDate.getDay();

const todaysAvailability = availability.filter(
  item => item.daysOfWeek === selectedDay
);





const availableSlots = getAvailableTimes(
  selectedDate,
  todaysAvailability, 
  TIME_OPTIONS
);





    
    return (
        <div className="grid grid-cols-6 gap-5 mt-10">
            {availableSlots.map((time)=>{
                return <Card key={time} className="w-full max-w-50">
                <CardHeader>
                    <CardTitle className="text-center">{time}</CardTitle>
    
                    <CardFooter>
                        <Link className={buttonVariants({className: "w-full"})} href={`/business/${slug}/book/${serviceId}/confirm?time=${time}&date=${selectedDate}`}>Book</Link>
                 
            
            
                    </CardFooter>
                </CardHeader>
            </Card>
            })}
        
          
  
        </div>
    )
}