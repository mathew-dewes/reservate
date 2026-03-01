import { getBusinessDetails } from "@/lib/db/queries/businesses";
import BusinessDetails from "./_components/BusinessDetails";
import ServiceForm from "./_components/ServiceForm";
import Services from "./_components/Service";



export default async function page({params}:
    {params: Promise<{slug: string}>}
){

        const {slug} = await params;

            const business = await getBusinessDetails(slug);
                if (!business) return

            

    if (!slug) return
    return (
        <div>
            <div className="space-y-5">
            <BusinessDetails imageUrl={business.imageUrl ?? ""} name={business.name} phone={business.phone} description={business.description} email={business.email}/>
            <Services slug={slug} businessId={business.id}/>
            <ServiceForm slug={slug} businessId={business.id}/>
            </div>
        
        </div>
    )
}