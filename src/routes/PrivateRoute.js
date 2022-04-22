import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserAuthenticationContext } from 'components/providers/UserAuthenticationProvider';
import {AccountContext} from "../components/providers/AccountProvider";
import {UserContext} from "../components/providers/UserProvider";

const PrivateRoute = ({ component: Component, ...restProps }) => {
    const { isLoggedIn, isLoggingIn } = useContext(UserAuthenticationContext);
    const { user }    = useContext(UserContext);
    const { account }  = useContext(AccountContext);

    return (
        <Route
            {...restProps}
            render={() => {
                if (!isLoggedIn && !isLoggingIn) {
                    return <Redirect to="/welcome" />;
                }

                //if we are not super admin (who doesnt see terms) then force the terms page until they have agreed
                if (user && user.role.user_role !== 'admin') {
                    if (user && (!user.role.termsAgreed || !account.termsAgreed)) {
                        return <Redirect to="/terms" />;
                    }
                }

                return <Component />;
            }}
        />
    );
};

export default PrivateRoute;
