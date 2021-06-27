import {client} from "./apiConfig";
import UserPoints from "../types/UserPoints";

export async function updateUserPoints(userId: number, amount: number) : Promise<string>{
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            amount: amount
        })
    };
    return  await client(`userPoints`, `user/${userId}`, requestOptions)
        .then((res) => {
            return res;
        });
}