import React, {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import withStyles from '@mui/styles/withStyles';
import SiteDetails from './Account'
import Grid from './Grid'
import ForwardLooking from './ForwardLooking'
import Assets from './Assets'
import Tenancy from './Tenancy'
import Meters from './Meters'
import OperationalDetails from './OperationalDetails'
import './forms.css'
import {useHistory} from "react-router-dom";

const MyTab = withStyles(theme => ({
    selected: {
        color: 'grey',
    }
}))(Tab);

export default function AccountFormTabs({account, refetch, disabled=false}) {

    let [activeStep, setActiveStep] = useState(0);
    const history = useHistory();

    return (

        <div>
            <Tabs
                value={activeStep}
                onChange={(_,i) => {
                    setActiveStep(i)}}
            >
                <MyTab label={ 'Account' } />
                <MyTab label={ 'Tenancy' } />
                <MyTab label={ 'Operational' } />
                <MyTab label={ 'Grid' } />
                <MyTab label={ 'Meters' } />
                <MyTab label={ 'Forward Looking' } />
                <MyTab label={ 'Assets' } />

            </Tabs>

            <fieldset className={'holder'} disabled={disabled}>
                {activeStep === 0 &&  <SiteDetails          account={account} refetch={refetch}></SiteDetails>}
                {activeStep === 1 &&  <Tenancy              account={account} refetch={refetch}></Tenancy>}
                {activeStep === 2 &&  <OperationalDetails   account={account} refetch={refetch}></OperationalDetails>}
                {activeStep === 3 &&  <Grid                 account={account} refetch={refetch}></Grid>}
                {activeStep === 4 &&  <Meters               account={account} refetch={refetch}></Meters>}
                {activeStep === 5 &&  <ForwardLooking       account={account} refetch={refetch}></ForwardLooking>}
                {activeStep === 6 &&  <Assets               account={account} refetch={refetch}></Assets>}
            </fieldset>

            <Box display="flex" flexDirection="column" alignItems="center">

               <Box marginTop={0}>

                    <Button
                        type="button"
                        variant="contained"
                      style={{backgroundColor : 'lightgrey'}}
                        id={'testOnboardingFormsPrevious'}
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep(--activeStep)}

                    >
                        Previous
                    </Button>

                   &nbsp;
                    <Button
                        type="button"
                        variant="contained"
                        style={{width : '200px'}}
                        color="primary"
                        id={'testOnboardingFormsNext'}
                        onClick={() => {

                            if (activeStep === 6) {
                                history.push('/dashboard');
                            } else {
                                setActiveStep(++activeStep);
                            }
                        }}
                    >
                        {activeStep < 6 ? 'Next' : "Go to Dashboard"}
                    </Button>
                </Box>
            </Box>

        </div>

    );
}
