import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { UserAuthenticationContext } from 'components/providers/UserAuthenticationProvider';

const PublicRoute = ({ component: Component, ...restProps }) => {
    const { isLoggedIn } = useContext(UserAuthenticationContext);

    return (
        <Route
            {...restProps}
            render={() => {
                if (!isLoggedIn) {
                    return <Component />;
                }
                // if (isLoggedIn) {
                //     return <Redirect to="/" />;
                // }
                return null;
            }}
        />
    );
};

export default PublicRoute;
