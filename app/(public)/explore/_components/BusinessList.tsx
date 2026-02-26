
import { getAllBusinesses } from "@/lib/db/queries/businesses";
import BusinessCard from "./BusinessCard";


export default async function BusinessList() {

    const businesses = await getAllBusinesses();



    return (
        <div>
            <div className="mt-5">
                {businesses.map((business)=>{
                    return <BusinessCard key={business.id} name={business.name} description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure, aspernatur?" tagline="The best fish and chips in the world"/>

                })}
                   </div>

            <p>Welcome</p>
            <h1>Business List</h1>
        </div>
    )
}