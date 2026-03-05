import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BusinessesFilter(){
    return <Select>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Filter by business" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Business</SelectLabel>
          <SelectItem value="all">View All</SelectItem>
          <SelectItem value="apple">Matts Pizza</SelectItem>
          <SelectItem value="banana">Matts Pies</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
}