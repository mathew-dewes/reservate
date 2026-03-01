import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import PublishButton from "./PublishButton";


type Props = {
    imageUrl: string
    name: string
    phone: string
    email: string
    description: string
    slug: string
}


export default function PreviewBusiness({ imageUrl, name, description, phone, email, slug }: Props) {
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


        </CardContent>
        <CardFooter>
            <div className="flex gap-1">

               <PublishButton slug={slug}/>
            </div>

        </CardFooter>

    </Card>
}