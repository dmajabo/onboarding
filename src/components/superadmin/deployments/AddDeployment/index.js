import React, { Fragment, useState } from 'react';
import { Input, Button, Checkbox } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_DEPLOYMENT = gql`
    mutation MyMutation {
      insert_deployment_table_one(object: {name: "NEW DEPLOYMENT - EDIT ME"}) {
        id
      }
    }
`;

export default function AddDeployment({ refetch }) {

    return (
        <Mutation
            mutation={ADD_DEPLOYMENT}
            onCompleted={(e) => {
                refetch && refetch();
            }}
            onError={(e) => {
                alert(e);
            }}
        >
            {(MyMutation, { loading, error }) => {
                //if (loading) return null;

                return (
                    <Fragment>

                        <Button
                            variant={'outlined'}
                            style={{marginBottom : '5px'}}
                            id={'addDeployment'}
                            onClick={() => {
                                MyMutation();
                            }}
                        >
                            Add Deployment
                        </Button>

                    </Fragment>
                );
            }}
        </Mutation>
    );
}
