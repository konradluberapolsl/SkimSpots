import {client} from "./apiConfig";
import Place from "../types/Place";

export async function getPlaceByID(id: number) : Promise<Place> {
   return  await client("place", id.toString())
       .then((res) => {
           const place: Place = res;
           return place;
       });
}