import Place from "../types/Place";
import {client} from "./apiConfig";

export async function getPlacesNames() : Promise<string[]> {
    return  await client("place", `allnames`)
        .then((res) => {
            const names: string[] = res;
            return names;
        });
}