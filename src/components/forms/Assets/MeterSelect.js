import React, {  Fragment } from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';

const METERS = gql`
   query ($account_id : uuid) {
      supply_point_table(where: {account_id: {_eq: $account_id}}) {
        id
        description
        
        meters {
            id
            meter_number
            description
        }
      }
   }

`;

const MeterSelect = ({account, meter, setSelectedMeter}) => {

    return (
        <div>

            <Query
                query={METERS}
                variables={{account_id : account.id}}
                onError={() => alert('nope')}
            >
                {({ data, loading, refetch }) => {

                    if (!data || loading) return null;

                    let allMeters = [];

                    data.supply_point_table.forEach(sp => {
                        allMeters = allMeters.concat(sp.meters);
                    });

                    return (
                        <Fragment>

                            <Autocomplete
                                disablePortal
                                value={meter}
                                options={allMeters}
                                sx={{ width: 300 }}
                                onChange={(event, newValue) => {
                                    setSelectedMeter(newValue);
                                }}
                                getOptionLabel={(option) => String(option.description) }
                                renderInput={(params) => <TextField {...params} label="Select Meter" />}
                            />

                                {/*<Autocomplete*/}
                                {/*    value={meter}*/}
                                {/*    onChange={(event, newValue) => {*/}
                                {/*        setSelectedMeter(newValue);*/}
                                {/*    }}*/}
                                {/*    getOptionLabel={(option) => String(option.description) }*/}
                                {/*    id="selectMeter"*/}
                                {/*    options={allMeters}*/}

                                {/*    renderOption={(d) => <span>{d.meter_number} <em style={{color : 'grey'}}>{d.description} </em></span>}*/}
                                {/*        renderInput={(params) => (*/}
                                {/*        <TextField*/}
                                {/*            {...params}*/}
                                {/*            variant="outlined"*/}
                                {/*            label="Select Meter"*/}
                                {/*            placeholder="Search"*/}
                                {/*        />*/}
                                {/*    )}*/}
                                {/*/>*/}

                                {/*<Select*/}
                                {/*    labelId="demo-simple-select-label"*/}
                                {/*    id="demo-simple-select"*/}
                                {/*    value={ean}*/}
                                {/*    onChange={(e) => setSelectedEAN(e.target.value)}*/}
                                {/*>*/}
                                {/*    {allMeters.map(s => <MenuItem key={s.id} value={s.id}>{s.description}</MenuItem>)}*/}

                                {/*</Select>*/}



                        </Fragment>
                    );
                }}
            </Query>

        </div>
    );
};

export default MeterSelect;
