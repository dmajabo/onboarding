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

        const line = new GeoJsonLayer({
            data : data,
            id: 'line-layer' + id,
            extruded: true,
            opacity : 0.8,
            lineWidthScale: 1,
            lineWidthMinPixels: 1,
            getFillColor: d => [90, 90, 255, 128],
            getLineColor: d => [0, 55, 180, 255],
            getRadius: 2,
            getLineWidth: 1,
            getElevation: progress * 100,

            parameters: {
                depthTest: true,
                depthMask: true,
                blend: true,
                blendEquation: GL.FUNC_ADD,
                blendFunc: [GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA]
            }

        })

        const pipes = new TripsLayer({
            id: 'pipe-layer' + id,
            data : p,
            getPath: d => d.waypoints.map(p => {
                return [ (p.coordinates[0]), p.coordinates[1]]
            }),
            getTimestamps: d => d.waypoints.map(p => p.timestamp),
            getColor: [0, 200, 200],
            opacity: 0.5,
            widthMinPixels: 1,
            getLineWidth: 1,
            // rounded: true,
            fadeTrail : true,
            trailLength : 1,
            currentTime: (this.props.progress  * 10)
        });

        return [ line, pipes ];
    }
}

Pipelayer.layerName= 'Pipes';

export default Pipelayer;

