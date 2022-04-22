import React from 'react';
import { Paper, Box, Typography} from '@mui/material'
import UserAgree from "./UserAgree";

export default ({user, refetch}) => <div>

    <Typography variant="h3" align="center">
        User Terms and Conditions
    </Typography>

    <Paper style={{marginTop : '10px', padding : '20px'}}>
        <Typography style={{height : '400px', overflow : 'scroll'}}>
        <br/>

        Subject to these Terms of Use, Distro Energy grants you a personal, revocable, non-exclusive, non-transferable, limited license to access and use the Website and its Content (as defined below) for the fees, if applicable, and under the terms set forth below.
        <br/>  <br/>
        The Website and the content, including, but not limited to, text, data, reports, opinions, images, photos, graphics, graphs, charts, animations and video (the "Content"), displayed on the Website, may be used only for your personal and non-commercial use, and is conditioned upon your compliance with this "Terms of Use" agreement.
        <br/>  <br/>
        Except as otherwise permitted under these Terms of Use, you agree not to copy, download, reproduce, modify, create derivative works from, or store any Content, in whole or in part, from the Website or to display, perform, publish, distribute, transmit, broadcast or circulate any Content to anyone, for any public or commercial purpose, without the express prior written consent of Platts.
        <br/>  <br/>
        You may not license, sublicense, transfer, sell, resell, publish, reproduce and/or otherwise redistribute the Website, including the Content or any component thereof in any manner (including, but not limited to, via or as part of any internet site). You may not a) use the Content or any portion of the Website as part of any intranet or other internal network; b) create archival or derivative works based on the Content or any portion thereof; or c) modify, commingle, reverse-engineer, disassemble, decompile or store any Content or any portion of the Website.
        <br/>  <br/>
        You may not use the Website or any Content contained therein, in whole or in part in any manner that either competes or is intended to compete with Distro Energy or its affiliates, including without limitation, any distribution of any Content or a derivative work based thereon.
        <br/>  <br/>
        You may not use the Website for any illegal purpose or in any manner inconsistent with these Terms of Use.

    </Typography>
    </Paper>

    <br/>
    <Box>
        <Box display="flex" flexDirection="column" alignItems="center">
            <UserAgree user={user} refetch={refetch}/>
        </Box>
    </Box>
</div>
