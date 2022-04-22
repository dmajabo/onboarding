import React, {Fragment, useState} from 'react'
import AddSolar from './AddSolar'
import AddHeatPump from './AddHeatPump'
import AddWindPark from './AddWind'
import AddBattery from './AddBattery'
import AddChargingSite from './AddChargingSite'
import SolarList from './SolarList'
import HeatPumpList from './HeatPumpList'
import WindTurbineList from './WindTurbineList'
import BatteryList from './BatteryList'
import ChargingPointList from './ChargingPointList'

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tabs from "@mui/material/Tabs";
import withStyles from '@mui/styles/withStyles';
import Tab from "@mui/material/Tab";
import {Query} from "react-apollo";
import gql from "graphql-tag";

const MyTab = withStyles(theme => ({
    selected: {
        color: 'orange',
    }
}))(Tab);

const ASSETS = gql`
   query ($account_id : uuid!) {
   
      asset_solar_table(where: {account_id: {_eq: $account_id}}) {
        id
        name
        number
        capacity
        
        meter {
            id
            description
        }
      }
      
       asset_wind_table(where: {account_id: {_eq: $account_id}}) {
        id
        name
        number
        capacity
        
        meter {
            id
            description
        }
      }
      
      asset_heatpump_table(where: {account_id: {_eq: $account_id}}) {
        id
        name
        capacity
        
        meter {
            id
            description
        }
      }
      
      asset_battery_table(where: {account_id: {_eq: $account_id}}) {
        id
        name
        number
        
        meter {
            id
            description
        }
      }
      
       asset_chargingpoint_table(where: {account_id: {_eq: $account_id}}) {
        id
        name
        number
        
        meter {
            id
            description
        }
      }
     
   }

`;

export default ({account}) => {

    const [type, setType] = useState('');
    let [activeStep, setActiveStep] = useState(0);

    return <div>

        <Select
            labelId="demo-simple-select-label"
            id="testAssetType"
            value={ type}
            style={{marginRight : '20px'}}
            onChange={(e) => setType(e.target.value)}
        >
            {['Solar Plant', 'Heat Pump', 'Wind Park', 'Battery Pack', 'Charging Site'].map(s => <MenuItem key={s} value={s}>{s} </MenuItem>)}

        </Select>

        <Query
            query={ASSETS}
            variables={{account_id : account.id}}
            onError={() => alert('nope')}
        >
            {({ data, loading, refetch }) => {

                if (!data || loading) return null;

                return (
                    <Fragment>

                        {type === 'Solar Plant'   && <AddSolar          disabled={false} refetch={refetch} account={account} /> }
                        {type === 'Heat Pump'     && <AddHeatPump       disabled={false} refetch={refetch} account={account} /> }
                        {type === 'Wind Park'     && <AddWindPark       disabled={false} refetch={refetch} account={account} /> }
                        {type === 'Battery Pack'  && <AddBattery        disabled={false} refetch={refetch} account={account} /> }
                        {type === 'Charging Site' && <AddChargingSite   disabled={false} refetch={refetch} account={account} /> }

                        <Tabs
                            value={activeStep}
                            onChange={(_,i) => {
                                setActiveStep(i)}}
                        >
                            <MyTab label={ 'Solar Plants' } />
                            <MyTab label={ 'Wind Turbines' } />
                            <MyTab label={ 'Heat Pumps' } />
                            <MyTab label={ 'Batteries' } />
                            <MyTab label={ 'Charging Points' } />


                        </Tabs>

                        {activeStep === 0 &&   <SolarList           data={data.asset_solar_table}           disabled={!type} account={account} />}
                        {activeStep === 1 &&   <WindTurbineList     data={data.asset_wind_table}            disabled={!type} account={account} />}
                        {activeStep === 2 &&   <HeatPumpList        data={data.asset_heatpump_table}        disabled={!type} account={account} />}
                        {activeStep === 3 &&   <BatteryList         data={data.asset_battery_table}    disabled={!type} account={account} />}
                        {activeStep === 4 &&   <ChargingPointList   data={data.asset_chargingpoint_table}    disabled={!type} account={account} />}
                    </Fragment>
                );
            }}
        </Query>

    </div>

}
