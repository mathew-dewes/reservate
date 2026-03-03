
import { getServiceNames } from "@/lib/db/queries/services";
import BookingCalendar from "./_components/BookingCalendar";
import BusinessPreviewCard from "./_components/BusinessPreviewCard";
import ServiceSelector from "./_components/ServiceSelector";


import TimeSlots from "./_components/TimeSlots";
import { getBusinessAvailability } from "@/lib/db/queries/availability";

export default async function page({params}:
    {params: Promise<{slug: string}>}
){

 
     const {slug} = await params;
    const services = await getServiceNames(slug);
      const availability = await getBusinessAvailability(slug);
    if (!slug) return

    return (
        <div className="space-y-4 mb-30">
   <BusinessPreviewCard slug={slug}/>
   <ServiceSelector services={services}/>
   <BookingCalendar availability={availability}/>
   <TimeSlots availability={availability} slug={slug}/>
        </div>
    )
}