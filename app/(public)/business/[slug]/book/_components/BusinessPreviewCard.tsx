import { Badge } from "@/components/ui/badge"
import Image from "next/image";
import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getBusiness } from "@/lib/db/queries/businesses";

export default async function BusinessPreviewCard({ slug }: { slug: string }) {

    const business = await getBusiness(slug);
    if (!business) return
    return <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="absolute inset-0 z-30 aspect-video" />
        <Image
            width={300}
            height={200}
            src={business.imageUrl ?? ""}
            alt="Business image"
            className="relative z-20 aspect-video w-full object-cover"
        />
        <CardHeader>
            <CardAction>
                <Badge variant="secondary">Featured</Badge>
            </CardAction>
            <CardTitle>{business.name}</CardTitle>
            <CardDescription>
                {business.description}
            </CardDescription>
        </CardHeader>

    </Card>
}