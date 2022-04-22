import React, {useState} from 'react';
import gql from "graphql-tag";
import AccountMap from './AccountMap';
import {Mutation} from "react-apollo";
import { Alert } from '@mui/material';

const UPDATE_ACCOUNT_MAP = gql`
 
mutation($account_id : uuid, $viewstate : jsonb)  {
  update_account_table(where: {id: {_eq: $account_id}}, _set: {viewstate: $viewstate}) {
     returning {
      id
    }
  }
}

`;

export default function AccountMapHolder({account, refetch}) {

    const [viewState, setViewState] = useState(account.viewstate);

    return (
        <div>

            {viewState.zoom ===0 && <Alert severity="warning">Account location to be updated soon. </Alert>}

            <Mutation
                mutation={UPDATE_ACCOUNT_MAP}
                onError={() => {}}
                onCompleted={() => refetch()}>
                {(MyMutation, { loading, error }) => {
                    // if (loading) return null

                    //if (error && error.graphQLErrors[0].extensions.code ==='validation-failed') return <Alert severity="error">Not Allowed to change site</Alert>

                    return (
                        <AccountMap viewState={viewState} setViewState={setViewState} account={account} saveMap={MyMutation}/>
                    );
                }}
            </Mutation>



        </div>
    );
}
