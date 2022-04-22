import React from 'react';
import { Mutation } from 'react-apollo';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import gql from 'graphql-tag';

const UPDATE_TENANT_TYPE = gql`
    mutation($id: uuid!, $tenant_type: String) {
        update_account_table_by_pk(pk_columns: { id: $id }, _set: { tenant_type: $tenant_type }) {
            id
        }
    }
`;

const TenacyType = ({ account, refetch }) => {
    return (
        <Mutation
            mutation={UPDATE_TENANT_TYPE}
            onCompleted={e => {
                refetch && refetch();
            }}
            onError={e => {
                alert(JSON.stringify(e));
            }}
        >
            {(MyMutation, { loading, error }) => {
                return (
                    <FormControl fullWidth={true} margin="dense" size="small">
                        <InputLabel shrink={true}>Tenancy Type</InputLabel>
                        <Select
                            input={<OutlinedInput notched={true} label="Tenancy Type" />}
                            value={account.tenant_type || ''}
                            onChange={e => MyMutation({ variables: { id: account.id, tenant_type: e.target.value } })}
                        >
                            {['Individuals', 'Business'].map(s => (
                                <MenuItem key={s} value={s}>
                                    {s}{' '}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );
            }}
        </Mutation>
    );
};

export default TenacyType;
