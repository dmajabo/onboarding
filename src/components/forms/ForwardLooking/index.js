import React from 'react';
import ConsumptionTrend from './ConsumptionTrend'
import Electrification from './Electrification'
import Box from "@mui/material/Box";

export default function ForwardLookingForm({account, refetch}) {

    return (

        <Box style={{padding : '20px'}}>

            <ConsumptionTrend refetch={refetch} account={account}/>

            <Electrification refetch={refetch} account={account}/>

        </Box>

    );
}
