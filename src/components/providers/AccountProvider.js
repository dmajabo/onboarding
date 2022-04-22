import React, { useContext } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { UserAuthenticationContext } from './UserAuthenticationProvider';
import { ApolloProviderContext } from './ApolloProvider';

const ACCOUNT_QUERY = gql`
    query ($accountId: uuid!) {
        account_table_by_pk(id: $accountId) {
            name
            id
            type
            termsAgreed
            businessType
            buildingType
            buildingSiteAttributes
            
            tenant_type
            number_tenants
            energy_supplier_id
            occupants
            
            consumption_trend
            expected_electricification
            owner_type
            
            tenant_period
            typical_working_hours
            
            wallet_id
            mrp_id
            dso_id
            
            usage {
              day
              peak_usage_hour_from
              peak_usage_hour_to
            }
            
            geojson
    
            energy_supplier {
                id
                name
            }
            
            files {
                field
                id
            }
            
               addresses {
                  line1
                  line2
                  line3
                  city
                  country
                  postcode
                  type
                  id
            }
        }
    }
`;

export const AccountContext = React.createContext({ user: null });

const AccountProvider = ({ children }) => {
    const { session } = useContext(UserAuthenticationContext);
    const { userRole } = useContext(ApolloProviderContext);
    let superAdmin = false;

    if (!session || !session.isValid() || !userRole) return children;

    const accountId =
        JSON.parse(session.idToken.payload['https://hasura.io/jwt/claims'])['x-hasura-account-id'] ||
        '11111111-1111-1111-1111-111111111111';

    if (!accountId) return null;

    //alert(accountId)

    return (
        <Query query={ACCOUNT_QUERY} variables={{ accountId: accountId }}>
            {({ loading, error, data, refetch }) => {
                if (loading || !data) return null;

                const account = data.account_table_by_pk || null;

                superAdmin = account?.id === '11111111-1111-1111-1111-111111111111';

                return (
                    <AccountContext.Provider value={{ superAdmin, account, refetch }}>
                        {children}
                    </AccountContext.Provider>
                );
            }}
        </Query>
    );
};

export default AccountProvider;
