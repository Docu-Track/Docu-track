import { Typography, Link } from '@mui/material/';

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/Docu-Track/Docu-track">
                Docu Track.
            </Link>
            {' Powered by Docu Track'}
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}