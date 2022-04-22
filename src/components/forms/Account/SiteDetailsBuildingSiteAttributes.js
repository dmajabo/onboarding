import React from 'react';
import { Mutation } from 'react-apollo';
import { Select, FormControl, InputLabel, OutlinedInput, MenuItem } from '@mui/material';
import gql from 'graphql-tag';

const UPDATE_BUILDING_SITE_ATTRIBUTES = gql`
    mutation MyMutation($id: uuid!, $buildingSiteAttributes: String) {
        update_account_table_by_pk(pk_columns: { id: $id }, _set: { buildingSiteAttributes: $buildingSiteAttributes }) {
            buildingSiteAttributes
        }
    }
`;

const SiteDetailsBuildingSiteAttributes = ({ account, refetch }) => {
    return (
        <Mutation
            mutation={UPDATE_BUILDING_SITE_ATTRIBUTES}
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
                        <InputLabel shrink={true}>Building Site Attributes</InputLabel>
                        <Select
                            input={<OutlinedInput notched={true} label="Building Site Attributes" />}
                            value={account.buildingSiteAttributes || ''}
                            onChange={e =>
                                MyMutation({ variables: { id: account.id, buildingSiteAttributes: e.target.value } })
                            }
                        >
                            {[
                                'Special Economic Zone (SEZ)',
                                'Near Sea',
                                'Hilltop',
                                'Residential Community',
                                'Other'
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

export default SiteDetailsBuildingSiteAttributes;
