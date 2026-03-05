"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

export default function SelectedService({businessName, serviceName}:{businessName: string, serviceName: string}){

      const searchParams = useSearchParams();

      const date = searchParams.get("date")
      const time = searchParams.get("time")
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Service: {serviceName}</CardTitle>
                <CardDescription>
                    <p>Business: {businessName}</p>
                    <p>Date: {date}</p>
                    <p>Time: {time}</p>
                    
                    </CardDescription>
            </CardHeader>
        </Card>
    )
}