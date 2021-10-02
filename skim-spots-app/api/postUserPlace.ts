import {client} from "./apiConfig";
import User from "../types/User";
import UserPlace from "../types/UserPlace";

export async function postUserPlace(placeId: number, userId: number) : Promise<UserPlace> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userId,
            placeId: placeId
        })
    };
    return  await client(`userPlace`, "", requestOptions)
        .then((res) => {
            return res;
        });
}