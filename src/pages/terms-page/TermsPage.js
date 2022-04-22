import React, {useContext} from 'react';
import {  Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import AccountTermsAndConditions    from './../../components/terms/AccountTermsAndConditions'
import UserTermsAndConditions       from './../../components/terms/UserTermsAndConditions'
import {AccountContext}             from "../../components/providers/AccountProvider";
import {UserContext}                from "../../components/providers/UserProvider";

//remember user terms are stored in role table because we dont have a user table
const TermsPage = () => {

    const history = useHistory();

    const { account, superAdmin, refetch }  = useContext(AccountContext);
    const { user, refetch: userRefetch }    = useContext(UserContext);

    //if super admin, go straight to accounts


    //otherwise, we have an account - navigate according to role
    if (true && account) {

        if (superAdmin) history.push('/admin/accounts');

        if (account.termsAgreed && user && user.role.termsAgreed && user.role.user_role === 'account-admin') {
            history.push('/onboarding');
        }

        if (user && user.role.termsAgreed && user.role.user_role === 'account-user') {
            history.push('/dashboard');
        }

    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center">

            {user && user.role.user_role === 'account-user' && !account.termsAgreed && <span>Your account is not setup yet. Please reach out to your admin or support@distroenergy.com</span>}
                {account && !account.termsAgreed && user && user.role.user_role === 'account-admin' && <AccountTermsAndConditions  account={account} refetch={refetch}/> }
                {account &&  account.termsAgreed && user && !user.role.termsAgreed && <UserTermsAndConditions     user={user} refetch={userRefetch}/> }
        </Box>
    );
};

export default TermsPage;
