"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSearchParams } from "next/navigation";


export default function ServiceSelector({services}:{services: {
  name: string, id: string
}[]}) {

    const searchParams = useSearchParams();

    const serviceId = searchParams.get('serviceId');
    


  return (
    <Select defaultValue={serviceId ?? undefined}>
      <SelectTrigger className="w-full max-w-48 mx-auto">
        <SelectValue placeholder="Select a service" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Services</SelectLabel>
          {services.map((service)=>{
            return <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
          })}
         
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
