import React from 'react';
import { Mutation } from 'react-apollo';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import gql from 'graphql-tag';

const UPDATE_ELECTRIFICATION = gql`
    mutation($id: uuid!, $expected_electricification: String) {
        update_account_table_by_pk(
            pk_columns: { id: $id }
            _set: { expected_electricification: $expected_electricification }
        ) {
            id
        }
    }
`;

const Electrification = ({ account, refetch }) => {
    return (
        <Mutation
            mutation={UPDATE_ELECTRIFICATION}
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
                        <InputLabel shrink={true}>Additional electrification anticipated in the future?</InputLabel>
                        <Select
                            input={
                                <OutlinedInput
                                    notched={true}
                                    label="Additional electrification anticipated in the future?"
                                />
                            }
                            value={account.expected_electricification || ''}
                            onChange={e =>
                                MyMutation({
                                    variables: { id: account.id, expected_electricification: e.target.value }
                                })
                            }
                        >
                            {['Yes', 'No'].map(s => (
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

export default Electrification;
