import GL from '@luma.gl/constants';

import { CompositeLayer } from '@deck.gl/core';
import {GeoJsonLayer} from '@deck.gl/layers';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import * as turf from '@turf/turf';
import {GLTFLoader} from '@loaders.gl/gltf';
import {registerLoaders} from '@loaders.gl/core';
import {Matrix4} from "math.gl";
import { Geometry } from '@luma.gl/engine';
import * as THREE from 'three';
import rough from 'roughjs/bundled/rough.esm';

registerLoaders([GLTFLoader]);

let CustomGeometry  =  (size) => {

    const shape = new THREE.Shape();

    shape.moveTo(0, 0);
    shape.lineTo(size, 0);
    shape.lineTo(size, size  );
    shape.lineTo(0, size  );
    shape.lineTo(0, 0);

    // 3D shape (extruded)
    const geometry = new THREE.ExtrudeBufferGeometry(shape, {
        depth: size/350,
        bevelEnabled: false, bevelSegments: 8, steps: 12, bevelSize: 1, bevelThickness: 1
    });

    // face indices generation
    const indices = Array.from(Array(geometry.attributes.position.count), (x, i) => i);

    // luma.gl custom geometry
    return new Geometry({
        attributes: {
            indices: new Uint16Array(indices),
            positions: geometry.attributes.position.array,
            texCoords: geometry.attributes.uv.array,
            normals: geometry.attributes.normal.array
        },
    });

};


class CanvasDisplay {

    constructor() {
        this.canvas = document.createElement('canvas');

        this.x = 0;

        this.stageConfig = {
            width: 5000,
            height: 5000
        };

        this.canvas.width = this.stageConfig.width;
        this.canvas.height = this.stageConfig.height;

        this.rc = rough.canvas(this.canvas);
    }

    inc() {
            this.x = this.x+100;
           // console.log(this.x);
    }

    draw() {

        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.rc = rough.canvas(this.canvas);
        this.rc.ellipse(2500, 2500, 2000, 2000, {roughness: 5.0, strokeWidth : 25, stroke: 'black', seed : 1234 });
    }
}

let mesh = CustomGeometry(1);

class BuildingLayer extends CompositeLayer {

    initializeState() {
        this.setState({canvas : new CanvasDisplay( 1 ) });
    }

    shouldUpdateState(p) {
        return p.changeFlags.somethingChanged;
    }

    renderLayers() {
        const { data, id, progress,bearing } = this.props;

        if (!this.state.canvas) return [];

        this.state.canvas.inc();
        this.state.canvas.draw();

        const label2 = new SimpleMeshLayer({
            id: 'label2-layer' + id,
            data: [{coordinates : turf.center(data).geometry.coordinates }],
            texture: '/dashboard.png',
            mesh:  CustomGeometry(1),
            modelMatrix : new Matrix4().makeTranslation(0,0, 80 + (1 * 100) ),
            getPosition: d => d.coordinates,
            getOrientation : [180, (180 - bearing) + Math.random()/10000, 90],
            getTranslation : [-30, 30 , 0],
            getColor: d =>  [255,0,0],
            sizeScale : 2,
            opacity : 0.75,
            getScale : [75,75,75],
            // getOrientation : [0, 0,90]

        });

        const label3 = new SimpleMeshLayer({
            id: 'label2-layer' + id,
            data: [{coordinates : turf.center(data).geometry.coordinates }],
            texture : this.state.canvas.canvas,
            mesh:  mesh,
            //modelMatrix : new Matrix4().makeTranslation(0,0, 80 + (progress * 100) ),
            getPosition: d => d.coordinates,
            getOrientation : [180, 90, 0],
            //getTranslation : [-30, 30 , 0],
            getColor: d =>  [255,0,0],
            sizeScale : 1,
            opacity : 1,
            getScale : [75,75,75],
        });

        const building = new GeoJsonLayer({
            data : data,
            id: 'building-layer' + id,
            extruded: true,
            opacity : 0.9,
            lineWidthScale: 1,
            lineWidthMinPixels: 2,
            getFillColor: d => [90, 90, 255, 128],
            getLineColor: d => [0, 55, 180, 255],
            getRadius: 2,
            getLineWidth: 1,
            getElevation: 30,//progress * 100,

            parameters: {
                depthTest: true,
                depthMask: true,
                blend: true,
                blendEquation: GL.FUNC_ADD,
                blendFunc: [GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA]
            }

        })

        return [ building  ];
    }
}

BuildingLayer.layerName= 'BuildingLayer';

export default BuildingLayer;


