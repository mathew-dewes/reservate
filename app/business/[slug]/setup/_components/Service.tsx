import { getServices } from "@/lib/db/queries/services"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import RemoveServiceButton from "./RemoveServiceButton";


export default async function Services({slug}:{slug: string}){

    const services = await getServices(slug);
    
    return (
        <div>
            <p>Services:</p>
            {services.map((service)=>{
                return <Card key={service.id} size="sm" className="w-full max-w-2xl mt-3">
      <CardHeader>
        <CardTitle>{service.name}</CardTitle>
        <CardDescription>
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-5">
       <p>Price: {Number(service.price)}</p>
       <p>Duration: {service.duration}</p>
        </div>

      </CardContent>
      <CardFooter>
  <RemoveServiceButton serviceId={service.id} slug={slug}/>
      </CardFooter>

    </Card>
            })}
            

   
        </div>
    )
}