import Grid from '@mui/material/Grid';
import LoginForm from '../Login/LoginForm';
import { useState } from 'react';
import { View } from '../../common/enums/View';
import Box from '@mui/material/Box';
import SignupForm from '../Signup/SignupForm';
import './layout.scss'

export default function Layout() {
    const [view, setView] = useState<View>(View.LOGIN)

    return (
        <Grid container className="grid-container">
            <Grid item className="grid-section purple-grid" xs={7}>
                <p >Left Section</p>
            </Grid>
            <Grid className="grid-section white-grid" item xs={5}>
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
