import React from 'react'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useContext } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IUserContext } from '../../common/interfaces/UserContext';
import { UserContext } from '../../context/UserContext';
import { IAppHeaderProps } from './AppHeaderProps';
import logo from '../../images/authentication.png';
import './appHeader.scss'

const AppHeader = (props: IAppHeaderProps) => {
    const { logout } = useContext<IUserContext>(UserContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
        toast.success('Logged out!')
    }
    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: props.isHome ? 'space-between' : 'center' }}>
                {props.isHome ? (
                    <>
                        <div></div>
                        <h3><span className="hyperlink" onClick={() => handleLogout()}>Log out</span></h3>
                    </>
                ) : (
                    <div className="same-row">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h3>Authentication App</h3>
                    </div>
                )}

            </Toolbar>
        </AppBar>
    )
}

export default AppHeader