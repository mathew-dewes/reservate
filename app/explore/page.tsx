
import { buttonVariants } from "@/components/ui/button";
import BusinessList from "./_components/BusinessList";
import Link from "next/link";

export default function explorePage(){
    return (
        <div>
            <div>
                <Link href={'/business/create'} className={buttonVariants()}>Create Business</Link>
        
            </div>
            <BusinessList/>
        </div>
    )
}