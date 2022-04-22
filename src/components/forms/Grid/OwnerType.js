import React from 'react';
import { Mutation } from 'react-apollo';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import gql from 'graphql-tag';

const UPDATE_OWNERTYPE = gql`
    mutation($id: uuid!, $owner_type: String) {
        update_account_table_by_pk(pk_columns: { id: $id }, _set: { owner_type: $owner_type }) {
            id
        }
    }
`;

const OwnerType = ({ account, refetch }) => {
    return (
        <Mutation
            mutation={UPDATE_OWNERTYPE}
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
                        <InputLabel shrink={true}>Ultimate beneficial owner type</InputLabel>
                        <Select
                            input={<OutlinedInput notched={true} label="Ultimate beneficial owner type" />}
                            value={account.owner_type || ''}
                            onChange={e => MyMutation({ variables: { id: account.id, owner_type: e.target.value } })}
                        >
                            {[
                                'Individual',
                                'Stock Quoted Company',
                                'Government Organization',
                                'Private Organization'
                            ].map(s => (
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

export default OwnerType;
