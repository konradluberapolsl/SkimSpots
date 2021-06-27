import {client} from "./apiConfig";
import UserPoints from "../types/UserPoints";


export async function getUserPointsByUserID(userId: number) : Promise<UserPoints> {
    return  await client("userPoints/", `user/${userId.toString()}`)
        .then((res) => {
            const userPlaces: UserPoints = res;
            return userPlaces;
        });
}