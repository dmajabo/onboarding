import React, { useContext } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { UserAuthenticationContext } from './UserAuthenticationProvider';
import { ApolloProviderContext } from './ApolloProvider';

const DEPLOYMENT_QUERY = gql`
   query($deployment_id :uuid!) { 
  deployment_table_by_pk(id: $deployment_id) {
    id
    name
  }
}
`;

export const DeploymentContext = React.createContext({ deployment: null });

const DeploymentProvider = ({ children }) => {
    const { session } = useContext(UserAuthenticationContext);
    const { userRole } = useContext(ApolloProviderContext);
    if (!session || !session.isValid() || !userRole) return children;

    return (
        <Query query={DEPLOYMENT_QUERY} variables={{ deployment_id: process.env.REACT_APP_DEPLOYMENT_ID }}>
            {({ loading, error, data, refetch }) => {
                if (loading || !data) return null;

                return (
                    <DeploymentContext.Provider value={{  deployment : data.deployment_table_by_pk , refetch }}>
                        {children}
                    </DeploymentContext.Provider>
                );
            }}
        </Query>
    );
};

export default DeploymentProvider;
