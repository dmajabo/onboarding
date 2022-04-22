import React, { Fragment } from 'react';
import {  Button } from '@mui/material';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const DELETE_COGNITO_USER = gql`
   mutation($Username : String! ) {
  deleteCognitoUser(username : $Username) {
    message
  }
}
`;

export default function DeleteCognitoUser({  refetch, user }) {

    console.log(user);
    return (
        <Mutation
            mutation={DELETE_COGNITO_USER}
            onCompleted={(e) => {
                refetch && refetch();
            }}
            variables={{
                Username : user.UserName
            }}
            onError={(e) => {

            }}
        >
            {(MyMutation, { loading, error }) => {
                //if (loading) return null;

                return (
                    <Fragment>
                        <Button variant={'text'} onClick={MyMutation}>Delete</Button>
                    </Fragment>
                );
            }}
        </Mutation>
    );
}
