import React from 'react';
import { Mutation } from 'react-apollo';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import gql from 'graphql-tag';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

const UPDATE_CONSUMPTION_TREND = gql`
    mutation($id: uuid!, $consumption_trend: String) {
        update_account_table_by_pk(pk_columns: { id: $id }, _set: { consumption_trend: $consumption_trend }) {
            id
        }
    }
`;

const ConsumptionTrend = ({ account, refetch }) => {
    return (
        <Mutation
            mutation={UPDATE_CONSUMPTION_TREND}
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
                        <InputLabel shrink={true}>Consumption Trend</InputLabel>
                        <Select
                            input={<OutlinedInput notched={true} label="Consumption Trend" />}
                            value={account.consumption_trend || ''}
                            onChange={e =>
                                MyMutation({ variables: { id: account.id, consumption_trend: e.target.value } })
                            }
                        >
                            {['Up', 'Down', 'Same', 'Dont Know'].map(s => (
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

export default ConsumptionTrend;
