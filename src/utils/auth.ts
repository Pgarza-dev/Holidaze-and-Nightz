// utils/auth.ts
import { cookies } from "next/headers";

type User = {
    username: string;
    accessToken: string;
};

export function IsUserLoggedIn( { username, accessToken }: User) {
    const cookieStore = cookies();
    const userCookie = cookieStore.get("username");
    const accessTokenCookie = cookieStore.get("accessToken");
    return userCookie !== undefined && accessTokenCookie !== undefined;
}
