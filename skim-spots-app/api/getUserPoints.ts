import {client} from "./apiConfig";
import UserPoints from "../types/UserPoints";

export async function getUserPoints() : Promise<UserPoints[]> {
    return  await client("userPoints","")
        .then((res) => {
            const userPoints: UserPoints[] = res;
            return userPoints;
        });
}