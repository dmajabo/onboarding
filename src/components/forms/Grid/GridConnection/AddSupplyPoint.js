import React, {Fragment } from 'react';
import {Input, Button, TextField} from '@mui/material';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_EAN = gql`
    
mutation MyMutation($description : String, $EAN : Int, $meterNumber : Int, $historicalMaxkWperEAN : Int, $maxkWperEAN : Int, $account_id : uuid) {
  insert_supply_point_table(objects: {description: $description, ean_number: $EAN, historical_kwh: $historicalMaxkWperEAN, max_kwh: $maxkWperEAN, meter_number: $meterNumber, account_id: $account_id}) {
    returning {
      id
    }
  }
}
`;

export default function AddSupplyPoint({ account, hide, refetch }) {

    const [error, setError]                                 = React.useState("");
    const [description, setDescription]                     = React.useState("");
    const [EAN,         setEAN]                             = React.useState("");
    const [meterNumber, setMeterNumber]                     = React.useState("");
    const [maxkWperEAN, setMaxkWperEAN]                     = React.useState(0);
    const [historicalMaxkWperEAN, setHistoricalMaxkWperEAN] = React.useState(0);

    //const { site } = useContext(SiteContext);

    return (
        <Mutation
            mutation={ADD_EAN}
            onCompleted={(e) => {
                refetch && refetch();
            }}
            variables={{ EAN : +EAN,meterNumber : +meterNumber,description,maxkWperEAN :  +maxkWperEAN,historicalMaxkWperEAN : +historicalMaxkWperEAN, account_id : account.id }}
            onError={(e) => {
                alert(JSON.stringify(error))
                setError(error);
            }}
        >
            {(MyMutation, { loading, error }) => {

                return (
                    <Fragment>

                        <TextField
                            type="text"
                            variant="outlined"
                            margin="dense"
                            fullWidth={true}
                            label={'EAN'}
                            id={'testEAN'}
                            style={{width : '120px'}}
                            InputLabelProps={{ shrink: true }}
                            value={EAN}
                            onChange={(e) => setEAN(e.target.value)}
                        />

                        &nbsp;
                        <TextField
                            type="text"
                            variant="outlined"
                            margin="dense"
                            id={'testDescription'}
                            fullWidth={true}
                            label={'Description'}
                            style={{width : '250px'}}
                            InputLabelProps={{ shrink: true }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <br/>

                        <TextField
                            type="number"
                            variant="outlined"
                            margin="dense"
                            id={'testHeadMeter'}
                            fullWidth={true}
                            label={'Head Meter'}
                            style={{width : '120px'}}
                            InputLabelProps={{ shrink: true }}
                            value={meterNumber}
                            onChange={(e) => setMeterNumber(e.target.value)}
                        />


                        <TextField
                            type="text"
                            variant="outlined"
                            margin="dense"
                            fullWidth={true}
                            id={'testMaxKWH'}
                            label={'Max KWH'}
                            style={{width : '140px'}}
                            InputLabelProps={{ shrink: true }}
                            value={maxkWperEAN}
                            onChange={(e) => setMaxkWperEAN(e.target.value)}
                        />

                        &nbsp;
                        <TextField
                            type="text"
                            variant="outlined"
                            margin="dense"
                            fullWidth={true}
                            id={'testHistoricalMax'}
                            label={'Historical Max KWH'}
                            style={{width : '150px'}}
                            InputLabelProps={{ shrink: true }}
                            value={historicalMaxkWperEAN}
                            onChange={(e) => setHistoricalMaxkWperEAN(e.target.value)}
                        />

                        <br/>
                        <Button id='testAddSupplyPoint' variant={'outlined'} onClick={() => MyMutation()}> Add </Button>

                    </Fragment>
                );
            }}
        </Mutation>
    );
}
