

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { getSession } from "@/lib/db/session/user"

export async function UserAvatar(
) {

  const session = await getSession();

  if (!session) return;

  return (
    <div hidden={!session} className="items-center gap-1.5 flex">
 <Avatar>
      <AvatarImage
        src={session.user.image ?? undefined}
        alt="User avatar image"
        
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
     <p className="font-semibold">{session?.user.name}</p>
    </div>
   
  )
}
