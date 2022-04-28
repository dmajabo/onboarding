import React, { useState, useEffect } from 'react';
// import { Row, Col } from 'antd';
import moment from 'moment';
import AreaChart from './Chart';
// import MapDeck from './DeckMap';
import { Layout } from './../../components/newmap';
import useInterval from '../../hooks/useInterval';
import LineIcon from './gadgets/LineIcon';
import EnergyIcon from './gadgets/EnergyIcon';
import TimerGadget from './gadgets/TimerGadget';

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
    const [timer, setTimer] = useState(0);
    const [offset, setOffset] = useState(0);

    useInterval(
        () => {
            setTimer(timer + 0.02);
            if (timer > 1) setTimer(0);
        },
        // Delay in milliseconds or null to stop it
        1 / 30
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
                        <AreaChart data={CHART_DATA} />
                    </div>
                    {/* <div className="map-chart-demo"></div> */}
                </div>
            </div>
        </div>
    );
}
