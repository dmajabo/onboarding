import React, { Fragment, useState } from 'react';
import { Input, Button, Checkbox } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_COGNITO_USER = gql`
    mutation (
        $email: String!
        $account_id: String!
        $firstName: String!
        $familyName: String!
        $phoneNumber: String!
        $role: String!
    ) {
        createCognitoUser(
            input: {
                Email: $email
                Role: $role
                FirstName: $firstName
                FamilyName: $familyName
                AccountId: $account_id
                PhoneNumber: $phoneNumber
            }
        ) {
            sub
        }
    }
`;

export default function AddCognitoUser({ visible, hide, selectedAccount, refetch, admin, setAdmin }) {
    // getModalStyle is not a pure function, we roll the style only on the first render

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('+');

    const [error, setError] = useState(null);

    const disabled = !email || !firstName || !familyName || !phoneNumber;

    return (
        <Mutation
            mutation={ADD_COGNITO_USER}
            onCompleted={(e) => {
                refetch && refetch();
                hide();
            }}
            variables={{
                email,
                firstName,
                familyName,
                role : admin ? 'account-admin' : 'account-user',
                phoneNumber,
                account_id: selectedAccount.id
            }}
            onError={(e) => {
                setError(error);
            }}
        >
            {(MyMutation, { loading, error }) => {
                //if (loading) return null;

                return (
                    <Fragment>
                        <h2 id="simple-modal-title">Add new user </h2>
                        <Input
                            placeholder={'Email'}
                            fullWidth={true}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <Input
                            placeholder={'First Name'}
                            fullWidth={true}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <br />
                        <Input
                            placeholder={'Family Name'}
                            fullWidth={true}
                            value={familyName}
                            onChange={(e) => setFamilyName(e.target.value)}
                        />
                        <br />

                        <Input
                            placeholder={'Phone Number'}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <br />
                        Admin:
                        <Checkbox
                            checked={admin}
                            id={'testAdminCheckbox'}
                            onChange={(event) => setAdmin(event.target.checked)}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <br />
                        <Button
                            disabled={disabled}
                            variant={'outlined'}
                            id={'testAddUserMutation'}
                            style={{marginBottom : '5px'}}
                            onClick={() => {
                                setError(null);
                                MyMutation();
                            }}
                        >
                            Add
                        </Button>

                        {error && <Alert severity="error">Error: {(error.message.split(":")[2])}</Alert>}
                    </Fragment>
                );
            }}
        </Mutation>
    );
}
