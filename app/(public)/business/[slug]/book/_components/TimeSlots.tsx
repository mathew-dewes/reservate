"use client"

import { buttonVariants } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {  getAvailableTimes, TIME_OPTIONS } from "@/lib/db/helpers";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

const dateParam = searchParams.get("date"); // "04-03-2026"

if (!dateParam) return null;

// Split the string and build a Date
const [day, month, year] = dateParam.split("-").map(Number);
const selectedDate = new Date(year, month - 1, day); // month is 0-indexed
  


const availableSlots = getAvailableTimes(
  selectedDate,// user-selected date
  [{ startTime: "09:00", endTime: "17:00" }], // business hours for that day
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