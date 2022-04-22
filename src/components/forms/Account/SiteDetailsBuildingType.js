import React from 'react';
import { Mutation } from 'react-apollo';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import gql from 'graphql-tag';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

const UPDATE_BUSINESS_TYPE = gql`
    mutation MyMutation($id: uuid!, $buildingType: String) {
        update_account_table_by_pk(pk_columns: { id: $id }, _set: { buildingType: $buildingType }) {
            buildingType
        }
    }
`;

const SiteDetailsBuildingType = ({ account, refetch }) => {
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
                        <InputLabel shrink={true}>Building Type</InputLabel>
                        <Select
                            input={<OutlinedInput notched={true} label="Building Type" />}
                            value={account.buildingType || ''}
                            onChange={e => MyMutation({ variables: { id: account.id, buildingType: e.target.value } })}
                        >
                            {['Single-storey Independent', 'Multi-storey Independent', 'Flat', 'Shop'].map(s => (
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

export default SiteDetailsBuildingType;
