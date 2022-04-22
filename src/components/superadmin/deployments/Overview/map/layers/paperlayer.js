import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer} from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';
import {IconLayer} from '@deck.gl/layers';

import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import GL from '@luma.gl/constants';
import {CustomGeometry} from "./CustomGeometry";

const plane = new CustomGeometry({size : 1, m : 1.03, holed  : false});

export default class PaperLayer extends CompositeLayer {

    initializeState() {

        let self = this;

    }

    finalizeState() {
        super.finalizeState();
    }

    renderLayers() {
        const {   id } = this.props;

        const data = [{angle : 0, position : [0,0,0]}]

        return [

            new SimpleMeshLayer({
                id: 'paper' + id,
                getOrientation: d => [0, 0,180],
                getScale: [100,100,1],
                opacity: 1,
                data : data,
                mesh: plane,
                getPosition: d => d.position,
                texture : '/assets/paper.webp',
                material : {
                    ambient: 0.5,
                    diffuse: 0.5,
                    shininess: 0.12,
                    specularColor: [255, 255, 255]
                },
                parameters: {
                    depthTest: true,
                    depthMask: true,
                    blend: true,
                    //blendEquation: GL.FUNC_ADD,
                    //blendFunc: [GL.ONE, GL.ONE_MINUS_SRC_COLOR]
                }
            }),


            new SimpleMeshLayer({
                id: 'writing' + id,
                getOrientation: d => [0, 0,180],
                getTranslation : [0,0,0.001],
                getScale: [100,100,1],
                opacity: 0.0,
                data : data,
                mesh: plane,
                getPosition: d => d.position,
                texture : '/assets/text.png',
                xmaterial : {
                    ambient: 1,
                    diffuse: 0.5,
                    shininess: 0.5,
                    specularColor: [255, 255, 255]
                },
                parameters: {
                    depthTest: true,
                    depthMask: true,
                    blend: true,
                  //  blendEquation: GL.FUNC_ADD,
                  //  blendFunc: [GL.ONE, GL.ONE_MINUS_SRC_COLOR]
                }
            }),

        ];
    }
}

PaperLayer.componentName = 'PaperLayer';
