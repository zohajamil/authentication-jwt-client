import { useContext } from "react";
import { IUserContext } from "../../common/interfaces/UserContext";
import { UserContext } from "../../context/UserContext";
import AppHeader from "../AppHeader/AppHeader";

export default function Home() {
    const { loggedInUser } = useContext<IUserContext>(UserContext)

    return (
        <div className="home-container">
            <AppHeader isHome={true}/>
            <h1>Welcome to the application, {loggedInUser.firstName} {loggedInUser.surname}!</h1>
        </div>
    );
}
