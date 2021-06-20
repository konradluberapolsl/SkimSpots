import Place from "../types/Place";
import {client} from "./apiConfig";

export async function getPlaceByName(name: string) : Promise<Place> {
    return  await client("place", `name/${name}`)
        .then((res) => {
            const place: Place = res;
            return place;
        });
}