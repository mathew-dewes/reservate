import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import PublishButton from "../[slug]/_components/PublishButton";
import ServiceForm from "../[slug]/_components/ServiceForm";

type Props = {
    imageUrl: string
    name: string
    phone: string
    email: string
    description: string
    slug: string
}


export default function Business({ imageUrl, name, description, phone, email, slug }: Props) {
    return <Card size="sm" className="w-full max-w-xl mx-auto mt-10">
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

{/* <Services/> */}

        </CardContent>
        <CardFooter>
            <div className="w-full">
                     <ServiceForm/>
                        <div className="flex gap-1">

                            <div className="mt-5">
       <PublishButton slug={slug}/>
                <Link className={buttonVariants()} href={'/explore/'}>Add Services</Link>
                            </div>
                     
         

            </div>
            </div>
              
        

        </CardFooter>
         

    </Card>
}