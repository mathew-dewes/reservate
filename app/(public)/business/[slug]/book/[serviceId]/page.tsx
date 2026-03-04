

import { getServices } from "@/lib/db/queries/services";
import BookingCalendar from "../_components/BookingCalendar";
import BusinessPreviewCard from "../_components/BusinessPreviewCard";
import ServiceSelector from "../_components/ServiceSelector";


import TimeSlots from "../_components/TimeSlots";
import { getBusinessAvailability } from "@/lib/db/queries/availability";


export default async function page({params}:
    {params: Promise<{slug: string, serviceId: string}>}
){
    

 
     const {slug, serviceId} = await params;
    const services = await getServices(slug);
    const availability = await getBusinessAvailability(slug);
    
      
    if (!slug || !serviceId) return
    

    return (
        <div className="space-y-4 mb-30">
   <BusinessPreviewCard slug={slug}/>
   <ServiceSelector selectedServiceId={serviceId} services={services} slug={slug}/>
   <BookingCalendar availability={availability}/>
   <TimeSlots serviceId={serviceId} availability={availability} slug={slug}/>
        </div>
    )
}