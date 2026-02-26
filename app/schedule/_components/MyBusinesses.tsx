import { getUserBusinesses } from "@/lib/db/queries/businesses"
import MyBusinessCard from "./MyBusinessCard"
import { getUserId } from "@/lib/db/session/user"

export default async function MyBusinesses(){

    const userId = await getUserId();
    const businesses = await getUserBusinesses(userId)
    return (
          <div>
                    <div className="mt-5 grid grid-cols-3 gap-10">
                        {businesses.map((business)=>{
                            return <MyBusinessCard 
                            key={business.id} 
                            businessId={business.id} 
                            name={business.name} 
                            description={business.description}
                            tagline="The best fish and chips in the world"
                            imageUrl={business.imageUrl ?? ""}
                            slug={business.slug}
                            />
        
                        })}
                           </div>
                </div>
    )
}