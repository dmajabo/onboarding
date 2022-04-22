import { BitmapLayer } from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';
import { COORDINATE_SYSTEM } from "@deck.gl/core"

const Tiles = (props) => new TileLayer({
    ...props,
    data: [
       'https://api.mapbox.com/styles/v1/mogmog/ckieixow83oxw19nzifvfjzjj/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw',
    ],

    maxRequests: 20,
    pickable: false,
    minZoom: 0,
    maxZoom: 20,

    renderSubLayers: props => {
        const {
            bbox: {west, south, east, north}
        } = props.tile;

        return [
            new BitmapLayer(props, {
                data: null,

                // material : {
                //     ambient: 0.35,
                //     diffuse: 0.6,
                //     shininess: 32,
                //     specularColor: [30, 30, 30]
                // },

                image: props.data,
                bounds: [west, south, east, north],
                desaturate : 0,
                _imageCoordinateSystem: COORDINATE_SYSTEM.CARTESIAN
            }),

        ];
    }
})


export default Tiles;
