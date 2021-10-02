import User from "./User";

type UserPoints = null | {
    id: number;
    userId: number;
    amount: number;
    user: User;
}

export default UserPoints;