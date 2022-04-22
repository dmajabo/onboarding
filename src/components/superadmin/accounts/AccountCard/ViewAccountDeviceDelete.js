import React, { useState, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Input, Button, Checkbox, TextField } from '@mui/material';
import gql from 'graphql-tag';

const DELETE_DEVICE = gql`
    mutation($id: Int!) {
        delete_mapping_table_by_pk(id: $id) {
            id
        }
    }
`;

const ViewAccountDeviceDelete = ({ device, refetch, setError }) => {
    return (
        <Mutation
            mutation={DELETE_DEVICE}
            variables={{ id: device.id }}
            onCompleted={e => {
                refetch && refetch();
            }}
            onError={e => {
                setError(e);
            }}
        >
            {(MyMutation, { loading, error }) => {
                return (
                    <Fragment>
                        <Button className="testDelete" variant={'contained'} onClick={() => MyMutation()}>
                            {' '}
                            Delete
                        </Button>
                    </Fragment>
                );
            }}
        </Mutation>
    );
};

export default ViewAccountDeviceDelete;
