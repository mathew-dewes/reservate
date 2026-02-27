import { getUserBusinesses } from "@/lib/db/queries/businesses"
import MyBusinessCard from "./MyBusinessCard"
import { getUserId } from "@/lib/db/session/user"

export default async function MyBusinesses(){

    const userId = await getUserId();
    const businesses = await getUserBusinesses(userId)
    return (
          <div>
            <h2 className="text-lg font-bold">My Businesses:</h2>
        <div className="grid grid-cols-3 gap-10 mt-3">
                        
                        {businesses.map((business)=>{
                            return <MyBusinessCard 
                            published={business.publish}
                            key={business.id} 
                            name={business.name} 
                            tagline="The best fish and chips in the world"
                            imageUrl={business.imageUrl ?? ""}
                            slug={business.slug}

                            />
        
                        })}
                           </div>
                </div>
    )
}