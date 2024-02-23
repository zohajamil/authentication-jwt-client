import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useContext, useEffect } from "react";
import { IUserContext } from "../../common/interfaces/UserContext";
import { UserContext } from "../../context/UserContext";
import './home.scss'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {

    const { loggedInUser, logout } = useContext<IUserContext>(UserContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
        toast.success('Logged out!')
    }

    return (
        <div className="home-container">
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <div></div>
                    <h3><span className="hyperlink" onClick={() => handleLogout()}>Log out</span></h3>

                </Toolbar>
            </AppBar>
            <h1>Welcome to the application, {loggedInUser.firstName} {loggedInUser.surname}!</h1>
        </div>
    );
}
