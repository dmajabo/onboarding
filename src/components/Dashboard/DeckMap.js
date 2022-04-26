import React from 'react';
import DeckGL, { GeoJsonLayer, ScatterplotLayer } from 'deck.gl';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const COUNTRIES = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson'; //eslint-disable-line

const INITIAL_VIEW_STATE = {
    latitude: 52.3676,
    longitude: 4.3041,
    zoom: 6,
    bearing: 0,
    pitch: 30
};

export default function Root({ data }) {
    const onClick = info => {
        if (info.object) {
            // eslint-disable-next-line
            alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
        }
    };

    return (
        <DeckGL
            controller={true}
            initialViewState={INITIAL_VIEW_STATE}
            parameters={{
                clearColor: [0, 0, 0, 0.4]
            }}
        >
            <GeoJsonLayer
                id="base-map"
                pickable
                data={COUNTRIES}
                // stroked={true}
                filled={true}
                // lineWidthMinPixels={2}
                opacity={0.4}
                getLineColor={[100, 100, 100]}
                getFillColor={[0, 0, 0, 150]}
                // pointType={'icon'}
            />
            <GeoJsonLayer
                id="airports"
                data={data}
                filled={true}
                pointRadiusMinPixels={5}
                // pointRadiusScale={1000}
                // getPointRadius={f => 11 - f.properties.scalerank}
                getFillColor={[252, 175, 119, 252]}
                pickable={true}
                autoHighlight={true}
                onClick={onClick}
            />
        </DeckGL>
    );
}
