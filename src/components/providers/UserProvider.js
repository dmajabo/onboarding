import React, { useContext } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { UserAuthenticationContext } from './UserAuthenticationProvider';
import { ApolloProviderContext } from './ApolloProvider';

const USER_QUERY = gql `
    query ($userId: String!) {
        getCognitoUser(userId: $userId) {
            UserId
            UserName
            Name
            FamilyName
            AccountId
            role {
                user_role
                termsAgreed
            }
        }
    }
`;

export const UserContext = React.createContext({ user: null });

const UserProvider = ({ children }) => {
    const { session }           = useContext(UserAuthenticationContext);
    const { userRole, client }  = useContext(ApolloProviderContext);

    if (!session || !session.isValid() || !userRole) return children;

    const userId = session.idToken.payload['sub'];

    return (
        <Query query={USER_QUERY} variables={{ userId }}>
            {({ loading, error, data, refetch }) => {
                // if ( error && error['graphQLErrors'].find((e) => e.extensions.code === 'access-denied'))
                //     return <h1> {session.idToken.payload['sub']} NOT AUTHED </h1>;

                const user = (data && data.getCognitoUser) || null;

                return <UserContext.Provider value={{ user: user, refetch, client }}>{children}</UserContext.Provider>;
            }}
        </Query>
    );
};

export default UserProvider;
