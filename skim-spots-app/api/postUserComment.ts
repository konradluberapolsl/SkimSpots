import {client} from "./apiConfig";
import PlaceComment from "../types/Comment";
import User from "../types/User";

export async function postUserComment(placeId: number, user: User, text: string) : Promise<PlaceComment> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: text,
            userId: user!!.id,
            placeId: placeId
        })
    };
    return  await client(`comment`, "", requestOptions)
        .then((res) => {
            res.user = user;
            const comments: PlaceComment = res;
            return comments;
        });
}