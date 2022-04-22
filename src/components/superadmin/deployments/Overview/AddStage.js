import React, { Fragment, useState } from 'react';
import { Input, Button, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_MAP_STAGE = gql`
    mutation($type : String, $viewState : jsonb ) {
        insert_map_scene_table_one(object: {type : $type, duration : 500, light: [5,5,5], selected_account_id: null, title: "this is a test", viewstate: $viewState}) {
            id
        }
    }
`;

export default function ({ stage, setStage, refetch }) {

    const [type, setType] = useState('Map');

    const OrbitVS = {
        maxRotationX: 180,
        maxZoom: 20,
        minRotationX: -180,
        minZoom: -20,
        rotationOrbit: 0,
        rotationX: 0,
        target: [0,0,0],
        zoom:2
    }

    return (
        <Mutation
            mutation={ADD_MAP_STAGE}
            onCompleted={(e) => {
                refetch && refetch();
            }}
            onError={(e) => {
                alert(e);
            }}
        >
            {(MyMutation, { loading, error }) => {
                //if (loading) return null;

                return (
                    <Fragment>

                        <Select value={type} onChange={(e)=> setType(e.target.value)}>
                            <MenuItem value={'Map'}>Map</MenuItem>
                            <MenuItem value={'Orbit'}>Orbit</MenuItem>
                        </Select>

                        <Button
                            variant={'outlined'}
                            style={{marginBottom : '5px'}}
                            onClick={() => {
                                const vs = type === 'Map' ? {longitude : 0, latitude : 50, zoom : 12} : OrbitVS;
                                MyMutation({variables : {type : type, viewState : vs}}).then(() => setStage(stage + 1));
                            }}
                        >
                            Add Stage
                        </Button>

                    </Fragment>
                );
            }}
        </Mutation>
    );
}
