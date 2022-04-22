import { CompositeLayer } from '@deck.gl/core';
import {ScenegraphLayer} from '@deck.gl/mesh-layers';
import * as turf from '@turf/turf';
import {GLTFLoader} from '@loaders.gl/gltf';
import {registerLoaders} from '@loaders.gl/core';

registerLoaders([GLTFLoader]);

class WindPark extends CompositeLayer {

    shouldUpdateState(p) {
        return p.changeFlags.somethingChanged;
    }

    renderLayers() {
        const { } = this.state;

        const cellSize = 1.5, extent = [  3.8809204101562504, 52.02630359694801,   3.9825439453125, 52.0862573323384];

        var options = {units: 'kilometers'};

        var grid = turf.pointGrid(extent, cellSize, options);

        const assets = [].concat(grid.features.map((f, i ) => ({id : i, model : '/assets/solarpanel_01.glb', 'coordinates' : f.geometry.coordinates})));

        const wind = new ScenegraphLayer({
            id: 'wind',
            data: assets,
            getPosition: d => d.coordinates,
            getOrientation: d => [0,180, 90],
            sizeScale : 1,
            _animations: {
                '*': {speed: 1}
            },
            _lighting: 'pbr',
            scenegraph: '/assets/windturbine.glb'
        });

        return [ wind];
    }
}

WindPark.layerName= 'WindPark';

export default WindPark;

