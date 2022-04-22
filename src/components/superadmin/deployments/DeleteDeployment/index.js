import React, { Fragment, useState } from 'react';
import { Input, Button, Checkbox } from '@mui/material';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

const DELETE_DEPLOYMENT = gql`
     
mutation ($deployment_id : uuid!) {
  delete_deployment_table_by_pk(id: $deployment_id) {
    id
  }
}

    `;

export default function DeleteDeployment({ refetch, deployment }) {

    return (
        <Mutation
            mutation={DELETE_DEPLOYMENT}
            variables={{deployment_id : deployment.id}}
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

                        <HighlightOffOutlinedIcon
                            style={{marginBottom : '5px'}}
                            id={'deleteAccount'}
                            onClick={(e) => {
                                e.stopPropagation(); //stop card click event happening
                                MyMutation();

                            }}
                        >

                        </HighlightOffOutlinedIcon>

                    </Fragment>
                );
            }}
        </Mutation>
    );
}
