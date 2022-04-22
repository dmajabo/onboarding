import React from 'react';
import TenancyNumbers from './TenancyNumbers'
import TenancyPeriod from './TenancyPeriod'
import TenancyType from './TenacyType'
import Box from "@mui/material/Box";

export default function TenancyForm({account, refetch}) {

    return (

        <Box style={{padding : '20px'}}>

            <TenancyNumbers refetch={refetch} account={account}/>
            <TenancyType    refetch={refetch} account={account}/>
            <TenancyPeriod  refetch={refetch} account={account}/>

        </Box>

    );
}
