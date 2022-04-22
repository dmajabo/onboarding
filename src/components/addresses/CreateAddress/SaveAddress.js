import React from 'react'
import Button from "@mui/material/Button";
import gql from "graphql-tag";
import {Mutation} from "react-apollo";

const UPDATE_ADDRESS = gql`
    mutation MyMutation($id: uuid!, $line1: String, $line2: String, $line3: String, $city: String, $postcode : String , $country : String) {
        update_address_table_by_pk(pk_columns: { id: $id }, _set: { line1: $line1, line2: $line2, line3: $line3, city: $city, postcode : $postcode, country : $country }) {
            id
        }
    }
`;

const SaveAddress = ({handleClose, id, line1, line2, line3, city, postcode, country, refetch}) =>

    <Mutation
        mutation={UPDATE_ADDRESS}
        variables={{ id: id, line1: line1, line2: line2, line3: line3, city : city, postcode : postcode, country : country,  }}
        onCompleted={() => {
            if (typeof refetch === 'function') {
                refetch().then(handleClose);
            }
        }}
        onError={(e) => {
            console.log(e)
        }}
    >
        {(handleMutation, { loading, error }) => (
            <Button id='testSaveAddress' onClick={() => handleMutation()} color="primary">
                Save
            </Button>
        )}
    </Mutation>

export default SaveAddress;
