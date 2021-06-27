import {client} from "./apiConfig";
import UserPoints from "../types/UserPoints";

export async function postUserPoints(userId: number) : Promise<UserPoints>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userId,
            amount: 0
        })
    };
    return  await client(`userPoints`, "", requestOptions)
        .then((res) => {
            return res;
        });
}