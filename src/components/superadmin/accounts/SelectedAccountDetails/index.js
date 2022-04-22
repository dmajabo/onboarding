import React, { useContext, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import AccountUsers from './AccountUsers'
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

const ACCOUNT_USERS = gql`
    query ($account_id: String) {
        listAllCognitoUsers(accountId: $account_id) {
            UserId
            UserName
            UserStatus
            role {
                user_role
                termsAgreed
            }
          
        }
    }
`;

export default function AccountUsersQuery({ account, refetchForms, disabled }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>
                <Query
                    query={ACCOUNT_USERS}
                    variables={{ account_id: account.id }}
                    onError={() => alert('nope')}
                >
                    {({ data, refetch }) => {
                        return (
                            <div>

                                <Paper>

                                    <CreateUser selectedAccount={account} refetch={refetch} />
                                    {data && data.listAllCognitoUsers && <AccountUsers users={data.listAllCognitoUsers}/> }

                                </Paper>
                            </div>
                        );
                    }}
                </Query>
            </div>
        </div>
    );
}
