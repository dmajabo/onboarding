import React, { useContext } from 'react';
import Users from '../../components/users/UserManagement';
import { UserContext } from '../../components/providers/UserProvider';
import {AccountContext} from "../../components/providers/AccountProvider";

const AllUsersPage = () => {

    const { user } = useContext(UserContext);
    const { account } = useContext(AccountContext);

    if (!user || !account) return <pre>Loading</pre>

    return (
        <div>

           <Users user={user} selectedAccount={{ id: user.AccountId }} />

        </div>
    );
};

export default AllUsersPage;
