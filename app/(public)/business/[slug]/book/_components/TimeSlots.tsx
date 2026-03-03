"use client"

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {  getAvailableTimesForDay, TIME_OPTIONS } from "@/lib/db/helpers";
import { useSearchParams } from "next/navigation";

export default function TimeSlots({ availability}:{slug: string, availability: {
    daysOfWeek: number;
    startTime: string;
    endTime: string;
}[]}){

  const searchParams = useSearchParams()

  function getDayNumberFromSearchParams() {
  const dateParam = searchParams.get("date")
  if (!dateParam) return null

  const [year, month, day] = dateParam.split("-").map(Number)
  const date = new Date(day, month - 1, year)

  return date.getDay()
};




const selectedDay = getDayNumberFromSearchParams();

    
    const times = getAvailableTimesForDay(
  selectedDay!,
  availability,
  TIME_OPTIONS
);


    
    return (
        <div className="grid grid-cols-6 gap-5 mt-10">
            {times.map((time)=>{
                return <Card key={time} className="w-full max-w-50">
                <CardHeader>
                    <CardTitle className="text-center">{time}</CardTitle>
    
                    <CardFooter>
                 
            <Button className="w-full">Book</Button>
                     
            
                    </CardFooter>
                </CardHeader>
            </Card>
            })}
        
          
  
        </div>
    )
}