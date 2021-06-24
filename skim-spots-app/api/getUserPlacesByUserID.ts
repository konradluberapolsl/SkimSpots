import UserPlace from "../types/UserPlace";
import {client} from "./apiConfig";

export async function getUserPlacesByUserID(userId: number) : Promise<UserPlace[]> {
    return  await client("userPlace/", `user/${userId.toString()}`)
        .then((res) => {
            const userPlaces: UserPlace[] = res;
            return userPlaces;
        });
}