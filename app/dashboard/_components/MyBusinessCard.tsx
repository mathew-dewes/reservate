
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


type CardProps = {
  name: string
  tagline: string
  imageUrl: string
  slug: string
  published: boolean


}

export default function MyBusinessCard({ name, tagline, imageUrl, slug, published }: CardProps) {
  return <Card size="sm" className="w-full max-w-sm">
    <Image
      height={400} width={300}
      src={imageUrl}
      alt="Event cover"
      className="relative z-20 aspect-video w-full object-cover"
    />
    <CardHeader>
      <CardTitle>{name}</CardTitle>
      <CardDescription>
        {!published ? <Badge className="mb-1" variant={'destructive'}>Unpublished</Badge> : <Badge className="mb-1 bg-green-300 text-black font-semibold" variant={'default'}>Active</Badge> }

        <p>{tagline}</p>

      </CardDescription>
    </CardHeader>
    <CardContent>

      <div className="mt-2">
        <p className="text-sm">Services: 3</p>
        <p className="text-sm">Active bookings (Today): 12</p>

      </div>


    </CardContent>
    <CardFooter>

      {published ? (<div className="flex gap-1">



        <Link className={buttonVariants()} href={'/business/' + slug}>Add Services</Link>
        <Link className={buttonVariants()} href={'/schedule/upcoming/'}>View Schedule</Link>

      </div>) : (<div className="flex gap-1">


        <Link className={buttonVariants()} href={`/business/${slug}`}>Confirm details</Link>
      </div>)}
      <div className="flex gap-1">


      </div>

    </CardFooter>

  </Card>
}