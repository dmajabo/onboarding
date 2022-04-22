import React, {Fragment, useContext, useState} from "react"
import { Row, Col, } from 'antd';
import { LinearInterpolator} from 'deck.gl';
import Map from './map/Map'
import Lighting from './map/controls/Lighting'
import MiniMap from './map/../minimap'
import { Slider, Button} from '@material-ui/core'
import StageTable from './Table'
import AddLayer from './AddLayer'
import Query from './Query'
import useInterval from './../../../../hooks/useInterval'
import {ApolloProviderContext} from "../../../providers/ApolloProvider";
const p =  {transitionInterpolator: new LinearInterpolator()};

function App({segment}) {

    const [cameraIndex, setCameraIndex] = useState(60);
    const [stage, setStage]             = useState(0);
    const [timer, setTimer]             = useState(0);
    const [editMode, setEditMode]       = useState(false);

    const [zoom]                        = useState(false);
    const [intensity, setIntensity]                   = useState(1.0);
    const [elevation]                   = useState(0);
    const [features, setFeatures]       = useState([]);
    const [lighting, setLighting]       = useState([-2.47,3.13,-0.02]);

    const { client }  = useContext(ApolloProviderContext);

    useInterval(
        () => {
            setTimer(timer + 0.02)
            if (timer > 1) setTimer(0);
        },
        // Delay in milliseconds or null to stop it
        1/30
    )

    return (

        <Row>
            <Col span={24}>

                <Query>
                    {({ data, loading,  refetch }) => {
                        if (loading || !data) return "Loading";

                        const layers = data.map_layer_table;

                        return <div>

                            {editMode && <AddLayer layers={layers} refetch={refetch}/>}

                            <div style={{border : '5px solid orange', position : 'relative', left : 0, top : 0}}>

                                <Map accounts={data.account_table} lighting={lighting} refetch={refetch} client={client} layers={layers} stage={data.map_scene_table[stage]} progress={timer} zoom={zoom} elevation={elevation} intensity={intensity} save={() => {}} cameraIndex={cameraIndex} setCameraIndex={setCameraIndex}  segment={segment} features={features} setFeatures={setFeatures}/>

                                {/*<div style={{position : 'absolute', left : 0, top : 0}}>*/}
                                {/*    <MiniMap isWind={true} viewState={{*/}
                                {/*        altitude: 1.5,*/}
                                {/*        bearing: -48.24000000000001,*/}
                                {/*        latitude: 52.05701845495864,*/}
                                {/*        longitude: 3.9303303875320306,*/}
                                {/*        maxPitch: 60,*/}
                                {/*        maxZoom: 20,*/}
                                {/*        minPitch: 0,*/}
                                {/*        minZoom: 0,*/}
                                {/*        pitch: 56.46925147014851,*/}
                                {/*        zoom: 15.284369404269974*/}
                                {/*    }}/>*/}
                                {/*</div>*/}

                                {/*<div style={{position : 'absolute', right : 0, top : 0}}>*/}
                                {/*    <MiniMap isWind={false} viewState={{*/}
                                {/*        altitude: 1.5,*/}
                                {/*        bearing: -48.24000000000001,*/}
                                {/*        latitude: 52.05887922746588,*/}
                                {/*        longitude: 3.932093562131734,*/}
                                {/*        maxPitch: 60,*/}
                                {/*        maxZoom: 20,*/}
                                {/*        minPitch: 0,*/}
                                {/*        minZoom: 0,*/}
                                {/*        normalize: undefined,*/}
                                {/*        pitch: 56.46925147014851,*/}
                                {/*        position: (3) [0, 0, 0],*/}
                                {/*        zoom: 14.187566059548562*/}
                                {/*    }}/>*/}
                                {/*</div>*/}

                            </div>

                            {editMode && <Fragment>
                            <Lighting lighting={lighting} setLighting={setLighting}/>

                            <Slider min={0} max={1} step={0.000001 } value={intensity} onChange={(_, v) => setIntensity(v)}/>

                            <StageTable stage={stage} setStage={setStage} refetch={refetch} stages={data.map_scene_table}/>

                            Stage : {stage}
                            </Fragment> }
                        </div>
                    }}
                </Query>

                {/*<Slider min={0} max={2} value={stage} onChange={(v) => {setStage(v.target.value); stages[stage] && setViewState(stages[v.target.value].viewState)}}/>*/}



            </Col>
        </Row>

    )
}

export default App
