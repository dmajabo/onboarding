import { Grid, Box } from '@mui/material';
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
import { Card } from 'antd';
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
        style={{ background: 'rgba(236, 242, 255, 0.08)', border: '1px solid #fcaf7788', borderRadius: 5 }}
        bodyStyle={{ padding: 0 }}
        bordered
        // .ant-card-actions
    >
        <Box sx={{ padding: 2 }}>
            <Grid container={true} justifyContent="space-between">
                <Grid item={true} sm={8}>
                    <AccountName account={account} refetch={refetch} />
                    <AccountType refetch={refetch} account={account} />
                </Grid>
                <Grid item={true} sm={4}>
                    <Box textAlign="right">
                        <DeleteAccount setSelectedAccount={setSelectedAccount} refetch={refetch} account={account} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
        <AccountMap account={account} />
        <Grid container justifyContent={'flex-end'} padding={1} gap={1}>
            <Grid item>
                <ViewAccountUsers setSelectedAccount={setSelectedAccount} refetch={refetch} account={account} />
            </Grid>
            <Grid item>
                <ViewAccountDevices setSelectedAccount={setSelectedAccount} refetch={refetch} account={account} />
            </Grid>
        </Grid>
    </Card>
);

export default AccountCard;
