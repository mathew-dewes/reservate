
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import DeleteBusinessButton from "./DeleteBusinessButton";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";


type CardProps =  {
  name: string
  tagline: string
  description: string
  businessId: string
  imageUrl: string
  slug: string

  
}

export default function BusinessCard({name, tagline, description, businessId, imageUrl, slug}: CardProps){
    return  <Card size="sm" className="w-full max-w-sm">
        <Image
        height={400} width={300}
        src={imageUrl}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover"
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
        <div className="flex gap-1">
        <DeleteBusinessButton businessId={businessId}/>
       <Link className={buttonVariants()} href={'/business/' + slug}>View more</Link>
        </div>

      </CardFooter>
              
                </Card>
}