import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import React from 'react';

const WalletCard = ({ text, balance }) => (
    <Card>

        <CardHeader title={text}></CardHeader>

        <CardContent>
            {balance}
        </CardContent>
    </Card>
);

export default WalletCard;
