import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type Props = {
  email: string,
  imageUrl: string,
  name: string,
  phone: string,
  description: string,

}

export default function BusinessDetails({ email, imageUrl, description, phone }: Props) {
  return (
    <div>
      <Card size="sm" className="w-full max-w-2xl">

        <CardHeader>
          <div className="flex gap-5">
          <Image
            height={500} width={300}
            src={imageUrl}
            alt="Business image"
            className="relative z-20 aspect-video w-1/3 object-cover mb-1"
          />
          <FieldGroup>
            <Field className="w-1/2">
              <FieldLabel htmlFor="picture">Business Image:</FieldLabel>
              <Input id="picture" type="file" accept="image/*" />
              <FieldDescription>Select a picture to upload.</FieldDescription>
            </Field>
          </FieldGroup>
          </div>


          <CardTitle>Mathews Pies</CardTitle>
          <CardDescription>
            Tagline: Tagline will go here eventually.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p>Phone: {phone}</p>
            <p>Email: {email}</p>


          </div>

          <div className="mt-5">
            <p className="font-semibold text-sm ">Description:</p>
            <p>
              {description}
            </p>
          </div>


        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-1/2">
            Edit
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}