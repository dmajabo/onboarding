import React, { useContext, useState } from 'react';
import { Box } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import { ReactComponent as DistroLogoIcon } from 'assets/icons/distro-logo.svg';
import { UserAuthenticationContext } from 'components/providers/UserAuthenticationProvider';
import classNames from 'classnames';
import { Auth } from 'aws-amplify';
import Navigation from 'components/navigation';

import './styles.scss';
import {ReactComponent as UserBottomIcon} from "../../assets/icons/sidebar.svg";

const SideBar = ({ open, onClose, ignores }) => {
    const { isLoggedIn, isLoggingIn } = useContext(UserAuthenticationContext);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { pathname } = useLocation();

    const signOut = async () => {
        try {
            await Auth.signOut();
            history.push('/login');
            //window.location.reload();
            setLoading(false);
        } catch (error) {
            console.error('error to sign out', error);
            setLoading(false);
        }
    };

    const isIgnored = ignores.includes(pathname);

    return (
        <Box
            className={classNames('side-bar', {
                'side-bar--out': (!isLoggedIn && !isLoggingIn) || isIgnored,
            })}
        >
            <DistroLogoIcon className="side-bar-logo" />

            {(!loading && !isIgnored && isLoggedIn) && <Navigation signOut={signOut} />}
        </Box>
    );
};

export default SideBar;
