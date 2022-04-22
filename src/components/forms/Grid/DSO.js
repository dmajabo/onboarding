import React, {Fragment} from 'react';
import {Mutation, Query} from 'react-apollo';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import gql from 'graphql-tag';

const UPDATE_DSO = gql`
    mutation($id: uuid!, $dso: uuid) {
        update_account_table_by_pk(pk_columns: { id: $id }, _set: { dso_id: $dso }) {
            id
        }
    }
`;

const DSO_QUERY = gql`
 {
  
  dso_table(where: {country: {_eq: "NL"}}, order_by: {name: asc}) {
    name
    id
  }
}

`;

const DSO = ({ account, refetch }) => {
    return (
        <Mutation
            mutation={UPDATE_DSO}
            onCompleted={e => {
                refetch && refetch();
            }}
            onError={e => {
                alert(JSON.stringify(e));
            }}
        >
            {(MyMutation, { loading, error }) => {
                return (
                    <FormControl fullWidth={true} margin="dense" size="small">

                        <InputLabel shrink={true}>Distribution System Operators (DSO)</InputLabel>

                        <Query query={DSO_QUERY} >
                            {({ data, loading, refetch }) => {
                                if (loading) return null;

                                if (data) {

                                    return <Select
                                        value={account.dso_id}
                                        input={<OutlinedInput notched={true} label="Distribution System Operators (DSO)" />}
                                        onChange={e => {
                                            MyMutation({ variables: { id: account.id, dso: e.target.value } });
                                        }}
                                    >

                                        {
                                            data.dso_table.map(dso => <MenuItem key={dso.id} value={dso.id}>
                                                {dso.name}
                                            </MenuItem>)
                                        }


                                    </Select>

                                }
                            }}
                        </Query>


                    </FormControl>
                );
            }}
        </Mutation>
    );
};

export default DSO;
