import React, {Component} from 'react';
import DeckGL from '@deck.gl/react';
import _ from "lodash";
import {OrbitView, COORDINATE_SYSTEM} from '@deck.gl/core';
import {PostProcessEffect} from '@deck.gl/core';
import {brightnessContrast, tiltShift} from '@luma.gl/shadertools';

import tile from "./layers/tilelayer";
import BuildingLayer from "./layers/buildinglayer";
import WindParkLayer from "./layers/windgridlayer";
import PipeLayer from "./layers/pipelayer";
import FlowLayer from "./layers/flowlayer";
import PaperLayer from "./layers/paperlayer";
import ModelLayer from "./layers/modellayer";
import CityLayer from "./layers/citylayer";

import {LightingEffect, MapView, DirectionalLight, AmbientLight, MapController, OrbitController} from "@deck.gl/core"
import  { LinearInterpolator  } from "deck.gl";
import gql from "graphql-tag";

const UPDATE_STAGES = gql`
    mutation($id : Int!, $viewstate : jsonb) {
        update_map_scene_table_by_pk(pk_columns: {id: $id}, _set: {viewstate: $viewstate}) {
            id
        }
    }

`;

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {viewState : this.props.stage?.viewstate ? this.props.stage.viewstate : {longitude : 0, latitude : 50, zoom : 1}};
        this.debounce  = _.debounce(e => e(), 300);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.stage && prevProps.stage && prevProps.stage.id !== this.props.stage.id) {

            this.setState({viewState : {...this.props.stage.viewstate,  transitionDuration: this.props.stage.duration,
                    //transitionInterpolator: new LinearInterpolator()
                    }});
        }
    }

    render() {

        let that = this;

        if (!that.props.stage) return null;

        class _OrbitController extends OrbitController {
            handleEvent(event) {

                super.handleEvent(event);

                if ((event.type === 'panend' || event.type === 'wheel' )) {

                    that.debounce(() =>  that.props.client.mutate(
                        {

                            mutation : UPDATE_STAGES,
                            variables : {id : that.props.stage.id, viewstate : this.controllerState._viewportProps}}).then(x => {
                        that.props.refetch();
                    }));
                }
            }
        }


        class _MapController extends MapController {
            handleEvent(event) {

                super.handleEvent(event);

                if ((event.type === 'panend' || event.type === 'wheel' )) {

                    that.debounce(() =>  that.props.client.mutate(
                        {

                            mutation : UPDATE_STAGES,
                            variables : {id : that.props.stage.id, viewstate : this.controllerState._viewportProps}}).then(x => {
                            that.props.refetch && that.props.refetch();
                    }));
                }
            }
        }

        // create directional light source
        const directionalLight = new DirectionalLight({
            color: [255, 255, 255],
            intensity: this.props.intensity,
            direction: this.props.lighting
        });

        // create ambient light source
        const ambientLight = new AmbientLight({
            color: [255, 255, 255],
            intensity: 1
        });

        const postProcessEffect = new PostProcessEffect(tiltShift, {
            blurRadius : 10,
            gradientRadius : 4,
            'start.x' : 0.5,
            'start.y' : 0.0,
            'end.x' : 0.6,
            'end.y' : 0,
        });

        const makeLayer = (l) => {
            //if (l.name === 'BuildingLayer')     return new BuildingLayer({ bearing : this.state.viewState.bearing, id : l.id, data : l.data, progress : this.props.progress });
           // if (l.name === 'WindLayer')         return new WindParkLayer();
            if (l.name === 'FlowLayer')         return new FlowLayer({ id : l.id,data : l.data, progress : this.props.progress});
            if (l.name === 'PipeLayer')         return new PipeLayer({ id : l.id,data : l.data, progress : this.props.progress});
            if (l.name === 'PaperLayer')        return new PaperLayer({ id : l.id,data : l.data, progress : this.props.progress});
            if (l.name === 'ModelLayer')        return new ModelLayer({ id : l.id,data : l.data, index : 0, scenegraph : '/assets/carport.glb', progress : this.props.progress});
            //if (l.name === 'CityLayer')         return new CityLayer({ id : l.id,data : l.data, index : 0, scenegraph : '/assets/carport.glb', progress : this.props.progress});

            return null;
        }

        const lerpViewState = new LinearInterpolator().interpolateProps(this.state.viewState,
            {...this.state.viewState, zoom : 20},
            this.props.progress);

        const account_buildings = this.props.accounts.map(a => new BuildingLayer({ bearing : this.state.viewState.bearing, id : a.id, data : a.geojson, progress : this.props.progress }))
        const all_other_layers = this.props.layers.filter(l => l.visible).map(makeLayer).concat(account_buildings);

        const layers = this.props.stage.type === 'Map' ? [tile()].concat(all_other_layers) : all_other_layers;

        return (
            <div>

            <div style={{position : 'relative', height : '550px'}} >

                <DeckGL
                    controller={this.props.stage.type !== 'Map' ? _OrbitController : _MapController }
                    effects={ [
                        new LightingEffect({directionalLight, ambientLight}),
                    ]}
                    height="100%"
                    width="100%"
                    pickingRadius={ 10 }
                    layers={layers}
                    onViewStateChange={(e) => {
                        this.setState({ viewState : e.viewState});
                    }}

                    viewState={this.state.viewState}
                    ref={this.props.deck}
                >

                </DeckGL>

            </div>
            </div>
        );
    }
}

export default Map;
