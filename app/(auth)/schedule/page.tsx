import prisma from "@/lib/config/prisma";
import ImageUploader from "./_components/ImageUploader";


export default async function schedulePage(){

    const users = await prisma.user.findMany();

    console.log(users);
    
    return (
        <div>
 <ImageUploader/>
        </div>
    )
}