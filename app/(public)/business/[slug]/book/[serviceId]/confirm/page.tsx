import { getBusinessName } from "@/lib/db/queries/businesses";
import BookingForm from "./_components/BookingForm";
import SelectedService from "./_components/SelectedService";
import { getServiceName } from "@/lib/db/queries/services";


export default async function page({params}:
    {params: Promise<{slug: string, serviceId: string}>}
){

        const {slug, serviceId} = await params;
    
        if (!slug) return
    
        const business = await getBusinessName(slug);
        const serviceName = await getServiceName(serviceId)

        

    
        
    
        if (!business) return
    return (
        <div className="space-y-6">
            <SelectedService serviceName={serviceName ?? "Unknown"}  businessName={business.name}/>
            <BookingForm/>
        </div>
    )
}