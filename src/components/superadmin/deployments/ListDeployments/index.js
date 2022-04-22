import React, { useContext, useState, Fragment } from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import DeploymentName from "../DeploymentName";
import DeleteDeployment from "../DeleteDeployment";
const DEPLOYMENTS = gql`
  query MyQuery {
  deployment_table(order_by: {created_at: asc}) {
    id
    name
  }
}
`;

const ListDeployments = ({children}) => {

    return (
        <div>

            <Query
                    query={DEPLOYMENTS}
                    fetchPolicy={'network-only'}
                    onError={() => alert('nope')}
                >
                    {({ data, loading,  refetch }) => {

                        if (loading || !data) return null;

                        const childrenWithRefresh = React.cloneElement(children, {refetch})
                        return (
                            <Fragment>

                                {childrenWithRefresh}

                                <ol style={{listStyle :  'none'}}>
                                    {data.deployment_table.map(d => <li>
                                        <DeploymentName deployment={d}  refetch={refetch} />
                                    </li>)}
                                </ol>



                            </Fragment>
                        );
                    }}
                </Query>

        </div>
    );
};

export default ListDeployments;
