import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { TextField } from '@mui/material';
import gql from 'graphql-tag';

const UPDATE_TENANCY = gql`
    mutation MyMutation($id: uuid!, $number_tenants: Int) {
        update_account_table_by_pk(pk_columns: { id: $id }, _set: { number_tenants: $number_tenants }) {
            id
        }
    }
`;

const TenacyNumbers = ({ account, refetch }) => {
    const [numberTenants, setNumberTenants] = useState(account.number_tenants);

    return (
        <Mutation
            mutation={UPDATE_TENANCY}
            onCompleted={e => {
                refetch && refetch();
            }}
            onError={e => {
                alert(JSON.stringify(e));
            }}
        >
            {(MyMutation, { loading, error }) => {
                return (
                    <TextField
                        label="Number of Tenants"
                        type={'number'}
                        size={'small'}
                        variant={'outlined'}
                        margin="dense"
                        fullWidth={true}
                        min={0}
                        value={numberTenants}
                        onBlur={e => MyMutation({ variables: { id: account.id, number_tenants: +e.target.value } })}
                        onChange={e => setNumberTenants(e.target.value)}
                    />
                );
            }}
        </Mutation>
    );
};

export default TenacyNumbers;
