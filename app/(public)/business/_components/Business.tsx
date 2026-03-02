import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";



type Props = {
    imageUrl: string
    name: string
    phone: string
    email: string
    description: string
    slug: string
    isAuthor: boolean,
    published: boolean
}


export default function Business({ imageUrl, name, description, phone, email, slug, isAuthor, published }: Props) {
    return <Card size="sm" className="w-full max-w-lg">
        <Image
            height={700} width={500}
            src={imageUrl}
            alt="Event cover"
            className="relative z-20 aspect-video w-full object-cover"
        />
        <CardHeader>
            <CardTitle><h2>{name}</h2></CardTitle>
            <CardDescription>
                {description}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div>
                <p>Phone: {phone}</p>
                <p>Email: {email}</p>
            </div>


        </CardContent>
        <CardFooter>
                        <div className="flex gap-1">

                            <div className="mt-5">
      
                <Link className={buttonVariants()} href={`/business/${slug}/book`}>Manage Services</Link>
                            </div>
                     
         

            </div>
         
              
        

        </CardFooter>
         

    </Card>
}