import React, { Component } from 'react';
import DeckGL from '@deck.gl/react';
import {MapController, LinearInterpolator, FlyToInterpolator} from '@deck.gl/core';
import _ from "lodash";
import tile from "./tilelayer";
import {PathLayer,GeoJsonLayer} from "@deck.gl/layers";

class MapHolder extends Component {

    constructor(props) {
        super(props);
        // this.state = {};
        this.debounce  = _.debounce(e => e(), 300);
    }

    render() {

        let that = this;

        class Controller extends MapController {
            handleEvent(event) {

                super.handleEvent(event);

                if ((event.type === 'panend' || event.type === 'wheel' )) {

                    that.debounce(() => that.props.saveMap({variables : {account_id : that.props.account.id, viewstate : this.controllerState._viewportProps}}));

                }
            }
        }

        let controller = Controller;

        return (
            <div style={{position : 'relative', height: '150px', width : 'auto'}}>

                <DeckGL
                    controller={controller}
                    height="100%"
                    width="100%"
                    pickingRadius={ 10 }
                    layers={[



                        tile(),

                        new GeoJsonLayer({
                            id: 'path-layer',
                            data : this.props.account.geojson,
                            pickable: true,
                            widthScale: 1,
                            stroked: true,
                            filled: false,
                            lineWidthMinPixels: 6,
                            getLineColor: [232, 133, 64, 170],
                            getLineWidth: 1,
                            widthMinPixels: 1,
                        })
                    ] }
                    onViewStateChange={(e) => {
                        this.props.setViewState(e.viewState)
                    }}
                    viewState={this.props.viewState}
                    ref={deck => {
                        this.deckGL = deck;
                    }}
                >

                </DeckGL>

            </div>
        );
    }
}

export default MapHolder;
