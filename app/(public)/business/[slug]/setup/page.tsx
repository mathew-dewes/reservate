import { getBusinessDetails } from "@/lib/db/queries/businesses";
import BusinessDetails from "./_components/BusinessDetails";
import Services from "./_components/Services";

export default async function page({params}:
    {params: Promise<{slug: string}>}
){

        const {slug} = await params;

            const business = await getBusinessDetails(slug);
                if (!business) return

            

    if (!slug) return
    return (
        <div>
            <p>Set up page for {slug}</p>
            <div className="space-y-5">
            <BusinessDetails imageUrl={business.imageUrl ?? ""} name={business.name} phone={business.phone} description={business.description} email={business.email}/>
            <Services/>
            </div>
        
        </div>
    )
}