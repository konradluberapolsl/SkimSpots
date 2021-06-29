import Place from "./Place";

type PremiumPlace = null | {
    id: number;
    place: Place;
    date: Date;
    premiumPoints: number;
    placeId: number;
}

export default PremiumPlace;