import { BitmapLayer } from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';

const Tiles = (props) => new TileLayer({
    ...props,
    data: [
        'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
    ],

    // Since these OSM tiles support HTTP/2, we can make many concurrent requests
    // and we aren't limited by the browser to a certain number per domain.
    maxRequests: 20,

    pickable: true,

    highlightColor: [60, 60, 60, 40],
    // https://wiki.openstreetmap.org/wiki/Zoom_levels
    minZoom: 0,
    maxZoom: 19,

    renderSubLayers: props => {
        const {
            bbox: {west, south, east, north}
        } = props.tile;

        return [
            new BitmapLayer(props, {
                data: null,
                image: props.data,
                bounds: [west, south, east, north],
                desaturate : 1
            }),

        ];
    }
})


export default Tiles;
