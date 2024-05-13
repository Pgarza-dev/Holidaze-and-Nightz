// utils/auth.ts
import { cookies } from "next/headers";

export function isUserLoggedIn() {
    const cookieUser = cookies();
    const userObject = cookieUser.get("user");
}
