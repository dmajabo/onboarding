import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Typography } from '@mui/material';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';

const UPDATE_ACCOUNT_NAME = gql`
    mutation($account_id: uuid, $name: String) {
        update_account_table(where: { id: { _eq: $account_id } }, _set: { name: $name }) {
            returning {
                id
            }
        }
    }
`;

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

export default function AccountType({ account, refetch }) {
    const classes = useStyles();

    const siteAddress = account.addresses.find(a => a.type === 'Site');

    return (
        <div>
            <Mutation mutation={UPDATE_ACCOUNT_NAME} onError={() => {}} onCompleted={() => refetch()}>
                {(MyMutation, { loading, error }) => {
                    // if (loading) return null

                    //if (error && error.graphQLErrors[0].extensions.code ==='validation-failed') return <Alert severity="error">Not Allowed to change site</Alert>

                    return (
                        <Typography
                            variant="h5"
                            className={'testAccountName'}
                            gutterBottom={true}
                            suppressContentEditableWarning={true}
                            contentEditable={true}
                            onBlur={e => {
                                MyMutation({ variables: { account_id: account.id, name: e.target.innerText } });
                            }}
                            color={'white'}
                        >
                            {account.name}
                        </Typography>
                    );
                }}
            </Mutation>

            <Typography variant="h6" gutterBottom={true}>
                {siteAddress && siteAddress.city && siteAddress.country && <RoomOutlinedIcon />}
                {siteAddress && siteAddress.city}
                {siteAddress && siteAddress.country && ', '}
                {siteAddress && siteAddress.country}
            </Typography>
        </div>
    );
}
