import React, { useContext, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import AccountUsers from '../SelectedAccountDetails/AccountUsers'
import { Paper } from '@mui/material';
import CreateUser from './../../../users/CreateUser'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop : '10px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const ACCOUNT_WALLET = gql`
    query($account_id : uuid!) {
      getWallet(walletId : $account_id) {
        balanceEuro
        balanceKWH
      }
    }
`;

export default function AccountWalletQuery({ account }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>
                <Query
                    query={ACCOUNT_WALLET}
                    variables={{ account_id: account.id }}
                    onError={() => alert('nope')}
                >
                    {({ data, refetch }) => {
                        return (
                            <div>
                                {JSON.stringify(data)}
                            </div>
                        );
                    }}
                </Query>
            </div>
        </div>
    );
}
