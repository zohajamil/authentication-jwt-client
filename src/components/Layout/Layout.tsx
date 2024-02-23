import Grid from '@mui/material/Grid';
import LoginForm from '../Login/LoginForm';
import { useContext, useEffect, useState } from 'react';
import { View } from '../../common/enums/View';
import Box from '@mui/material/Box';
import SignupForm from '../Signup/SignupForm';
import './layout.scss'
import { useNavigate } from 'react-router-dom';
import { IUserContext } from '../../common/interfaces/UserContext';
import { UserContext } from '../../context/UserContext';
import logo from '../../images/authentication.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AppHeader from '../AppHeader/AppHeader';

export default function Layout() {
    const [view, setView] = useState<View>(View.LOGIN)
    const { loggedInUser } = useContext<IUserContext>(UserContext)
    let navigate = useNavigate()
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        if (loggedInUser && loggedInUser.email) {
            navigate('/home')
        }
    }, [loggedInUser])

    return (
        <Grid container className="grid-container">
            {isMobile ? (
                <AppHeader isHome={false} />

            ) : (
                <Grid item className="grid-section purple-grid hide-on-mobile" xl={4} lg={4} md={4} sm={5} xs={5}>
                    <Box className="col">
                        <img src={logo} className="App-logo" alt="logo" />
                    </Box>
                </Grid>

            )}
            <Grid className="grid-section white-grid" item xl={isMobile ? undefined : 8} lg={isMobile ? undefined : 8} md={isMobile ? undefined : 8} sm={isMobile ? undefined : 7} xs={isMobile ? undefined : 7}>
                {view === View.LOGIN ? (
                    <Box className="col">
                        <LoginForm />
                        <h5>Don't have an account, <span className="hyperlink" onClick={() => setView(View.SIGNUP)}>Sign up?</span></h5>
                    </Box>
                ) : (
                    <Box className="col">
                        <SignupForm />
                        <h5>Already have an account, <span className="hyperlink" onClick={() => setView(View.LOGIN)}>Back to Login</span></h5>
                    </Box>
                )}
            </Grid>
        </Grid>
    );
}
