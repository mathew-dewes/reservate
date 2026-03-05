
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UpcomingBookingCard(){
    return  <Card className="mt-5 w-full max-w-xs">
                <CardHeader>
         <CardTitle>Lawn mowing</CardTitle>
         <CardDescription>
            <p className="text-sm">Today: 12:00 - 13:00</p>
         </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <p className="text-sm">Customer: Bob Marley</p>
                        <p className="text-sm">Phone: 01201201</p>
                        <p className="text-sm">Email: bob@gmail.com</p>
                    </div>
                </CardContent>
       
            </Card>
}