
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import DeleteBusinessButton from "./DeleteBusinessButton";


type CardProps =  {
  name: string
  tagline: string
  description: string
  businessId: string
  imageUrl: string

  
}

export default function BusinessCard({name, tagline, description, businessId, imageUrl}: CardProps){
    return  <Card size="sm" className="w-full max-w-sm">
        <Image
        height={500} width={400}
        src={imageUrl}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 dark:brightness-40"
      />
                    <CardHeader>
                        <CardTitle>{name}</CardTitle>
                        <CardDescription>
                        {tagline}
                    </CardDescription>
                    </CardHeader>
                        <CardContent>
        <p>
         {description}
        </p>
      </CardContent>
       <CardFooter>
        <div>
          
        </div>
   <DeleteBusinessButton businessId={businessId}/>
        {/* <Button variant="outline" size="sm" className="w-full">
          Action
        </Button> */}
      </CardFooter>
              
                </Card>
}