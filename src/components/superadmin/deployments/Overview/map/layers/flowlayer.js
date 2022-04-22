import GL from '@luma.gl/constants';

import { CompositeLayer } from '@deck.gl/core';

import {GeoJsonLayer} from '@deck.gl/layers';
import {ScenegraphLayer} from '@deck.gl/mesh-layers';

import * as turf from '@turf/turf';

import {GLTFLoader} from '@loaders.gl/gltf';
import {registerLoaders} from '@loaders.gl/core';

import {Matrix4} from "math.gl";
import {TripsLayer} from "@deck.gl/geo-layers";
registerLoaders([GLTFLoader]);

class Pipelayer extends CompositeLayer {

    initializeState() {

        const p = [{waypoints : this.props.data.features[0].geometry.coordinates.map((f, i) => ({timestamp : i+1, coordinates : f}))}];

       // console.log(this.props);

        this.setState({ p : p});

    }

    shouldUpdateState(p) {
        return p.changeFlags.somethingChanged;
    }

    renderLayers() {
        const { p } = this.state;
        const { data, id, progress } = this.props;

        const pipes = new TripsLayer({
            id: 'flow-layer' + id,
            data : p,
            getPath: d => d.waypoints.map(p => {
                return [
                    (p.coordinates[0]),
                    p.coordinates[1]]
            }),
            // deduct start timestamp from each data point to avoid overflow
            getTimestamps: d => d.waypoints.map(p => p.timestamp ),
            getColor: [253, 255, 54],
            opacity: 0.4,
            widthMinPixels: 1,
            rounded: false,
            trailLength: 2,
            fadeTrail : true,
            currentTime: this.props.progress * 10
        })

        return [ pipes ];
    }
}

Pipelayer.layerName= 'Pipes';

export default Pipelayer;

