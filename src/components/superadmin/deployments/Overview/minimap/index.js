import React, { Component } from 'react';
import DeckGL from '@deck.gl/react';
import _ from "lodash";

import tile from "./tilelayer";
import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import {AmbientLight, DirectionalLight, LightingEffect} from "@deck.gl/core"
import WindParkLayer from "../map/layers/windgridlayer";
import {Matrix4} from "math.gl";

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = this.props;
        this.debounce  = _.debounce(e => e(), 300);
    }

    render() {

       //console.log(this.state)
        // create directional light source
        const directionalLight = new DirectionalLight({
            color: [255, 255, 255],
            intensity: 1,
            direction: [2,2,2]
        });

        // create ambient light source
        const ambientLight = new AmbientLight({
            color: [255, 255, 255],
            intensity: 0.5
        });

        const windgrid = new WindParkLayer();

        const battery = new ScenegraphLayer({
            id: 'battery',

            data: [1],
            _lighting: 'pbr',
            getPosition: d => [3.9346607847754194, 52.057481147413476],
            getOrientation: d => [0,0, 90],
            sizeScale : 40,
            _animations: {
                '*': {speed: 1}
            },
            scenegraph: '/assets/battery2.glb',
            modelMatrix : new Matrix4().makeTranslation(0,0,80 )
        });
        //console.log(this.state.viewState);
        return (
            <div>

                <div style={{border : '3px solid white', position : 'relative', margin : '20px', width : '140px', height : '140px'}} >

                    <DeckGL
                        controller={true}

                        effects={ [
                            new LightingEffect({ambientLight, directionalLight}),

                        ]}
                        height="100%"
                        width="100%"
                        pickingRadius={ 10 }

                        layers={[
                              tile(),
                            this.props.isWind ? windgrid : battery


                        ]}
                        onViewStateChange={(e) => {
                            this.setState({ viewState : e.viewState});
                        }}

                        viewState={this.state.viewState}
                    >

                    </DeckGL>

                </div>
            </div>
        );
    }
}

export default Map;
