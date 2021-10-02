import Place from "./Place";

type UserPlace = null | {
    id: number;
    userId: number;
    placeId: number;
    place: Place;
}

export default UserPlace;