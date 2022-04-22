import React, { Fragment, useState } from 'react';
import { Input, Button, Checkbox } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const DELETE_MAP_STAGE = gql`
    mutation($id : Int!) {
        delete_map_scene_table_by_pk(id: $id) {
            id
        }
    }
`;

export default function ({ refetch, stage, setStage }) {

    return (
        <Mutation
            mutation={DELETE_MAP_STAGE}
            variables={{id : stage.id}}
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

                        <Button
                            variant={'outlined'}
                            style={{marginBottom : '5px'}}
                            id={'addDeployment'}
                            onClick={() => {
                                MyMutation();
                                setStage(stage -1);
                            }}
                        >
                            Delete
                        </Button>

                    </Fragment>
                );
            }}
        </Mutation>
    );
}
