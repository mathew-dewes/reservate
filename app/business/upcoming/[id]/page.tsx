export default async function page({params}:
    {params: Promise<{id: string}>}
){

    
    const {id} = await params;

    if (!id) return
    return (
        <div>
            <p>{id}</p>
        </div>
    )
}