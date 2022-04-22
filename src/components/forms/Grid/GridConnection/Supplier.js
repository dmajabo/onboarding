import React, { Fragment } from 'react';
import { Mutation, Query } from 'react-apollo';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import gql from 'graphql-tag';

const ELECTRICTY_SUPPLIERS = gql`
    query {
        energy_supplier_table(where: { type: { _eq: "ELECTRICITY" } }) {
            id
            name
        }
    }
`;

const UPDATE_SUPPLIER = gql`
    mutation($id: uuid!, $supplier_id: uuid) {
        update_account_table_by_pk(pk_columns: { id: $id }, _set: { energy_supplier_id: $supplier_id }) {
            id
        }
    }
`;

const Supplier = ({ account, refetch }) => {
    return (
        <Query query={ELECTRICTY_SUPPLIERS} onError={() => alert('nope')}>
            {({ data, loading }) => {
                if (!data || loading) return null;

                return (
                    <Fragment>
                        <Mutation
                            mutation={UPDATE_SUPPLIER}
                            onCompleted={e => {
                                refetch && refetch();
                            }}
                        >
                            {(MyMutation, { loading, error }) => {
                                return (
                                    <FormControl fullWidth={true} margin="dense" size="small">
                                        <InputLabel shrink={true}>Supplier</InputLabel>
                                        <Select
                                            input={<OutlinedInput notched={true} label="Supplier" />}
                                            value={account?.energy_supplier?.id || ''}
                                            onChange={e =>
                                                MyMutation({
                                                    variables: { id: account.id, supplier_id: e.target.value }
                                                })
                                            }
                                        >
                                            {data.energy_supplier_table.map(s => (
                                                <MenuItem key={s} value={s.id}>
                                                    {s.name}{' '}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                );
                            }}
                        </Mutation>
                    </Fragment>
                );
            }}
        </Query>
    );
};

export default Supplier;
