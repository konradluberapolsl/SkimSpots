import User from "./User";

type Place = null | {
    author:  User;
    id: number;
    name: string;
    welcomeText: string;
    information: string;
    estimatedLocalization: string;
    pathToImages: string;
    points: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
}

export default Place;