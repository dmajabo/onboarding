import React, { useState, useEffect } from 'react';
// import { Row, Col } from 'antd';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
// import MapDeck from './DeckMap';
import { Layout } from '../newmap';
import useInterval from '../../hooks/useInterval';
import LineIcon from './gadgets/LineIcon';
import EnergyIcon from './gadgets/EnergyIcon';
import TimerGadget from './gadgets/TimerGadget';
import EnergyProfile from './gadgets/EnergyProfile';

const CHART_DATA = [
    {
        x: 0,
        y: 0
    },
    {
        x: 2,
        y: 5
    },
    {
        x: 5,
        y: 10
    },
    {
        x: 10,
        y: 20
    },
    {
        x: 15,
        y: 30
    },
    {
        x: 20,
        y: 40
    },
    {
        x: 30,
        y: 60
    },
    {
        x: 40,
        y: 100
    }
];

export default function Map() {
    //     <Stack spacing={2}>
    //   <Item>Item 1</Item>
    //   <Item>Item 2</Item>
    //   <Item>Item 3</Item>
    // </Stack>

    // border-radius: 8px;
    // width: '100%';
    // min-height: 200px;
    // height: 577px;
    // overflow: hidden;
    // position: relative;

    return (
        <Box
            className="map-container"
            sx={{ position: 'relative', width: '100%', height: '577px', overflow: 'hidden', borderRadius: 1 }}
        >
            <Box className="map-components">
                <Layout />
                <Box sx={{ position: 'absolute', left: 0, top: 0, margin: 3 }}>
                    <div>
                        <h2>Port of Rotterdam</h2>
                        <LineIcon value={26} total={26} />
                        <EnergyIcon value={222} />
                    </div>
                </Box>
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, margin: 3 }}>
                    <TimerGadget />
                </Box>
                <Box sx={{ position: 'absolute', bottom: 0, right: 0, margin: 3 }}>
                    <EnergyProfile title={'your energy profile'} data={CHART_DATA} />
                </Box>
            </Box>
            {/* <Stack
                sx={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, margin: 3 }}
                // justifyContent={'space-between'}
                // padding={3}
                // className={'map-info'}
                // direction={'column'}
            >
                
            </Stack> */}
        </Box>
    );

    return (
        <div className="map-container">
            <div className="map-deck-border">
                <div className="map-deck">
                    <Layout />
                    {/* <MapDeck data={DATA} /> */}
                </div>
                {/* <div className="map-deck-overlay"></div> */}
            </div>
            <div className="map-info">
                <div className="components-left">
                    <div>
                        <h2>Port of Rotterdam</h2>
                        <LineIcon value={26} total={26} />
                        <EnergyIcon value={222} />
                    </div>
                    <TimerGadget />
                </div>
                <div className="components-right">
                    <div className="map-chart">
                        <h2>your energy profile</h2>
                        {/* <AreaChart data={CHART_DATA} /> */}
                    </div>
                    {/* <div className="map-chart-demo"></div> */}
                </div>
            </div>
        </div>
    );
}
