import React, { useContext, useState, Fragment } from 'react';
import { ListItemAvatar, Box, List, ListItem, ListItemText } from '@mui/material';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import UserIcon from './UserIcon/index'
import './styles.scss';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AccountContext } from '../providers/AccountProvider';
import { UserContext } from '../providers/UserProvider';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({

    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const Navigations = ({ signOut }) => {
    const { account } = useContext(AccountContext);
    const { user } = useContext(UserContext);
    const location = useLocation();

    const classes = useStyles();

    const [path, setPath] = useState(location.pathname);

    const navigation = useHistory();

    const handleChangeItem = (path) => () => {
        setPath(path);
        navigation.push(path);
    };

    const isItemSelected = (selectedPath) => path === selectedPath;

    const isSuperAdmin = user && 'admin' === user.role.user_role;
    const isAccountUser = user && 'account-user' === user.role.user_role;
    const isAccountAdmin = user && 'account-admin' === user.role.user_role;

    return (
        <Box width="100%" height="100%">
            <Box className="navigation">
                <List component="div" className="navigation-wrapper navigation-child-wrapper">

                    {user && !isSuperAdmin && <ListItem
                        className="navigation-item navigation-item-child-wrapper"
                        classes={{ selected: 'navigation-item-selected' }}
                        button={true}
                        selected={isItemSelected('/wallet')}
                        onClick={handleChangeItem('/wallet')}
                    >
                        <ListItemAvatar>
                            <AccountBalanceWalletOutlinedIcon />
                        </ListItemAvatar>
                        <ListItemText className="navigation-item-text" primary="Wallet" />


                    </ListItem> }

                    {user && !isSuperAdmin && <ListItem
                        className="navigation-item navigation-item-child-wrapper"
                        classes={{ selected: 'navigation-item-selected' }}
                        button={true}
                        selected={isItemSelected('/invoices')}
                        onClick={handleChangeItem('/invoices')}
                    >
                        <ListItemAvatar>
                            <AccountBalanceWalletOutlinedIcon />
                        </ListItemAvatar>
                        <ListItemText className="navigation-item-text" primary="Invoices" />


                    </ListItem> }

                    {(isAccountUser || isAccountAdmin) && (
                        <ListItem
                            className="navigation-item navigation-item-child-wrapper"
                            classes={{ selected: 'navigation-item-selected' }}
                            button={true}
                            selected={isItemSelected('/dashboard')}
                            onClick={handleChangeItem('/dashboard')}
                        >
                            <ListItemAvatar>
                                <AccountBalanceWalletOutlinedIcon />
                            </ListItemAvatar>
                            <ListItemText className="navigation-item-text" primary="Dashboard" />
                        </ListItem>
                    )}

                    {isAccountAdmin && (
                        <ListItem
                            className="navigation-item navigation-item-child-wrapper"
                            classes={{ selected: 'navigation-item-selected' }}
                            button={true}
                            selected={isItemSelected('/users')}
                            onClick={handleChangeItem('/users')}
                        >
                            <ListItemAvatar>
                                <PeopleAltIcon />
                            </ListItemAvatar>
                            <ListItemText className="navigation-item-text" primary="Users" />
                        </ListItem>
                    )}

                    {isSuperAdmin && (
                        <ListItem
                            className="navigation-item navigation-item-child-wrapper"
                            classes={{ selected: 'navigation-item-selected' }}
                            id={'testLinkAdministration'}
                            button={true}
                            selected={isItemSelected('/admin/dashboard')}
                            onClick={handleChangeItem('/admin/dashboard')}
                        >
                            <ListItemAvatar>
                                <PeopleAltIcon />
                            </ListItemAvatar>
                            <ListItemText className="navigation-item-text" primary="Dashboard" />
                        </ListItem>
                    )}

                    {isSuperAdmin && (
                        <ListItem
                            className="navigation-item navigation-item-child-wrapper"
                            classes={{ selected: 'navigation-item-selected' }}
                            id={'testLinkAdministration'}
                            button={true}
                            selected={isItemSelected('/admin/accounts')}
                            onClick={handleChangeItem('/admin/accounts')}
                        >
                            <ListItemAvatar>
                                <PeopleAltIcon />
                            </ListItemAvatar>
                            <ListItemText className="navigation-item-text" primary="Administration" />
                        </ListItem>
                    )}

                    {isSuperAdmin && (
                        <ListItem
                            className="navigation-item navigation-item-child-wrapper"
                            classes={{ selected: 'navigation-item-selected' }}
                            id={'testLinkDeployment'}
                            button={true}
                            selected={isItemSelected('/admin/deployments')}
                            onClick={handleChangeItem('/admin/deployments')}
                        >
                            <ListItemAvatar>
                                <PeopleAltIcon />
                            </ListItemAvatar>
                            <ListItemText className="navigation-item-text" primary="Deployments" />
                        </ListItem>
                    )}

                    {isSuperAdmin && (
                        <ListItem
                            className="navigation-item navigation-item-child-wrapper"
                            classes={{ selected: 'navigation-item-selected' }}
                            id={'testLinkAudit'}
                            button={true}
                            selected={isItemSelected('/admin/audit')}
                            onClick={handleChangeItem('/admin/audit')}
                        >
                            <ListItemAvatar>
                                <PeopleAltIcon />
                            </ListItemAvatar>
                            <ListItemText className="navigation-item-text" primary="Audit" />
                        </ListItem>
                    )}

                </List>

                <Box color="white" height="100%" display="flex" justifyContent="space-between" flexDirection="column">
                    <Box padding={1} marginBottom={2} component="small">
                    </Box>

                    <Box marginY={-1}>

                        {user && <UserIcon signOut={signOut} user={user} account={account}/> }

                        {/*<UserIcon admin={isAccountAdmin} superadmin={isSuperAdmin} username={user?.UserName.split('@')[0]}/>*/}

                        {/*{account && (*/}
                        {/*    <Fragment>*/}
                        {/*        <Chip label={account.name} variant="default" style={{ width: '250px' }} />*/}
                        {/*    </Fragment>*/}
                        {/*)}*/}

                        {/*{!account && (*/}
                        {/*    <Fragment>*/}
                        {/*        <Chip label={'Distro Energy'} variant="default" />*/}
                        {/*    </Fragment>*/}
                        {/*)}*/}

                        {/*<List>*/}
                        {/*    <ListItem button={true} className="navigation-item-signout">*/}
                        {/*        <ListItemIcon>*/}
                        {/*            <HelpIcon color="secondary" />*/}
                        {/*        </ListItemIcon>*/}
                        {/*        <ListItemText primary="Guide" />*/}
                        {/*    </ListItem>*/}

                        {/*    <ListItem button={true} onClick={signOut} className="navigation-item-signout">*/}
                        {/*        <ListItemIcon>*/}
                        {/*            <PowerSettingsNewOutlinedIcon color="secondary" />*/}
                        {/*        </ListItemIcon>*/}
                        {/*        <ListItemText primary="Sign Out" />*/}
                        {/*    </ListItem>*/}
                        {/*</List>*/}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Navigations;
