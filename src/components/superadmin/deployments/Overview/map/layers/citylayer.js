
import React, {useState} from 'react';

import { CompositeLayer } from '@deck.gl/core';
import {MVTLayer,} from '@deck.gl/geo-layers';
import { SolidPolygonLayer, GeoJsonLayer, PathLayer } from '@deck.gl/layers';

class CityLayer extends CompositeLayer {

    shouldUpdateState({ changeFlags }) {
        return changeFlags.somethingChanged;
    }

    updateState({ props, oldProps, changeFlags }) {
        const { viewport } = this.context;
    }

    renderLayers() {
        const { zoom } = this.state;

        return  [
            new MVTLayer({

                updateTriggers: {
                    renderSubLayers: zoom
                },

                data: `https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw`,
                pointRadiusUnits: 'pixels',
                getLineColor: [128, 128, 128, 255],
                getLineWidth: 1,
                getFillColor: [0, 255, 231, 64],

                renderSubLayers: (props) => {
                    return [
                        new GeoJsonLayer({
                            ...props,
                            id: `${props.id}_point`,
                            getFillColor: (d) => {
                                if (d.properties.type === 'building') return [255,255,0,128] ;
                                return [0, 0, 255, 0]},
                           // getRadius: 1,
                            extruded : true,
                            getElevation : () => {
                             return 5
                            }
                        })
                    ]
                },
            })
        ]
    }
}

CityLayer.layerName= 'CityLayer';

export default CityLayer;

