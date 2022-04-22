import React, {useState} from 'react';
import { Paper, Box, Typography} from '@mui/material'
import AccountAgree from "./AccountAgree";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default ({account, refetch}) => {

    const [email, setEmail] = useState(false);
    const [importDetails, setImportDetails] = useState(false);

    return <div>

        <Typography variant="h3" align="center">
            Account Terms and Conditions
        </Typography>

        <Paper style={{marginTop : '10px', padding : '20px'}}>
            <Typography style={{height : '400px', overflow : 'scroll'}}>
                <br/>
                These Distro Energy platform Terms of Use ("Terms of Use") were last updated on 1 September 2021.
                <br/> <br/>
                By using this site you agree to be legally bound by these Terms of Use and you represent that you have the legal capacity to be bound by these Terms of Use.
                <br/> <br/>
                The terms "you" and "User" refer to anyone who accesses the website or any of their sub-domains or any mobile application supported by Distro (collectively, the "Website").
                <br/> <br/>
                If you are an employee, consultant or contractor using the Website on behalf of or as part of your work for a company or other entity ("Company"), you represent that you have the authority to bind that Company to these Terms of Use or that you are authorized by your Company to use the Services.
                <br/> <br/>
                If you are not authorized to enter into these Terms of Use or if you or your Company does not agree to be bound by the applicable terms of these Terms of Use you must cease all access and/or use of this site and exit immediately.
                <br/> <br/>
                The Website and the content and services provided on the Website are only intended to be used by individuals that are eighteen years of age or older.
                <br/> <br/>
                If you are not eighteen years of age or older do not access or use the Website.
                <br/> <br/>
                You also cannot use the Website if you are prohibited from accessing or using any other services or products provided by Distro Energy or any of its affiliates.
                <br/> <br/>
                As you browse through the Website you may access other websites and services that are subject to different terms of use.
                <br/> <br/>
                When you use those sites and/or services, you may be legally bound by the specific terms of use posted on such sites.
                <br/> <br/>
                If there is a conflict between these Terms of Use and the other terms of use, the other terms of use will govern with respect to use of such sites.
                <br/> <br/>
                Distro Energy may change these Terms of Use at any time without notice.
                <br/> <br/>
                Changes will be posted under "Website Terms of Use" and shall be effective three days after such changes are initially posted.
                <br/> <br/>
                You should read these Terms of Use carefully each time you access and use the Website.
                <br/> <br/>
                If you do not agree to these Terms of Use, you must cease all use of the Website immediately.
            </Typography>
        </Paper>

        <Box>

            <FormControlLabel
                control={<Checkbox onChange={()=> setEmail(true)}  checked={email} name="checkedA" />}
                label="Email me a copy of the agreement"
            />

            <br/>
            <FormControlLabel
                control={<Checkbox onChange={()=> setImportDetails(true)} checked={importDetails} name="checkedA" />}
                label="Import details and link to my current energy supplier"
            />

            <Box display="flex" flexDirection="column" alignItems="center">
                <AccountAgree account={account} refetch={refetch}/>
            </Box>
        </Box>

    </div>
}
