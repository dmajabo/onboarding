import React, { useState, useEffect } from 'react';
// import { Row, Col } from 'antd';
import moment from 'moment';
import AreaChart from './Chart';
// import MapDeck from './DeckMap';
import { Layout } from './../../components/newmap';
import useInterval from '../../hooks/useInterval';

// const DATA = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

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
                    {/* <Layout offset={timer} /> */}
                    {/* <MapDeck data={DATA} /> */}
                </div>
                <div className="map-deck-overlay"></div>
            </div>
            <div className="map-info">
                <div className="components-left">
                    <div>
                        <h2>Port of Rotterdam</h2>
                        <div className="stats">
                            <div className="icon icon-chart" />
                            <p>
                                26/<span>26</span>
                            </p>
                        </div>
                        <div className="stats">
                            <div className="icon icon-battery" />
                            <p>213</p>
                        </div>
                    </div>
                    <div className="card date">
                        <span className="time">{moment().format('hh:mm')}</span>
                        <span className="day">{moment().format('d MMM YYYY')}</span>
                    </div>
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
