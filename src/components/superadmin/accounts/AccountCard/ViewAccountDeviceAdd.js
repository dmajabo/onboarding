import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { Input, Button, Checkbox, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import gql from 'graphql-tag';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FieldSet from 'components/forms/formik-fields/FieldSet';

const INSERT_MAPPING = gql`
    mutation MyMutation($account_id: uuid) {
            insert_mapping_table_one(object: {account_id: $account_id}) {
                id
            }

    }
`;

const ViewAccountDeviceAdd = ({ account, refetch, setError }) => {

    return (
        <Mutation
            mutation={INSERT_MAPPING}
            variables={{ account_id: account.id }}
            onCompleted={e => {
                refetch && refetch();
            }}
            onError={e => {
                setError(e);
            }}
        >
            {(MyMutation, { loading, error }) => {
                return (
                    <div>

                        <Button
                            id={'deviceAdd'}
                            variant={'contained'}
                            onClick={() => {setError(null);MyMutation()}}
                        >
                            {' '}
                            Add Mapping
                        </Button>

                        {error && error.graphQLErrors.find(e => e.extensions.code === 'constraint-violation') && (
                            <Alert severity={'error'}>You must enter a unique id </Alert>
                        )}
                        {error && error.graphQLErrors.find(e => e.extensions.code !== 'constraint-violation') && (
                            <Alert severity={'error'}>{JSON.stringify(error)} </Alert>
                        )}
                    </div>
                );
            }}
        </Mutation>
    );
};

export default ViewAccountDeviceAdd;
