import { Card, Grid, Box } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import DeleteAccount from '../DeleteAccount';
import AccountType from './AccountType';
import AccountName from './AccountName';
import ViewAccountUsers from './ViewAccountUsers';
import ViewAccountOnboarding from './ViewAccountOnboarding';
import ViewAccountWallet from './ViewAccountWallet';
import ViewAccountDevices from './ViewAccountDevices';
import AccountMap from './AccountMap/AccountMapHolder';
import CardContent from '@mui/material/CardContent';
import React from 'react';

const AccountCard = ({ account, selectedAccount, setSelectedAccount, refetch }) => (
    <Card
        className={'test-AccountCard'}
        onClick={() => {
            setSelectedAccount(null);
            window.setTimeout(() => {
                setSelectedAccount(account);
            }, 100);
        }}
        raised={account.id === selectedAccount?.id}
    >
        <CardContent>
            <Box>
                <Grid container={true} justifyContent="space-between">
                    <Grid item={true} sm={8}>
                        <AccountName account={account} refetch={refetch} />
                        <AccountType refetch={refetch} account={account} />
                    </Grid>
                    <Grid item={true} sm={4}>
                        <Box textAlign="right">
                            <DeleteAccount
                                setSelectedAccount={setSelectedAccount}
                                refetch={refetch}
                                account={account}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <AccountMap account={account} />

            <ViewAccountUsers   setSelectedAccount={setSelectedAccount} refetch={refetch} account={account} />
            <ViewAccountDevices setSelectedAccount={setSelectedAccount} refetch={refetch} account={account} />

        </CardContent>
    </Card>
);

export default AccountCard;
