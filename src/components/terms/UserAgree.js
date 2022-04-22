import React, { Fragment } from 'react';
import { Button } from '@mui/material';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const AGREE_USER_TERMS = gql`
    mutation($user_id : uuid) {
      update_role_table(where: {user_id: {_eq: $user_id}}, _set: {termsAgreed: true}) {
        returning {
          user_id
        }
      }
}

    `;

export default function SiteAgree({ refetch, user }) {

    return (
        <Mutation
            mutation={AGREE_USER_TERMS}
            variables={{user_id : user.UserId}}
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
                            color={'primary'}
                            id={"testAgreeUserTerms"}
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
