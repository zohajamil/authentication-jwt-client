import { IUser } from "./User"

export interface IUserContext {
    loggedInUser: IUser
    login: (currentUser: IUser) => void
    logout: () => void
}