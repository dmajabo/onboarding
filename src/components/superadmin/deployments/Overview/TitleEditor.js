import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';

const UPDATE_TITLE = gql`
    mutation($id: uuid!, $title: String) {
        update_map_scene_table_by_pk(pk_columns: { id: $id }, _set: { title: $title }) {
            id
        }
    }
`;

const TitleEdit = ({ stage, refetch }) => {
    return (
        <Mutation
            mutation={UPDATE_TITLE}
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
                        <InputLabel shrink={true}>Title</InputLabel>
                        <OutlinedInput value={stage.title}  />
                        <Button fullWidth={false}>Save</Button>
                    </FormControl>
                );
            }}
        </Mutation>
    );
};

export default TitleEdit;
