import React, { useContext } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import SupplyPointTable from './Table'
import FieldSet from "../formik-fields/FieldSet2";
import GridConnection from "../Grid/GridConnection";

const SUPPLY_POINT_QUERY = gql`
    query ($account_id: uuid!) {
      supply_point_table(where: {account_id: {_eq: $account_id}}) {
        id
        description
        ean_number
        meter_number
        max_kwh
        historical_kwh
        
        meters {
            id
            description
            meter_number
        }
      }
    }
`;

const Loader = ({ account }) => {

    return (
        <Query query={SUPPLY_POINT_QUERY} variables={{ account_id: account.id }}>
            {({ data, loading, refetch }) => {
                if (loading) return null;

                if (data) {
                    return <div>

                        <GridConnection account={account}/>

                        <SupplyPointTable refetch={refetch} supplypoints={data.supply_point_table}/>
                    </div>
                }
                return <div>no data</div>;
            }}
        </Query>
    );
};

export default Loader;
