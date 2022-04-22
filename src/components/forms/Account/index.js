import React from 'react';
import SiteDetailsBusinessType from './SiteDetailsBusinessType'
import SiteDetailsBuildingType from './SiteDetailsBuildingType'
import SiteDetailsBuildingSiteAttributes from './SiteDetailsBuildingSiteAttributes'
import CreateAddress from "../../addresses/CreateAddress";
import Box from "@mui/material/Box";

export default function SiteForm({account, refetch}) {

    return (

        <Box style={{padding : '20px'}}>

            <CreateAddress refetch={refetch} address={account.addresses.find(a => a.type === 'Main Site')}/>

            <CreateAddress refetch={refetch} address={account.addresses.find(a => a.type === 'Invoicing')}/>

            <SiteDetailsBusinessType refetch={refetch} account={account}/>
            <br/>
            <SiteDetailsBuildingType refetch={refetch} account={account}/>
            <br/>
            <SiteDetailsBuildingSiteAttributes refetch={refetch} account={account}/>
        </Box>

    );
}
