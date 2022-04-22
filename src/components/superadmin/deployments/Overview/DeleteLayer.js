import React, { Fragment, useState } from 'react';
import { Input, Button, Checkbox } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const DELETE_MAP_LAYER = gql`
    mutation($id : uuid!) {
        delete_map_layer_table_by_pk(id: $id) {
            id
        }
    }
`;

export default function ({ refetch, layer  }) {

    return (
        <Mutation
            mutation={DELETE_MAP_LAYER}
            variables={{id : layer.id}}
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

                        <a
                            onClick={() => {
                                MyMutation();
                            }}
                        >
                            Delete
                        </a>

                    </Fragment>
                );
            }}
        </Mutation>
    );
}
