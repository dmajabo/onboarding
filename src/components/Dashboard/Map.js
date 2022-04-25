import React from 'react';
// import { Row, Col } from 'antd';
import moment from 'moment';
import LineChart from './Chart';
// import Deck from './Deck';

export default function Map() {
    return (
        <div className="map-container">
            <div className="map-deck">{/* <Deck /> */}</div>
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
                        <LineChart />
                    </div>
                </div>
            </div>
        </div>
    );
}
