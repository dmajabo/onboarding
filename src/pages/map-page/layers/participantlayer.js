import {GeoJsonLayer} from '@deck.gl/layers';

const data = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.418842792510986,
                    51.899256936515584
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.423563480377197,
                    51.89635720136738
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.428670406341553,
                    51.89945554166387
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.429035186767577,
                    51.898369822800966
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.426116943359374,
                    51.89864787525295
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.419293403625487,
                    51.89719139092751
                ]
            }
        }
    ]
};

const Participants =  () =>  new GeoJsonLayer({
    id: 'participant-layer',
    data : data,
    pickable: true,
    stroked: true,
    filled: true,
    extruded: true,
    pointRadiusMinPixels : 5,
    pointRadiusMaxPixels : 8,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: d => [0, 55, 180, 255],
    getLineColor: d => [0, 55, 180, 255],
    getRadius: 5,
    getLineWidth: 1,
    getElevation: 30
});

export default Participants;
