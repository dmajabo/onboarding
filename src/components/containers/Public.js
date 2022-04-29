import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import './styles.scss';

export default function Public({ children }) {
    return (
        <Stack className="public-container" sx={{ height: '100vh', width: '100vw', padding: 5 }}>
            {children}
            <Box className="corner-top" sx={{ position: 'absolute', right: 25, top: 25 }}></Box>
            <Box className="corner-bottom" sx={{ position: 'absolute', left: 25, bottom: 25 }}></Box>
            <Box className="copyright" sx={{ position: 'absolute', right: 25, bottom: 25 }}>
                <Typography color={'white'} fontSize={14}>
                    © Copyright 2022 distro.energy
                </Typography>
            </Box>
        </Stack>
    );
}
