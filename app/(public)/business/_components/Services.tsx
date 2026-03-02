import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getServices } from "@/lib/db/queries/services";
export default async function Services({businessId}:{businessId: string}){

    const services = await getServices(businessId);

    console.log(services);
    
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
                            <Button variant="outline" size="sm" className="w-1/2">
                                Book Service
                            </Button>
                        </CardFooter>


                    </Card>
                    })}
             
         

                </div>


            </div>
    )
}