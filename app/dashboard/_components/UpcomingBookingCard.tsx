
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


type Props ={
    serviceName: string,
    startTime: string,
    customerName: string,
    customerEmail: string,
    customerPhone: string | null
}

export default function UpcomingBookingCard({serviceName, startTime, customerEmail, customerName, customerPhone}: Props){
    return  <Card className="mt-5 w-full max-w-xs">
                <CardHeader>
         <CardTitle>{serviceName}</CardTitle>
         <CardDescription>
            <p className="text-sm">{startTime}</p>
         </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <p className="text-sm">Customer: {customerName}</p>
                        {customerPhone && <p className="text-sm">Phone: {customerPhone}</p>}
                   
                        <p className="text-sm">Email: {customerEmail}</p>
                    </div>
                </CardContent>
       
            </Card>
}