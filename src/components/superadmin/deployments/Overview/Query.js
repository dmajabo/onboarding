import React, { useContext, useState, Fragment } from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
const STAGES = gql`
    query {

        account_table(where: {deployment_id: {_is_null: false}}) {
            id
            geojson
        }
        
        map_layer_table {
            id
            name
            data
            visible
            label
        }
        
        map_scene_table(order_by: {id: asc}) {
            id
            title
            viewstate
            light
            duration
            type
        }
    }
`;

const Stages = ({children}) => {

    return ( <Query
                query={STAGES}
                fetchPolicy={'network-only'}
                onError={() => alert('nope')}
            >{children}
            </Query>
    );
};

export default Stages;
