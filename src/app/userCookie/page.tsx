import { cookies } from "next/headers";

async function userCookies(){
    const cookieStore = cookies();
    const userId = cookieStore.get("user");

    const user = JSON.parse(userId?.value ?? "")
    console.log(user)
    
    return(
        <h1>{user?.userName}</h1>
    )
}

export default userCookies