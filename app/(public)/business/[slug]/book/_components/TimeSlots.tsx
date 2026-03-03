"use client"

import { buttonVariants } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {  getAvailableTimesForDay, TIME_OPTIONS } from "@/lib/db/helpers";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
    slug: string
    serviceId: string
    availability: {
    daysOfWeek: number;
    startTime: string;
    endTime: string;
}[]

}

export default function TimeSlots({slug, serviceId, availability}:Props){

  const searchParams = useSearchParams();

  const date = searchParams.get("date")

function getDayNumberFromSearchParams() {
  const dateParam = searchParams.get("date")
  if (!dateParam) return null

  const [day, month, year] = dateParam.split("-").map(Number)
  return new Date(year, month -1, day).getDay() 
}




const selectedDay = getDayNumberFromSearchParams();



    
    const times = getAvailableTimesForDay(
  selectedDay!,
  availability,
  TIME_OPTIONS
);

console.log(times);





    
    return (
        <div className="grid grid-cols-6 gap-5 mt-10">
            {times.map((time)=>{
                return <Card key={time} className="w-full max-w-50">
                <CardHeader>
                    <CardTitle className="text-center">{time}</CardTitle>
    
                    <CardFooter>
                        <Link className={buttonVariants({className: "w-full"})} href={`/business/${slug}/book/${serviceId}/confirm?time=${time}&date=${date}`}>Book</Link>
                 
            
            
                    </CardFooter>
                </CardHeader>
            </Card>
            })}
        
          
  
        </div>
    )
}