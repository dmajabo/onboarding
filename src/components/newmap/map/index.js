/* eslint-disable import/no-extraneous-dependencies */
import React, {Component, useContext, useEffect, useRef, useState} from 'react';
import {LinearInterpolator, MapController} from '@deck.gl/core';

import DeckMap from './../../../pages/login/map'
import { DarkThemeContext } from '../../../contexts/DarkThemeContext';
import styles from './map.module.scss';
import _ from "lodash";
import tile from "../../superadmin/accounts/AccountCard/AccountMap/tilelayer";
import {PathLayer} from "@deck.gl/layers";

const INIT = {
  altitude: 1.5,
  bearing: 26.74285714285714,
  height: 831,
  latitude: 51.92122568359495,
  longitude: 4.1135988487966655,
  maxPitch: 90,
  maxZoom: 20,
  minPitch: 0,
  minZoom: 0,
  pitch: 7.762483775056824,
  zoom: 10,
  transitionDuration: 5000,
  transitionInterpolator: new LinearInterpolator()
};

class MapHolder extends Component {

  state = { viewState : INIT};
  constructor(props) {
    super(props);
    this.debounce  = _.debounce(e => e(), 300);
  }

  render() {

    const {offset, className } = this.props;

    console.log(this.state.viewState);

    return (
        <div>
            <DeckMap offset={offset} viewState={this.state.viewState} setViewState={(e) => this.setState({viewState : e.viewState})}/>
        </div>
    );
  }
}

export default MapHolder;
