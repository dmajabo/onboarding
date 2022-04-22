import React, {Fragment} from 'react';
import {Mutation, Query} from 'react-apollo';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import gql from 'graphql-tag';

const UPDATE_MRP = gql`
    mutation($id: uuid!, $mrp: uuid) {
        update_account_table_by_pk(pk_columns: { id: $id }, _set: { mrp_id: $mrp }) {
            id
        }
    }
`;

const MRP_QUERY = gql`
   {
  na: mrp_table(where: {country: {_is_null: true}}) {
    name
    id
  }
  mrp_table(where: {country: {_eq: "NL"}}, order_by: {name: asc}) {
    name
    id
  }
}

`;
const MRP = ({ account, refetch }) => {
    return (
        <Mutation
            mutation={UPDATE_MRP}
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

                        <InputLabel shrink={true}>Metering Responsible Party (MRP)</InputLabel>

                        <Query query={MRP_QUERY} >
                            {({ data, loading, refetch }) => {
                                if (loading) return null;

                                if (data) {

                                    return <Select
                                        input={<OutlinedInput notched={true} label="Metering Responsible Party (MRP)" />}
                                        value={account.mrp_id}
                                        onChange={e => {
                                            MyMutation({ variables: { id: account.id, mrp: e.target.value } });
                                        }}
                                    >

                                        {
                                            data.na.map(mrp => <MenuItem key={mrp.id} value={mrp.id}>
                                                {mrp.name}
                                            </MenuItem>)
                                        }

                                        {
                                            data.mrp_table.map(mrp => <MenuItem key={mrp.id} value={mrp.id}>
                                                {mrp.name}
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

export default MRP;
