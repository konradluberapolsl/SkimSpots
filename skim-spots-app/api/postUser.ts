import {client} from "./apiConfig";
import User from "../types/User";

export async function postUser(userName: string) : Promise<User> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: userName
        })
    };
    return  await client(`user`, "", requestOptions)
        .then((res) => {
            return res;
        });
}