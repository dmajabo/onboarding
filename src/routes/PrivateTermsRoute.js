import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserAuthenticationContext } from 'components/providers/UserAuthenticationProvider';

const PrivateTermsRoute = ({ component: Component, ...restProps }) => {
    const { isLoggedIn, isLoggingIn } = useContext(UserAuthenticationContext);

    return (
        <Route
            {...restProps}
            render={() => {
                if (!isLoggedIn && !isLoggingIn) {
                    return <Redirect to="/welcome" />;
                }

                return <Component />;
            }}
        />
    );
};

export default PrivateTermsRoute;
