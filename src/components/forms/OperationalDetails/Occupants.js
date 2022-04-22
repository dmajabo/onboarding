import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { TextField } from '@mui/material';
import gql from 'graphql-tag';

const UPDATE_OCCUPANTS = gql`
    mutation MyMutation($id: uuid!, $occupants: Int) {
        update_account_table_by_pk(pk_columns: { id: $id }, _set: { occupants: $occupants }) {
            id
        }
    }
`;

const Occupants = ({ account, refetch }) => {
    const [numberOccupants, setOccupants] = useState(account.occupants);

    return (
        <Mutation
            mutation={UPDATE_OCCUPANTS}
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
                        label="Number of occupants on typical day"
                        type="number"
                        size="small"
                        variant="outlined"
                        margin="dense"
                        fullWidth={true}
                        min={0}
                        value={numberOccupants}
                        onBlur={e => MyMutation({ variables: { id: account.id, occupants: +e.target.value } })}
                        onChange={e => setOccupants(e.target.value)}
                    />
                );
            }}
        </Mutation>
    );
};

export default Occupants;
