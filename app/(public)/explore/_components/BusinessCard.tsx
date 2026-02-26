import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type CardProps =  {
  name: string
  tagline: string
  description: string

  
}

export default function BusinessCard({name, tagline, description}: CardProps){
    return  <Card size="sm" className="w-full max-w-sm">
        <Image
        height={500} width={400}
        src="https://oxrtrrekmvslunhzycfr.supabase.co/storage/v1/object/public/test/Screenshot%202026-02-13%20155256.png-1771970696627"
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
        <Button variant="outline" size="sm" className="w-full">
          Action
        </Button>
      </CardFooter>
              
                </Card>
}