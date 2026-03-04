import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import GoogleLoginButton from "@/components/web/GoogleLoginButton";
import { getServices } from "@/lib/db/queries/services";
import { getSession } from "@/lib/db/session/user";
import { format } from "date-fns";
import Link from "next/link";


type Props = {
    slug: string
}
export default async function Services({ slug }: Props) {

    const services = await getServices(slug);

    const now = new Date()

    const today = format(now, "dd-MM-yyyy");
    const session = await getSession();




    return (
        <div className="w-full">
            <p className="font-semibold text-base">Services:</p>
            <div className="mt-2 flex flex-col gap-3">
                {services.map((service) => {
                    return <Card key={service.id} size="sm" className="w-full bg-secondary">
                        <CardHeader>
                            <CardTitle>{service.name}</CardTitle>
                            <CardDescription>
                                {service.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-3">
                                <p>Price: ${Number(service.price)}</p>
                                <p>Duration: {service.duration}</p>
                            </div>


                        </CardContent>
                        <CardFooter>
                            {session ?
                                (<Link className={buttonVariants({ variant: "outline", size: "sm", className: "w-1/2" })} href={`/business/${slug}/book/${service.id}?date=${today}`}>Book Service</Link>
                                ) : (<div className="space-y-2">
                                    <p className="text-sm">You must be logged in to book services</p>
                                    <GoogleLoginButton redirect={`/business/${slug}`} hide={true} />
                                </div>)}

                        </CardFooter>


                    </Card>
                })}



            </div>


        </div>
    )
}