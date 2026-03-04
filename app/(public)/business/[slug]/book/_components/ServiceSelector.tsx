"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns";
import { useRouter } from "next/navigation"



export default function ServiceSelector({services, selectedServiceId, slug}:{services: {
name: string, id: string}[], selectedServiceId: string, slug: string}) {

      const router = useRouter();

        const now = new Date()
      
          const today = format(now, "dd-MM-yyyy");


  function handleSelect(serviceId: string) {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;
    router.replace(`/business/${slug}/book/${service.id}?date=${today}`, {scroll: false});
  }


  return (
    <Select defaultValue={selectedServiceId} onValueChange={handleSelect}>
      <SelectTrigger className="w-full max-w-48 mx-auto">
        <SelectValue placeholder="Select a service" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Services</SelectLabel>
          {services.map((service)=>{
            return <SelectItem  key={service.id} value={service.id}>{service.name}</SelectItem>
          })}
         
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
