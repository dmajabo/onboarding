import React, { useContext, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Paper } from '@mui/material';
import CreateUser from '../CreateUser';
import SelectedUser from '../SelectedUser';
import UserList from '../UserList';

import { UserContext } from '../../providers/UserProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const SITE_USERS_WITH_FORMS = gql`
    query ($account_id: String) {
        listAllCognitoUsers(accountId: $account_id) {
            UserId
            UserName
            UserStatus
            role {
                user_role
            }
        }
    }
`;

export default function UsersTab({ selectedAccount }) {
    const classes = useStyles();
    const [selectedUser, setSelectedUser] = useState(null);

    const { user } = useContext(UserContext);

    return (
        <div className={classes.root}>
            <div>
                <Query
                    query={SITE_USERS_WITH_FORMS}
                    variables={{ account_id: selectedAccount.id }}
                    onError={() => alert('nope')}
                >
                    {({ data, refetch }) => {
                        return (
                            <div>
                                <CreateUser refetch={refetch} selectedAccount={selectedAccount} />

                                <SelectedUser setSelectedUser={setSelectedUser} selectedUser={selectedUser} />

                                <Paper>

                                    {data && data.listAllCognitoUsers && <UserList loggedinuser={user} refetch={refetch} users={data.listAllCognitoUsers}/> }

                                </Paper>
                            </div>
                        );
                    }}
                </Query>
            </div>
        </div>
    );
}
