import React, { Fragment, useState } from 'react';
import { Input, Button, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import { Mutation } from 'react-apollo';
import Editor from './Editor'
import DeleteLayer from './DeleteLayer'
import gql from 'graphql-tag';

const ADD_MAP_LAYER = gql`
    mutation($type : String, $label : String, $data : jsonb ) {
        insert_map_layer_table_one(object: {name : $type, label : $label, data: $data}) {
            id
        }
    }
`;

export default function ({ layers, refetch }) {

    const [drawerOpen, setDrawerOpen]   = useState(false);
    const [type, setType]               = useState('Map');
    const [label, setLabel]             = useState('');
    const [data, setData]               = useState(null);

    return (
        <Mutation
            mutation={ADD_MAP_LAYER}
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

                        <a onClick={() => setDrawerOpen(true)}> Edit Layers </a>

                        <Drawer
                            anchor={'right'}
                            PaperProps={{
                                sx: { width: "30%" },
                            }}
                            open={drawerOpen}
                            onClose={() => setDrawerOpen(false)}
                        >

                            <Select value={type} onChange={(e)=> setType(e.target.value)}>
                                <MenuItem value={'WindLayer'}>WindLayer</MenuItem>
                                <MenuItem value={'FlowLayer'}>FlowLayer</MenuItem>
                                <MenuItem value={'PipeLayer'}>PipeLayer</MenuItem>
                                <MenuItem value={'ModelLayer'}>ModelLayer</MenuItem>
                                <MenuItem value={'CityLayer'}>CityLayer</MenuItem>
                            </Select>

                            <Editor onChange={setData} html={data}/>

                            <Input placeholder='Enter a layer label' value={label} onChange={(e) => setLabel(e.target.value)}/>



                            <Button
                                variant={'outlined'}
                                style={{marginBottom : '5px'}}
                                onClick={() => {
                                    MyMutation({variables : {type : type, data : JSON.parse(data), label : label}}).then(x => {
                                        setLabel('');
                                        setData('');
                                        setDrawerOpen(false);
                                        refetch();
                                    });
                                }}
                            >
                                Add Layer
                            </Button>

                            <ul>
                                {layers.map(l => <li> {l.label} <DeleteLayer layer={l} refetch={refetch}/> </li>)}
                            </ul>

                        </Drawer>

                    </Fragment>
                );
            }}
        </Mutation>
    );
}
