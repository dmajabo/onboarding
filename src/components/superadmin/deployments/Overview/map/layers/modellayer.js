import { CompositeLayer } from '@deck.gl/core';
import {ScenegraphLayer} from '@deck.gl/mesh-layers';
import {GLTFLoader} from '@loaders.gl/gltf';
import {registerLoaders} from '@loaders.gl/core';

registerLoaders([GLTFLoader]);

class Model extends CompositeLayer {

    initializeState() {
    }

    shouldUpdateState(p) {
        return p.changeFlags.somethingChanged;
    }

    renderLayers() {
        const { id, index, scenegraph } = this.props;

        const model = new ScenegraphLayer({
            id: 'model' + id + ":+" + index,

            data: this.props.data.features,

            getPosition: d => d.geometry.coordinates,
            getOrientation: d => [0,180, 90],
            sizeScale : 4,
            _animations: {
                '*': {speed: 1}
            },
            _lighting: 'pbr',
            scenegraph: scenegraph,
            //modelMatrix : new Matrix4().makeTranslation(0,0,4 )
        });

        return [ model];
    }
}

Model.layerName= 'Model';

export default Model;

