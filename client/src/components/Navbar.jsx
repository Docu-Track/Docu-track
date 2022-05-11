import React from "react";
// import Box from '@mui/material/Box';

import { Box, Button, Toolbar, Typography, AppBar } from '@mui/material/';
// import { Link, useHistory } from 'react-router-dom';
// import { verify } from './api';

export default function Navbar({ verify }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ background: '#162748' }} position="sticky">
                <Toolbar>
                    <Typography sx={{ flexGrow: 1 }} variant="h5" component="h1" gutterBottom>
                        Certified Ethical Developers
                    </Typography>
                    <Button variant="contained" onClick={verify} sx={{ background: '#E88547' }}>Show my NFT</Button>
                </Toolbar>
            </AppBar>

        </Box>
    )
}

{/* <AppBar position="static"> */ }
//   component="div"