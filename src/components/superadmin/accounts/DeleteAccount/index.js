import React, { Fragment, useState } from 'react';
import { Input, Button, Checkbox } from '@mui/material';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

const DELETE_ACCOUNT = gql`
       mutation MyMutation($account_id : uuid!) {
          delete_account_table_by_pk(id: $account_id) {
            id
          }
    }
    `;

export default function DeleteAccount({ refetch, account, setSelectedAccount }) {

    return (
        <Mutation
            mutation={DELETE_ACCOUNT}
            variables={{account_id : account.id}}
            onCompleted={(e) => {
                refetch && refetch();
                setSelectedAccount(null);
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
