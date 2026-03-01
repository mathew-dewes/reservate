import { getBusiness } from "@/lib/db/queries/businesses";
import Business from "../_components/Business";
import { getUserId } from "@/lib/db/session/user";



export default async function page({params}:
    {params: Promise<{slug: string}>}
){

    const {slug} = await params;

    if (!slug) return

    const userId = await getUserId();
    const business = await getBusiness(slug);

    

    if (!business) return

    
    return (
        <div>
            <Business published={business.publish} isAuthor={userId !== business.userId} slug={slug} email={business.email} imageUrl={business.imageUrl!} name={business.name} phone={business.phone} description={business.description}/>

        </div>
    )
}