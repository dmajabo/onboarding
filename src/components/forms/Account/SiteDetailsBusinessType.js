import React from 'react';
import { Mutation } from 'react-apollo';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import gql from 'graphql-tag';

const UPDATE_BUSINESS_TYPE = gql`
    mutation MyMutation($id: uuid!, $businessType: String) {
        update_account_table_by_pk(pk_columns: { id: $id }, _set: { businessType: $businessType }) {
            businessType
        }
    }
`;

const SiteDetailsBusinessType = ({ account, refetch }) => {
    return (
        <Mutation
            mutation={UPDATE_BUSINESS_TYPE}
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
                        <InputLabel shrink={true}>Business Type</InputLabel>
                        <Select
                            input={<OutlinedInput notched={true} label="Business Type" />}
                            value={account.businessType || ''}
                            onChange={e => MyMutation({ variables: { id: account.id, businessType: e.target.value } })}
                        >
                            {['Manufacturing', 'Construction', 'Offices', 'Warehouse', 'Cold-Storage', 'Other'].map(
                                s => (
                                    <MenuItem key={s} value={s}>
                                        {s}{' '}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                );
            }}
        </Mutation>
    );
};

export default SiteDetailsBusinessType;
