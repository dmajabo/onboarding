import React, { useState, Fragment } from 'react';

import AreaChart from './AreaChart';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const background = '#584153';

const DEPLOYMENTS = gql`
    query($device: String) {
        meters: device_table(where: { device_type: { _eq: "Meter" }, asset_type: { _eq: "Solar" } }) {
            id
            asset_type
        }

        readings_grouped_view(
            where: { time_bucket_day: { _gt: "2021-10-16" }, device_id: { _eq: $device } }
            order_by: { time_bucket_day: asc }
        ) {
            time_bucket_day
            sum
        }
    }
`;

function BrushChart() {
    const [device, setDevice] = useState('server1:1');

    return (
        <div>
            <Query
                query={DEPLOYMENTS}
                variables={{ device: device }}
                fetchPolicy={'network-only'}
                onError={() => alert('nope')}
            >
                {({ data, loading, refetch }) => {
                    if (loading || !data) return null;

                    return (
                        <Fragment>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Meter </InputLabel>
                                <Select
                                    id="demo-simple-select"
                                    value={device}
                                    defaultValue={device}
                                    label="Select Meter"
                                    onChange={e => {
                                        setDevice(e.target.value);
                                    }}
                                    //setDevice(e.target.value)}}
                                >
                                    {data.meters.map(d => (
                                        <MenuItem value={d.id}>{d.id}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <AreaChart data={data.readings_grouped_view} />
                        </Fragment>
                    );
                }}
            </Query>
        </div>
    );
}

export default BrushChart;
