import Grid from '@mui/material/Grid';
import './layout.scss'
import LoginForm from '../Login/LoginForm';

export default function Layout() {
    return (
        <Grid container className="grid-container">
            <Grid item className="grid-section purple-grid" xs={7}>
                <p >Left Section</p>
            </Grid>
            <Grid className="grid-section white-grid" item xs={5}>
                <LoginForm />
            </Grid>
        </Grid>
    );
}
