import { DeckGL } from 'deck.gl';
import React, {useState} from 'react';
import tile from './layers/tilelayer'
import graph from './layers/graphlayer'
import {PathLayer} from '@deck.gl/layers';
import participants from './layers/participantlayer'
import useAnimationFrame from './../../hooks/useAnimationFrame'

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
                            4.415173530578613,
                            51.8991907346044
                        ],
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
                        ],
                        [
                            4.415173530578613,
                            51.8991907346044
                        ]
                    ]
                ]
            }
        }
    ]
};





let Map = ()=>  {

    const [timer, setTimer] = useState(0);

    useAnimationFrame(deltaTime => {
        // Pass on a function to the setter of the state
        // to make sure we always have the latest state
        setTimer(prevCount => (prevCount + 1))
    })

   return <DeckGL
        controller={true}
        initialViewState={{ longitude: 4.418842792510986, latitude: 51.899256936515584, zoom: 18 }}
        layers={[
            tile(),

            participants(),

            graph({timer : timer}),



          new PathLayer({
            id: 'path-layer',
            data : data.features[0].geometry.coordinates,
            pickable: true,
            widthScale: 5,
            widthMinPixels: 2,
            getPath: d => d,
            getColor: d => [0,134,44, 100],
            getWidth: d => 5
        })

            ]}
    >

    </DeckGL>
}

export default Map;
