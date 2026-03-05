import { getBusiness } from "@/lib/db/queries/businesses";
import Business from "../_components/Business";
import Services from "../_components/Services";




export default async function page({params}:
    {params: Promise<{slug: string}>}
){

    const {slug} = await params;

    if (!slug) return

    const business = await getBusiness(slug);

    

    if (!business) return

    
    return (
        <div className="flex mt-10 gap-5">
            <Business slug={slug} email={business.email} imageUrl={business.imageUrl!} name={business.name} phone={business.phone} description={business.description}/>
            <Services slug={slug}/>
        </div>
    )
}