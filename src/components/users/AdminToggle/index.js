import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Mutation } from 'react-apollo';
import Alert from '@mui/material/Alert';
import gql from 'graphql-tag';
import Checkbox from '@mui/material/Checkbox';

const UPDATE_ROLE = gql`
 
mutation($user_id : String, $user_role : String)  {
  update_role_table(where: {user_id: {_eq: $user_id}}, _set: {user_role: $user_role}) {
     returning {
      user_role
    }
  }
}


`;

export default function SwitchLabels({loggedinuser, user, refetch}) {

    const {role : {user_role}} = user;

    // const [admin, setAdmin] = React.useState(user_role === 'site-admin');

    return (

        <Mutation
            mutation={UPDATE_ROLE}
            onError={() => {}} onCompleted={() => refetch()}>
            {(MyMutation, { loading, error }) => {
               // if (loading) return null

                if (error && error.graphQLErrors[0].extensions.code ==='validation-failed') return <Alert severity="error">Not Allowed to change role</Alert>

                return (

                            <Checkbox
                                defaultChecked
                                disabled={loggedinuser.UserId === user.UserId}
                                color="primary"
                                checked={user_role === 'account-admin'}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                onChange={(event) => {
                                    MyMutation({variables : {user_id : user.UserId, user_role : event.target.checked ? 'account-admin' : 'account-user'}})
                                    //setAdmin(event.target.checked)
                                }}
                            />

                );
            }}
        </Mutation>


    );
}
