import React, {Fragment, useState} from 'react'
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import Slider from '@mui/material/Slider';

const UPDATE_USAGE = gql`
    
mutation MyMutation($day : String!, $id : uuid!, $peak_usage_hour_from : Int, $peak_usage_hour_to : Int) {
  update_usage_table_by_pk(pk_columns: {account_id: $id, day : $day }, _set: { peak_usage_hour_from: $peak_usage_hour_from, peak_usage_hour_to: $peak_usage_hour_to}) {
    account_id
  }
}
`;

export default ({day, account, refetch}) => {

    const [value, setValue] = useState([account.usage.find(u => u.day === day).peak_usage_hour_from || 0, account.usage.find(u => u.day === day).peak_usage_hour_to || 24]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const label = account.type === 'Residential' ? 'Typical working hours on a workday' : 'Typical peak usage hours in a day';

    return  <Mutation
        mutation={UPDATE_USAGE}
        variables={{day : day, id : account.id, peak_usage_hour_from : value[0], peak_usage_hour_to : value[1]}}
        onCompleted={(e) => {
            refetch && refetch();
        }}
        onError={(e) => {
            alert(JSON.stringify(e))
        }}
    >
        {(MyMutation, { loading, error }) => {

            return (

                <div style={{marginBottom : '10px'}}>
                    <span style={{'fontSize' : '75%'}}>{label} for {day}</span>
                        <Slider
                            value={value}
                            onChange={handleChange}
                            onBlur={() => MyMutation()}
                            aria-label="Always visible"
                            valueLabelFormat={(e) => e + ":00"}
                            valueLabelDisplay="on"
                            min={0}
                            max={24}
                        />
                </div>


            );
        }}
    </Mutation>
}
