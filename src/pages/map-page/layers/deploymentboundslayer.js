import {GeoJsonLayer} from '@deck.gl/layers';

const data = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            4.417791366577148,
                            51.893285131676606
                        ],
                        [
                            4.434099197387695,
                            51.89842278530546
                        ],
                        [
                            4.432210922241211,
                            51.90101787154425
                        ],
                        [
                            4.423627853393555,
                            51.90101787154425
                        ]
                    ]
                ]
            }
        }
    ]
};

const Bounds = () =>  new GeoJsonLayer({
    id: 'deployment-geojson-layer',
    data : data,
    pickable: true,
    stroked: false,
    filled: true,
    extruded: false,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [160, 160, 180, 100],
    getLineColor: d => [160, 160, 180, 200],
    getRadius: 100,
    getLineWidth: 1,

});

export default Bounds;
