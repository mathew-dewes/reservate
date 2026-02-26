
import { getAllBusinesses } from "@/lib/db/queries/businesses";
import BusinessCard from "./BusinessCard";


export default async function BusinessList() {

    const businesses = await getAllBusinesses();


    return (
        <div>
            <div className="mt-5 grid grid-cols-3 gap-10">
                {businesses.map((business)=>{
                    return <BusinessCard 
                    key={business.id} 
                    businessId={business.id} 
                    name={business.name} 
                    description={business.description}
                    tagline="The best fish and chips in the world"
                    imageUrl={business.imageUrl ?? ""}
                    />

                })}
                   </div>
        </div>
    )
}