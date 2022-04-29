import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AreaChart from './Chart';

function EnergyProfile({ title, data }) {
    // width: 280px;
    // height: 290px;
    // background: rgba(252, 175, 119, 0.01);
    // border: 1px solid rgba(133, 145, 174, 0.1);
    // box-sizing: border-box;
    // backdrop-filter: blur(24px);
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;

    return (
        <Stack
            className="map-chart"
            sx={{
                width: 280,
                height: 280,
                background: 'rgba(252, 175, 119, 0.01)',
                border: '1px solid rgba(133, 145, 174, 0.1)',
                boxSizing: 'border-box',
                backdropFilter: 'blur(10px)'
            }}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <h2>{title}</h2>
            <AreaChart data={data} />
        </Stack>
    );
}

export default EnergyProfile;
