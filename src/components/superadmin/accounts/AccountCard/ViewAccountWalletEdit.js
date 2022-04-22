import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { Input, Button, Checkbox, TextField } from '@mui/material';
import gql from 'graphql-tag';

const UPDATE_WALLET = gql`
    mutation MyMutation($id: String!, $wallet_id: String!) {
        update_account_table_by_pk(pk_columns: { id: $id }, _set: { wallet_id: $wallet_id }) {
            id
        }
    }
`;

const ViewAccountWalletEdit = ({ account, refetch }) => {
    const [wallet, setWallet] = useState(account.wallet_id);

    return (
        <Mutation
            mutation={UPDATE_WALLET}
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
                        label="Wallet ID"
                        size="small"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={wallet}
                        onBlur={e => MyMutation({ variables: { id: account.id, wallet_id: e.target.value } })}
                        onChange={e => setWallet(e.target.value)}
                    />
                );
            }}
        </Mutation>
    );
};

export default ViewAccountWalletEdit;
