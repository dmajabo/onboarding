import React, { useContext } from 'react';
import { UserContext } from 'components/providers/UserProvider';
import {  Grid } from '@mui/material';
import SolarSummary from './../../components/cards/solarsummary'
import TradeList from './../../components/cards/tradelist'
import TradeSummary from './../../components/cards/tradesummary'
import GridConnectionSummary from './../../components/cards/gridconnectionsummary'
import MeterData from './../../components/cards/meterdata'
import {AccountContext} from "../../components/providers/AccountProvider";

const Dashboard = () => {

    const { user } = useContext(UserContext);
    const { account } = useContext(AccountContext);

    if (!user || !account) return <pre>Loading</pre>

    return (
        <div data-test-id={'Dashboard'}>

            {/*<ConnectionDetails showButtons={true} form={{status : "NEW"}}/>*/}

                <Grid xs={12} lg={12}>
                    <TradeSummary/>
                </Grid>

                <br/>

                <Grid xs={12} lg={12}>
                    <TradeList/>
                </Grid>

                <br/>

                <Grid xs={12} lg={12}>
                    <SolarSummary/>
                </Grid>

                <br/>

                <Grid xs={12} lg={12}>
                    <MeterData/>
                </Grid>

                <br/>
                <Grid xs={12} lg={12}>
                    <GridConnectionSummary/>
                </Grid>

            <div>

            </div>

        </div>

    );
};

export default Dashboard;
