import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { IUser } from "../common/interfaces/User";
import { IUserContext } from "../common/interfaces/UserContext";
import useFetch from "../hooks/useFetch";

const UserContext = createContext({} as IUserContext);
const UserDispatchContext = createContext({} as Dispatch<SetStateAction<IUser>>);


const UserProvider = ({ children }: any) => {
    const [loggedInUser, setLoggedInUser] = useState<IUser>({} as IUser)
    const usersApi = useFetch('users');

    const login = (currentUser: IUser) => {
        localStorage.setItem('accessToken', currentUser.accessToken)
        setLoggedInUser(currentUser)
    }

    const logout = () => {
        localStorage.setItem('accessToken', '')
        setLoggedInUser({} as IUser)
    }

    const getUser = async () => {
        let accessToken = localStorage.getItem('accessToken')
        if (accessToken && accessToken.length) {

            try {
                const data: IUser = await usersApi.get(``)
                setLoggedInUser({ ...data, accessToken: accessToken })
            }
            catch (err: any) {
                logout()
                window.location.href = `/`
                console.error(err)
            }
        }
    }

    useEffect(() => {
        getUser()
    }, [])


    return (
        <UserContext.Provider value={{
            loggedInUser: loggedInUser,
            login: login,
            logout: logout
        }}>
            <UserDispatchContext.Provider value={setLoggedInUser}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext, UserDispatchContext };