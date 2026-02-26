
import { getAllBusinesses } from "@/lib/db/queries/businesses";
import BusinessCard from "./BusinessCard";


export default async function BusinessList() {

    const businesses = await getAllBusinesses();

    console.log(businesses);



    return (
        <div>
            <div className="mt-5">
       <BusinessCard/>
            </div>

            <p>Welcome</p>
            <h1>Business List</h1>
        </div>
    )
}