import {client} from "./apiConfig";
import PremiumPlace from "../types/PremiumPlace"

export async function getCurrentPremiumPlaces() : Promise<PremiumPlace[]> {
    return  await client("premiumPlace",'today')
        .then((res) => {
            const premiumPlaces: PremiumPlace[] = res;
            return premiumPlaces;
        });
}