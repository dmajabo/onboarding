import React from 'react';
// import { Row, Col } from 'antd';
import moment from 'moment';
import AreaChart from './Chart';
// import MapDeck from './DeckMap';

// const DATA = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const CHART_DATA = [
    {
        x: 0,
        y: 0
    },
    {
        x: 15,
        y: 15
    },
    {
        x: 30,
        y: 30
    },
    {
        x: 50,
        y: 50
    },
    {
        x: 100,
        y: 100
    }
];

export default function Map() {
    return (
        <div className="map-container">
            <div className="map-deck-border">
                <div className="map-deck">{/* <MapDeck data={DATA} /> */}</div>
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
                    <div className="map-chart-demo"></div>
                </div>
            </div>
        </div>
    );
}
