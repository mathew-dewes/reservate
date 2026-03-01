import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ServiceForm from "./ServiceForm"

export default function Services(){
    return (
        <div>
               <Card size="sm" className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Services</CardTitle>
        <CardDescription>
          This card uses the small size variant.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ServiceForm/>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-1/2">
          Add Service
        </Button>
      </CardFooter>
    </Card>

        </div>
    )
}