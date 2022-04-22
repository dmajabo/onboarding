import React, { useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';
import useInterval from "../../hooks/useInterval";

export const UserAuthenticationContext = React.createContext({
    user: null,
    session: null,
    isLoggedIn: false,
    isLoggingIn: true,
});

const UserAuthenticationProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        session: null,
        isLoggedIn: false,
        isLoggingIn: true,
    });

    const getAuthenticatedUser = async () => {
        try {
            setState(prev => ({ ...prev, isLoggingIn: true }));

            const authenticatedUser = await Auth.currentAuthenticatedUser();
            const session = await Auth.currentSession();
            const isLoggedIn = session.isValid();

            setState({
                user: authenticatedUser,
                session,
                isLoggedIn,
                isLoggingIn: false,
            });
        } catch (error) {
            setState({
                user: null,
                session: null,
                isLoggedIn: false,
                isLoggingIn: false,
            });
        }
    };

    useEffect(() => {
        getAuthenticatedUser();

        const onAuth = async (data) => {
            switch (data.payload.event) {
                case 'signIn':
                    await getAuthenticatedUser();
                    break;
                case 'signOut':
                    setState({
                        user: null,
                        session: null,
                        isLoggedIn: false,
                        isLoggingIn: false,
                    });

                    break;
                default:
                    break;
            }
        };
        Hub.listen('auth', onAuth);

        return () => Hub.remove('auth', onAuth);
    }, []);

    //refresh token every 10 mins
    useInterval(async () => {
        try {
            if (state.isLoggedIn) {
                console.log("refreshing token");
                const authenticatedUser = await Auth.currentAuthenticatedUser();
                const currentSession = authenticatedUser.signInUserSession;
                authenticatedUser.refreshSession(
                    currentSession.refreshToken,
                    (err, session) => {
                        if (err) alert('Error Refreshing session');
                    }
                );
                const isLoggedIn = currentSession.isValid();
                setState({
                    user: authenticatedUser,
                    session: currentSession,
                    isLoggedIn,
                });
            }

        } catch (e) {}
    }, 1000 * 60 * 10);

    return (
        <UserAuthenticationContext.Provider
            value={state}
        >
            {children}
        </UserAuthenticationContext.Provider>
    );
};

export default UserAuthenticationProvider;
