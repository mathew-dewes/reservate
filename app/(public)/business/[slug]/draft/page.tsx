import { getBusiness } from "@/lib/db/queries/businesses";
import PreviewBusiness from "./_components/PreviewBusiness";

export default async function page({params}:
    {params: Promise<{slug: string}>}
){

        const {slug} = await params;

        const business = await getBusiness(slug);

    if (!slug || !business) return
    return(
        <div>
            <p>Draft page {slug}</p>
            <PreviewBusiness slug={slug} email={business.email} imageUrl={business.imageUrl!} name={business.name} phone={business.phone} description={business.description}/>
        </div>
    )
}