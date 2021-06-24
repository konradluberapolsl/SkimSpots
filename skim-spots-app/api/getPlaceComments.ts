import {client} from "./apiConfig";
import PlaceComment from "../types/Comment";

export async function getPlaceComments(id: number) : Promise<PlaceComment[]> {
    return  await client(`comment`, `place/${id.toString()}`)
        .then((res) => {
            if(res.length!=0){
                const comments: PlaceComment[] = res;
                return comments;
            }
            else
                return [];
        });
}