import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getServices } from "@/lib/db/queries/services";
import { format } from "date-fns";
import Link from "next/link";


type Props = {
    businessId: string
    slug: string
}
export default async function Services({businessId, slug}:Props){

    const services = await getServices(businessId);

    const now = new Date()

    const today = format(now, "dd-MM-yyyy");

    

    
    return (
                    <div className="w-full">
                <p className="font-semibold text-base">Services:</p>
                <div className="mt-2 flex flex-col gap-3">
                    {services.map((service)=>{
                        return <Card key={service.id} size="sm" className="w-full bg-secondary">
                        <CardHeader>
                            <CardTitle>{service.name}</CardTitle>
                            <CardDescription>
                                {service.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            ${Number(service.price)}
                        </CardContent>
                        <CardFooter>
                            <Link className={buttonVariants({variant:"outline", size:"sm", className:"w-1/2"})} href={`/business/${slug}/book/${service.id}?date=${today}`}>Book Service</Link>
            
                        </CardFooter>


                    </Card>
                    })}
             
         

                </div>


            </div>
    )
}