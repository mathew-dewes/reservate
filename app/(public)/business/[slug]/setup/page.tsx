import { getBusinessDetails } from "@/lib/db/queries/businesses";
import BusinessDetails from "./_components/BusinessDetails";
import ServiceForm from "./_components/ServiceForm";
import Services from "./_components/Service";
import PublishButton from "../_components/PublishButton";
import { CircleAlert } from "lucide-react";
import Availability from "../../create/_components/Availability";
import { getBusinessAvailability } from "@/lib/db/queries/availability";
import DeleteBusinessButton from "./_components/DeleteBusinessButton";



export default async function page({params}:
    {params: Promise<{slug: string}>}
){

        const {slug} = await params;

            const business = await getBusinessDetails(slug);
                   if (!business) return
            const availability = await getBusinessAvailability(slug);
            

  
        

            
         

            

    if (!slug) return
    return (
        <div>
            <div className="space-y-5 mb-10">
            <BusinessDetails imageUrl={business.imageUrl ?? ""} name={business.name} phone={business.phone} description={business.description} email={business.email}/>
            <Availability savedValues={availability} businessId={business.id}/>
            <Services slug={slug}/>
            <ServiceForm slug={slug} businessId={business.id}/>
            <div hidden={business._count.services > 0} className="flex gap-2 items-center">
                   <CircleAlert size={20} />
                    <p className="text-sm">At least one service must be added before publishing</p>
            </div>
            <div className="flex gap-3">
            <PublishButton hasServices={business._count.services > 0} businessId={business.id}/>
            <DeleteBusinessButton businessId={business.id}/>
            </div>


            </div>
        
        </div>
    )
}