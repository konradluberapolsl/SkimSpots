import User from "./User";

type PlaceComment = null | {
    id: number;
    name: string;
    content: string,
    userId: number,
    placeId: number,
    createdAt: string;
    updatedAt: string;
    user: User;
};

export default PlaceComment;