import User from "../types/User";
import {client} from "./apiConfig";

export async function getUserByID(id: number) : Promise<User> {
    return  await client("user", id.toString())
        .then((res) => {
            const user: User = res;
            return user;
        });
}