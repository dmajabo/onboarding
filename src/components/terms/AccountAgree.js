import React, { Fragment } from 'react';
import { Button } from '@mui/material';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const AGREE_ACCOUNT_TERMS = gql`
      mutation MyMutation($id : uuid!) {
          update_account_table_by_pk(pk_columns: {id: $id}, _set: {termsAgreed: true}) {
            id
          }
        }
    `;

export default function AccountAgree({ refetch, account }) {

    return (
        <Mutation
            mutation={AGREE_ACCOUNT_TERMS}
            variables={{id : account.id}}
            onCompleted={(e) => {
                refetch();
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
                            variant="contained"
                            id={"testAgreeAccountTerms"}
                            color="primary"
                            onClick={(e) => {
                                e.stopPropagation(); //stop card click event happening
                                MyMutation();
                            }}
                        >
                            I Agree
                        </Button>

                    </Fragment>
                );
            }}
        </Mutation>
    );
}
