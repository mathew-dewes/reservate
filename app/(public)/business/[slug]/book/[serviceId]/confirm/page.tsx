import { getBusinessName } from "@/lib/db/queries/businesses";
import BookingForm from "./_components/BookingForm";
import SelectedService from "./_components/SelectedService";
import { getServices } from "@/lib/db/queries/services";


export default async function page({params}:
    {params: Promise<{slug: string, serviceId: string}>}
){

        const {slug, serviceId} = await params;
    
        if (!slug) return
    
        const business = await getBusinessName(slug);
        const services = await getServices(slug);

        const selectedServiceName = services.find((service) => service.id == serviceId)?.name ?? "Unknown"

        

    
        
    
        if (!business) return
    return (
        <div className="space-y-6">
            <SelectedService serviceName={selectedServiceName}  businessName={business.name}/>
            <BookingForm/>
        </div>
    )
}