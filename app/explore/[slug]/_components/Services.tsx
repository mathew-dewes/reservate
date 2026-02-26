import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
export default function Services(){
    return (
                    <div className="mt-5">
                <p className="font-semibold text-base">Services:</p>
                <div className="mt-2 flex flex-col gap-3">
                    <Card size="sm" className="w-full  bg-secondary">
                        <CardHeader>
                            <CardTitle>Lawn Mowing</CardTitle>
                            <CardDescription>
                                A genral lawn mowing including line trimming
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            $20 per hour
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" size="sm" className="w-1/2">
                                Book Service
                            </Button>
                        </CardFooter>


                    </Card>
                    <Card size="sm" className="w-full  bg-secondary">
                        <CardHeader>
                            <CardTitle>Lawn Mowing</CardTitle>
                            <CardDescription>
                                A genral lawn mowing including line trimming
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            $20 per hour
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" size="sm" className="w-1/2">
                                Book Service
                            </Button>
                        </CardFooter>


                    </Card>

                </div>


            </div>
    )
}