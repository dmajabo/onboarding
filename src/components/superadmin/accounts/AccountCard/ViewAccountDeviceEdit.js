import React, { useState, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Input, Button, Checkbox, TextField } from '@mui/material';
import gql from 'graphql-tag';

const UPDATE_MAPPING = gql`
    mutation($id: Int!, $data : mapping_table_set_input) {
        update_mapping_table_by_pk(pk_columns: {id: $id}, _set: $data) {
            id
        }
    }
`;

const ViewAccountDeviceDelete = ({ device, refetch, mapping, setError }) => {

    const [value, setValue] = useState(device[mapping]);

    return (
        <Mutation
            mutation={UPDATE_MAPPING}
            onCompleted={e => {
                refetch && refetch();

            }}
            onError={e => {
                setError(e);
            }}
        >
            {(MyMutation, { loading, error }) => {
                return (
                    <Fragment>



                      <Input onBlur={() => MyMutation({variables : {id : device.id, data : { [mapping] : value }}})} onChange={(e) => setValue(e.target.value)} value={value}/>
                    </Fragment>
                );
            }}
        </Mutation>
    );
};

export default ViewAccountDeviceDelete;
